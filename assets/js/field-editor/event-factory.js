'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */

var eventFactory = function(eventName, detailObj) {

  var e = new CustomEvent(eventName, {
    detail: detailObj,
    bubbles: true,
    cancelable: true
  });
  return e;
};

module.exports = eventFactory;
