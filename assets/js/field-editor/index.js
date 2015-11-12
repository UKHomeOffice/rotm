'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
var csrfToken = '';

var eventFactory = function(eventName, detailObj) {
  var e = new CustomEvent(eventName, {
    detail: detailObj,
    bubbles: true,
    cancelable: true
  });
  return e;
};

var FieldModel = function(fieldProperties) {
  /* model */
  var name = fieldProperties.name;
  var parameters = fieldProperties.defaults;
  var data = '';

  this.SetValue = function(d) {
    data = d;
  };

  this.GetValue = function() {
    return data;
  };

  this.handleSubmit = function(e) {
    var value = e.detail.field.value;
    this.SetValue(value);

    parameters += '&paramName=' + encodeURIComponent(name);
    parameters += '&paramValue=' + encodeURIComponent(value);
    parameters += '&x-csrf-token=' + encodeURIComponent(csrfToken);

    var xhr = new Ajax({
      method: 'POST',
      uri: '/report-terrorism/data',
      params: parameters,
      responseType: 'text',
      complete: function(resp) {
        if (resp.status === 200) {
          e.detail.field.dispatchEvent(eventFactory('success', {'resp': resp}));
        } else {
          e.detail.field.dispatchEvent(eventFactory('failure', {'resp': resp}));
        }
      }
    });
  };
};

var EditableField = function(ele) {
  /* view */

  var el = ele;
  var mode = 'view';
  var fieldWrapper = el.querySelector('.data-wrap');
  var fieldPara = el.querySelector('.data-wrap p');
  var editBtn = el.querySelector('.edit-btn');
  var cancelBtn = el.querySelector('.cancel-btn');
  var submitBtn = el.querySelector('input.button');

  var fieldProperties = fieldPara.dataset;
  var fieldEl = fieldProperties.element.split(':')[0];
  var fieldType = fieldProperties.element.split(':')[1] || null;
  var formField = document.createElement(fieldEl);
  var formModel = new FieldModel(fieldProperties);
  formModel.SetValue(fieldPara.innerText);

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
    fieldPara.innerText = formModel.GetValue();
    this.setMode('view');
  };

  this.failure = function(e) {
    this.setMode('view');
  };

  editBtn.addEventListener('click', this.toggleMode.bind(this));
  cancelBtn.addEventListener('click', this.toggleMode.bind(this));
  submitBtn.addEventListener('click', this.submit.bind(this));

  el.addEventListener('submit', formModel.handleSubmit.bind(formModel));
  formField.addEventListener('success', this.success.bind(this));
  formField.addEventListener('failure', this.failure.bind(this));

  this.Element = function() {
    return el;
  };

  this.CancelEdit = function() {
    this.setMode('view');
  };

};

/* controller */
var FieldEditor = function(els) {

  try {
    csrfToken = document.querySelector('input[name="x-csrf-token"]').value;
  } catch (e) {
    // no x-csrf-token, so no cigar
    return;
  }

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

  editableFields = [].map.call(els, function createEditableField(el) {
    el.addEventListener('toggled', handleToggle);
    return new EditableField(el);
  });

};

module.exports = FieldEditor;
