/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import { reader, parser } from './parsers.js';

const isObjectEmpty = (obj) => {
  if ((obj === undefined) || (Object.keys(obj).length === 0)) {
    return true;
  }
  return false;
};

const createIndent = (acc) => ' '.repeat(acc);

const stringifyValue = (value, acc) => {
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
  return `{\n${iterator(value, acc)}\n${createIndent(acc - 2)}}`;
};
const stringer = (object, key, acc) => {
  if (_.isObject(object[key])) {
    return stringifyValue(object[key], acc + 4);
  }
  return object[key];
};
const getPresence = (key, file1, file2) => {
  if (_.has(file1, key) && _.has(file2, key)) {
    return 'both';
  }
  if (_.has(file1, key)) {
    return 'first';
  }
  return 'second';
};
const getType = (key, file1, file2) => {
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return 'bothobj';
  }
  if (_.isObject(file1[key])) {
    return 'firstobj';
  }
  if (_.isObject(file2[key])) {
    return 'secondobj';
  }
  return 'no-obj';
};
const getEquality = (key, file1, file2) => {
  if (getPresence(key, file1, file2) === 'both') {
    if (_.isEqual(file1[key], file2[key])) {
      return 'equal';
    }
    return 'diff';
  }
  return 'none';
};

const showIdentity = (key, file1, file2) => {
  const id = {};
  id.presence = getPresence(key, file1, file2);
  id.type = getType(key, file1, file2);
  id.equality = getEquality(key, file1, file2);
  return id;
};

const compareValues = (key, file1, file2, acc) => {
  const currentIndent = createIndent(acc);
  const id = showIdentity(key, file1, file2);
  const result = [];
  if (id.presence === 'first') {
    result.push(`${currentIndent}- ${key}: ${stringer(file1, key, acc)}`);
    return result.join('');
  }
  if (id.presence === 'second') {
    result.push(`${currentIndent}+ ${key}: ${stringer(file2, key, acc)}`);
    return result.join('');
  }
  if (id.equality === 'equal') {
    result.push(`${currentIndent}  ${key}: ${stringer(file1, key, acc)}`);
    return result.join('');
  }
  if (id.type === 'bothobj') {
    result.push(`${currentIndent}  ${key}: ${iterateValue('stylish', file1[key], file2[key], acc + 4)}`);
    return result.join('');
  }
  if (id.type !== 'bothobj') {
    result.push(`${currentIndent}- ${key}: ${stringer(file1, key, acc)}\n${currentIndent}+ ${key}: ${stringer(file2, key, acc)}`);
    return result.join('');
  }
};

const iterateValue = (format, obj1, obj2, acc) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  if (format === 'stylish' || format.format === 'stylish') {
    const result = keys.map((key) => `${compareValues(key, obj1, obj2, acc)}`);
    return `{\n${result.join('\n')}\n${createIndent(acc - 2)}}`;
  }
  return `${format} is wrong format`;
};

const getDiff = (filepath1, filepath2, format) => {
  const [readFile1, extension1] = reader(filepath1);
  const [readFile2, extension2] = reader(filepath2);
  const file1 = parser(readFile1, extension1);
  const file2 = parser(readFile2, extension2);
  if (isObjectEmpty(file1) && isObjectEmpty(file2)) { // Пограничный случай - пустые объекты
    return 'Files are empty!';
  }
  const result = iterateValue(format, file1, file2, 2);
  return result;
};

export default getDiff;
