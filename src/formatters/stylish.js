/* eslint-disable max-len */
import _ from 'lodash';

const createIndent = (acc) => ' '.repeat(acc);

const stringifyValue = (value, indent) => {
  const iterator = (element, i) => {
    if (!_.isObject(element)) {
      return `${element}`;
    }
    const keys = Object.keys(element);
    const result = keys.map((key) => {
      const currentIndent = createIndent(i);
      const currentKey = `${currentIndent}${key}`;
      const currentValue = `${iterator(element[key], i + 4)}`;
      if (_.isObject(element[key])) {
        return `  ${currentKey}: {\n${currentValue}\n${createIndent(i + 2)}}`;
      }
      return `  ${currentKey}: ${currentValue}`;
    });
    return result.join('\n');
  };
  return `{\n${iterator(value, indent)}\n${createIndent(indent - 2)}}`;
};
const getValue = (value, acc) => (_.isObject(value) ? stringifyValue(value, acc + 4) : value);

const makeStylish = (tree, indent = 2) => {
  const currentIndent = createIndent(indent);
  const lines = tree.map((node) => {
    switch (node.type) {
      case 'first-only':
        return `${currentIndent}- ${node.key}: ${getValue(node.value, indent)}`;
      case 'second-only':
        return `${currentIndent}+ ${node.key}: ${getValue(node.value, indent)}`;
      case 'equal':
        return `${currentIndent}  ${node.key}: ${getValue(node.value, indent)}`;
      case 'both-complex':
        return `${currentIndent}  ${node.key}: ${makeStylish(node.children, indent + 4)}`;
      default:
        return `${currentIndent}- ${node.key}: ${getValue(node.value.first, indent)}\n${currentIndent}+ ${node.key}: ${getValue(node.value.second, indent)}`;
    }
  });
  return `{\n${lines.join('\n')}\n${createIndent(indent - 2)}}`;
};

export default makeStylish;
