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

const makeString = (arr) => {
  const result = [...arr];
  result.push('}');
  result.unshift('{');
  return result.join('\n');
};

const comparer = (key, keys1, keys2, file1, file2) => {
  if (keys1.includes(key) && !(keys2.includes(key))) { // Если ключ есть в 1-м, но нет во 2-м файле
    return `- ${key}: ${file1[key]}`;
  }
  if (!(keys1.includes(key)) && keys2.includes(key)) { // Если ключ есть во 2-м, но нет во 1-м файле
    return `+ ${key}: ${file2[key]}`;
  }
  if ((file1[key] === file2[key])) { // Если значения по ключу одинаковые
    return `  ${key}: ${file2[key]}`;
  }
  return `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}`; // Если значения по ключу одинаковые
};

const getDiff = (filepath1, filepath2) => {
  const [readFile1, extension1] = reader(filepath1);
  const [readFile2, extension2] = reader(filepath2);
  const file1 = parser(readFile1, extension1);
  const file2 = parser(readFile2, extension2);
  if (isObjectEmpty(file1) && isObjectEmpty(file2)) { // Пограничный случай - пустые объекты
    return 'Files are empty!';
  }
  const keys1 = Object.keys(file1); // Массив ключей первого файла
  const keys2 = Object.keys(file2); // Массив ключей второго файла
  const keys = _.union(keys1, keys2).sort(); // Массив ключей обоих файлов в алфавитном порядке
  const result = keys.reduce((current, key) => {
    current.push(comparer(key, keys1, keys2, file1, file2));
    return current;
  }, []);
  return makeString(result);
};

export default getDiff;
