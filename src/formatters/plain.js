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
    switch (node.type) {
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'added':
        return `Property '${currentPath}' was added with value: ${getValue(node.value)}`;
      case 'unchanged':
        return null;
      case 'nested':
        return `${makePlain(node.children, currentPath)}`;
      default:
        return `Property '${currentPath}' was updated. From ${getValue(node.value[0])} to ${getValue(node.value[1])}`;
    }
  });
  const filtered = _.without(lines, null);
  return filtered.join('\n');
};

export default makePlain;
