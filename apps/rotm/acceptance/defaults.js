'use strict';

const path = require('path');

module.exports = props => Object.assign({}, {
  image: path.resolve(__dirname, './screenshot.png'),
  'add-image': 'yes'
}, props);
