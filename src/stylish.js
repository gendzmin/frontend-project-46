/* eslint-disable import/extensions */
import { iterateValue, stringer } from './index.js';

const makeStylish = (id, currentIndent, key, file1, file2, acc) => {
  let result;
  if (id.presence === 'first') {
    result = `${currentIndent}- ${key}: ${stringer(file1, key, acc)}`;
  } else if (id.presence === 'second') {
    result = `${currentIndent}+ ${key}: ${stringer(file2, key, acc)}`;
  } else if (id.equality === 'equal') {
    result = `${currentIndent}  ${key}: ${stringer(file1, key, acc)}`;
  } else if (id.type === 'both-obj') {
    result = `${currentIndent}  ${key}: ${iterateValue('stylish', file1[key], file2[key], acc + 4)}`;
  } else if (id.type === 'not-both-obj') {
    result = `${currentIndent}- ${key}: ${stringer(file1, key, acc)}\n${currentIndent}+ ${key}: ${stringer(file2, key, acc)}`;
  }
  return result;
};

export default makeStylish;
