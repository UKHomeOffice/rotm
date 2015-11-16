'use strict';

var eventFactory = require('./event-factory');
var EditableField = require('./editable-field');

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
var csrfToken = '';

var FieldEditor = function(token) {
  /* controller */

  csrfToken = token;
  var editableFields = [];

  var cancelEdits = function(exclude) {
    var ignoreField = exclude && exclude.hasOwnProperty('field');
    editableFields.forEach(function(field) {
      if (ignoreField && exclude.field === field.Element()) {
        return;
      }
      field.CancelEdit();
    });
  };

  var handleToggle = function(e) {
    /*eslint yoda: 0*/
    var exclude = ('edit' === e.detail.mode) ? {'field': this} : null;
    cancelEdits(exclude);
  };

  this.init = function(els) {

    if (csrfToken) {

      editableFields = [].map.call(els, function createEditableField(el) {
        el.addEventListener('toggled', handleToggle);
        var ef = new EditableField(el);
        ef.init(csrfToken);
        return ef;
      });

    }

    return editableFields;
  };

};

module.exports = FieldEditor;
