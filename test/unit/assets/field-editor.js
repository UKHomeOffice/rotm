'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
var proxyquire = require('proxyquire');

describe('assets/js/field-editor', function () {

  var eventFactory = sinon.stub().returns({
    'foo': 'bar'
  });

  var initEditableField = {init: sinon.spy()};
  var editableField = function() {
    return initEditableField;
  };

  describe('instantiation', function () {

    var FieldEditor;
    var el;

    before(function () {
      FieldEditor = proxyquire('../../../assets/js/field-editor/index.js', {
        './event-factory': eventFactory,
        './editable-field': editableField
      });

      /*eslint no-unused-vars: 0*/
      el = {
        addEventListener: sinon.spy(),
        querySelector: sinon.spy()
      };
    });

    it('instantiates', function () {
      var fieldEditor = new FieldEditor();
      should.equal(typeof fieldEditor, 'object');
    });

    it('should not instantiate editable fields when x-csrf-token is missing', function () {
      var fieldEditor = new FieldEditor();
      var fields = fieldEditor.init([el]);
      should.equal(fields.length, 0);
      el.addEventListener.should.not.have.been.called;
    });

  });

  describe('form sanity detection', function () {

    var FieldEditor;
    var el;

    before(function () {
      FieldEditor = proxyquire('../../../assets/js/field-editor/index.js', {
        './eventFactory': eventFactory,
        './editable-field': editableField
      });

      /*eslint no-unused-vars: 0*/
      el = {
        addEventListener: sinon.stub()
      };

      el.querySelector = function() {
        return el;
      };

    });

    it('recognises a valid instantiation request by capturing the x-csrf-token', function () {
      var fieldEditor = new FieldEditor('a-csrf-token');
      var fields = fieldEditor.init([el]);
      should.equal(fields.length, 1);
      initEditableField.init.should.have.been.calledWith('a-csrf-token');
    });

  });

  describe('view / edit toggle detection', function () {

    var FieldEditor;
    var el;
    var toggleCounter;

    before(function () {
      FieldEditor = proxyquire('../../../assets/js/field-editor/index.js', {
        './eventFactory': eventFactory,
        './editable-field': editableField
      });

      /*eslint no-unused-vars: 0*/
      toggleCounter = sinon.spy();
      el = function(mode) {
        return {
          addEventListener: function(eventName, handler) {
            var e = {
              detail: {mode: mode}
            };
            handler(e);
            toggleCounter();
          }
        };
      };

      el.querySelector = function() {
        return el;
      };

    });

    it('should handle toggle events on elements', function () {
      var fieldEditor = new FieldEditor('a-csrf-token');
      var fields = fieldEditor.init([el('view'), el('edit'), el('view')]);
      should.equal(toggleCounter.callCount, 3);
    });

  });

});
