'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
var eventFactory = require('./event-factory');
var FieldModel = require('./field-model');
var FieldElement = require('./field-element');
var _ = require('underscore');

var EditableField = function(ele) {
  /* view */

  var el = ele;
  var mode = 'view';
  var fieldWrapper = el.querySelector('.data-wrap');
  var fieldPara = el.querySelector('.data-wrap p');
  var editBtn = el.querySelector('.edit-btn');
  var cancelBtn = el.querySelector('.cancel-btn');
  var submitBtn = el.querySelector('input.button');

  var fieldEl;
  var fieldType;
  var formField;
  var fieldProperties = fieldPara.dataset;
  var formModel = new FieldModel(fieldProperties);

  if (fieldProperties.element) {
    // valid data properties on the element, so proceed
    fieldEl = fieldProperties.element.split(':')[0];
    fieldType = fieldProperties.element.split(':')[1] || null;

    formField = new FieldElement(fieldEl);
    formModel.SetValue(fieldPara.textContent);
  }

  this.setMode = function(newmode) {
    el.className = el.className.replace(/\sedit|\sview/g, '') + ' ' + newmode;
    if (newmode === 'edit') {
      fieldWrapper.removeChild(fieldPara);
      fieldWrapper.appendChild(formField);
      formField.value = formModel.GetValue();
    } else if (mode === 'edit') {
      fieldWrapper.removeChild(formField);
      fieldWrapper.appendChild(fieldPara);
    } else {
      // 'view' === newmode === mode
    }
    mode = newmode;
  };

  this.toggleMode = function(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    var toggledMode = (mode === 'view') ? 'edit' : 'view';
    this.setMode(toggledMode);

    el.dispatchEvent(eventFactory('toggled', {'mode': mode}));
  };

  this.submit = function(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    el.dispatchEvent(eventFactory('submit', {'field': formField}));
  };

  this.success = function(e) {
    fieldPara.textContent = formModel.GetValue();
    this.setMode('view');
  };

  this.failure = function(e) {
    this.setMode('view');
  };

  var self = this;
  /* underscore's polyfill used purely to accommodate acceptance tests 
   * phantomjs doesn't support Function.bind */
  this.init = function(csrfToken) {
    editBtn.addEventListener('click', _.bind(self.toggleMode, self));
    cancelBtn.addEventListener('click', _.bind(self.toggleMode, self));
    submitBtn.addEventListener('click', _.bind(self.submit, self));

    el.addEventListener('submit', _.bind(formModel.handleSubmit, formModel, csrfToken));
    formField.addEventListener('success', _.bind(self.success, self));
    formField.addEventListener('failure', _.bind(self.failure, self));
  };

  this.Element = function() {
    return el;
  };

  this.CancelEdit = function() {
    this.setMode('view');
  };

};

module.exports = EditableField;
