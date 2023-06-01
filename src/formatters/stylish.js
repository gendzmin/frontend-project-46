import _ from 'lodash';

const createIndent = (depth, isBracketIndent = false) => (isBracketIndent ? ' '.repeat(depth * 4) : ' '.repeat(depth * 4 - 2));

const stringify = (value, indent) => {
  const iterator = (element, depth) => {
    const keys = Object.keys(element);
    const result = keys.map((key) => {
      const contentIndent = createIndent(depth);
      const bracketIndent = createIndent(depth, true);
      const currentKey = `${contentIndent}${key}`;
      if (_.isObject(element[key])) {
        return `  ${currentKey}: {\n${iterator(element[key], depth + 1)}\n${bracketIndent}}`;
      }
      return `  ${currentKey}: ${element[key]}`;
    });
    return result.join('\n');
  };
  return `${iterator(value, indent)}`;
};
const getValue = (value, depth) => (_.isObject(value) ? `{\n${stringify(value, depth + 1)}\n${createIndent(depth, true)}}` : value);

const makeStylish = (commonTree, commonDepth = 1) => {
  const iter = (tree, depth = 1) => {
    const contentIndent = createIndent(depth);
    const bracketIndent = createIndent(depth, true);
    const lines = tree.map((node) => {
      switch (node.type) {
        case 'deleted':
          return `${contentIndent}- ${node.key}: ${getValue(node.value, depth)}`;
        case 'added':
          return `${contentIndent}+ ${node.key}: ${getValue(node.value, depth)}`;
        case 'unchanged':
          return `${contentIndent}  ${node.key}: ${getValue(node.value, depth)}`;
        case 'nested':
          return `${contentIndent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${bracketIndent}}`;
        default:
          return `${contentIndent}- ${node.key}: ${getValue(node.value[0], depth)}\n${contentIndent}+ ${node.key}: ${getValue(node.value[1], depth)}`;
      }
    });
    return lines.join('\n');
  };
  return `{\n${iter(commonTree, commonDepth)}\n}`;
};

export default makeStylish;
