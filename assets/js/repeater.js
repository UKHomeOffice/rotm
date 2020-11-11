'use strict';

const hide = function hide(e) {
  e.classList.add('hidden');
};
const show = function show(e) {
  e.classList.remove('hidden');
};

const init = function init() {
  const container = document.getElementById('url-repeater');
  if (!container || !container.querySelectorAll) {
    return;
  }

  const fields = [].map.call(container.querySelectorAll('.form-group'), function map(f) {
    return f;
  });
  const inputs = fields.map(function map(f) {
    return f.querySelector('textarea');
  });

  let count = Math.max(1, inputs.filter(function filter(f) {
    return f.value;
  }).length);

  const addAnother = document.createElement('p');
  const addAnotherLink = document.createElement('a');

  const refresh = function refresh() {
    fields.forEach(function eachField(field, i) {
      if (i === 0 || i < count) {
        show(field);
      } else {
        hide(field);
      }
    });

    if (count < fields.length) {
      show(addAnother);
    } else {
      hide(addAnother);
    }

    if (count === 1) {
      hide(fields[0].removeLink);
    } else {
      show(fields[0].removeLink);
    }
  };

  addAnotherLink.appendChild(document.createTextNode('Add another link'));
  // eslint-disable-next-line no-script-url
  addAnotherLink.href = 'javascript:void(0)';
  addAnotherLink.onclick = function onclick() {
    count = Math.min(count + 1, fields.length);
    refresh();
  };
  addAnother.appendChild(addAnotherLink);
  container.appendChild(addAnother);

  fields.forEach(function eachField(field, n) {
    const removeLink = document.createElement('a');
    // eslint-disable-next-line no-script-url
    removeLink.href = 'javascript:void(0)';
    removeLink.className = 'remove';
    removeLink.appendChild(document.createTextNode('Remove'));
    removeLink.onclick = function onClick() {
      const values = inputs.map(function returnValue(f) {
        return f.value;
      }).filter(function returnUnique(_, i) {
        return n !== i;
      });
      inputs.forEach(function forEach(f, i) {
        f.value = values[i] || '';
      });
      count = Math.max(count - 1, 1);
      refresh();
    };
    field.removeLink = removeLink;
    field.appendChild(removeLink);
  });

  refresh();
};

module.exports = {
  'init': init
};
