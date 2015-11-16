'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */

var eventFactory = require('./event-factory');
var Ajax = require('../ajax');

var FieldModel = function(fieldProperties) {
  /* model */

  var name = fieldProperties.name;
  var options = JSON.parse(fieldProperties.options);
  var uri = options.uri + '/' + options.id;

  var defaults = (function(dflts) {
    var params = [];
    for (var prop in dflts) {
      params.push(prop + '=' + dflts.prop);
    }
    return params.join('&');
  }(JSON.parse(fieldProperties.defaults)));

  var data = '';

  this.SetValue = function(d) {
    data = d;
  };

  this.GetValue = function() {
    return data;
  };

  this.handleSubmit = function(token, e) {
    var value = e.detail.field.value;
    this.SetValue(value);

    var parameters = defaults + '&';
    parameters += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    parameters += '&x-csrf-token=' + encodeURIComponent(token);

    var xhr = new Ajax({
      method: 'POST',
      uri: uri,
      params: parameters,
      responseType: 'json',
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

module.exports = FieldModel;
