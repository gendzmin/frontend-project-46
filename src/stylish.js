/* eslint-disable import/extensions */
import { iterateValue, stringer } from './index.js';

const makeStylish = (id, currentIndent, key, file1, file2, acc) => {
  if (id.presence === 'first') {
    return `${currentIndent}- ${key}: ${stringer(file1, key, acc)}`;
  }
  if (id.presence === 'second') {
    return `${currentIndent}+ ${key}: ${stringer(file2, key, acc)}`;
  }
  if (id.equality === 'equal') {
    return `${currentIndent}  ${key}: ${stringer(file1, key, acc)}`;
  }
  if (id.type === 'bothobj') {
    return `${currentIndent}  ${key}: ${iterateValue('stylish', file1[key], file2[key], acc + 4)}`;
  }
  return `${currentIndent}- ${key}: ${stringer(file1, key, acc)}\n${currentIndent}+ ${key}: ${stringer(file2, key, acc)}`;
};

export default makeStylish;
