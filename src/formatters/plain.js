import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if ((typeof value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getPath = (path, key) => (path === '' ? `${key}` : `${path}.${key}`);

const makePlain = (tree, path = '') => {
  const lines = tree.map((node) => {
    const currentPath = getPath(path, node.key);
    if (node.type === 'first-only') { // Если значение по ключу есть только в первом объекте
      return `Property '${currentPath}' was removed`;
    }
    if (node.type === 'second-only') { // Если значение по ключу есть только во втором объекте
      return `Property '${currentPath}' was added with value: ${getValue(node.value)}`;
    }
    if (node.type === 'equal') {
      return 'Placeholder to be deleted';
    }
    if (node.type === 'both-complex') { // Если значения по ключу неравны, но оба являются обектами
      return `${makePlain(node.value, currentPath)}`;
    }
    return `Property '${currentPath}' was updated. From ${getValue(node.value.first)} to ${getValue(node.value.second)}`;
  });
  const filtered = _.without(lines, 'Placeholder to be deleted');
  return filtered.join('\n');
};

export default makePlain;
