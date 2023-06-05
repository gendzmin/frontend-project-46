import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if ((typeof value) === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const getPath = (path, key) => [path, key].filter(Boolean).join('.');

const makePlain = (tree, path = '') => {
  const lines = tree.map((node) => {
    const currentPath = getPath(path, node.key);
    switch (node.type) {
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
      case 'unchanged':
        return null;
      case 'nested':
        return makePlain(node.children, currentPath);
      default:
        return `Property '${currentPath}' was updated. From ${stringify(node.value[0])} to ${stringify(node.value[1])}`;
    }
  });
  const filtered = _.without(lines, null);
  return filtered.join('\n');
};

export default makePlain;
