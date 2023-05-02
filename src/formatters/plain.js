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
      case 'first-only':
        return `Property '${currentPath}' was removed`;
      case 'second-only':
        return `Property '${currentPath}' was added with value: ${getValue(node.value)}`;
      case 'equal':
        return 'Placeholder to be deleted';
      case 'both-complex':
        return `${makePlain(node.children, currentPath)}`;
      default:
        return `Property '${currentPath}' was updated. From ${getValue(node.value.first)} to ${getValue(node.value.second)}`;
    }
  });
  const filtered = _.without(lines, 'Placeholder to be deleted');
  return filtered.join('\n');
};

export default makePlain;
