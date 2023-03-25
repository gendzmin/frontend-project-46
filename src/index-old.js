/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const makeString = (arr) => {
  const result = [...arr];
  result.push('}');
  result.unshift('{');
  return result.join('\n');
};

const isObjectEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

const getDiffLine = (key, keys1, keys2, file1, file2) => {
  if (keys1.includes(key) && !(keys2.includes(key))) { // Если ключ есть в 1-м, но нет во 2-м файле
    return '1only';
  }
  if (!(keys1.includes(key)) && keys2.includes(key)) { // Если ключ есть во 2-м, но нет во 1-м файле
    return '2only';
  }
  if ((file1[key] === file2[key])) { // Если значения по ключу одинаковые
    return 'identical';
  }
  return 'different'; // Если значения по ключу одинаковые
};

const getDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(path.resolve(filepath1)));
  const file2 = JSON.parse(readFileSync(path.resolve(filepath2)));
  if (isObjectEmpty(file1) && isObjectEmpty(file2)) { // Пограничный случай - пустые объекты
    return 'Files are empty!';
  }
  const keys1 = Object.keys(file1); // Массив ключей первого файла
  const keys2 = Object.keys(file2); // Массив ключей второго файла
  const keys = _.union(keys1, keys2).sort(); // Массив ключей обоих файлов в алфавитном порядке
  const result = keys.reduce((current, key) => {
    const comparison = getDiffLine(key, keys1, keys2, file1, file2);
    switch (comparison) {
      case '1only':
        current.push(`- ${key}: ${file1[key]}`);
        break;
      case '2only':
        current.push(`+ ${key}: ${file2[key]}`);
        break;
      case 'identical':
        current.push(`  ${key}: ${file2[key]}`);
        break;
      default:
        current.push(`- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}`);
        break;
    }
    return current;
  }, []);
  return makeString(result);
};

export default getDiff;
