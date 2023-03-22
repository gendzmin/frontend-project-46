/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const getDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(path.resolve(filepath1)));
  const file2 = JSON.parse(readFileSync(path.resolve(filepath2)));
  const keys1 = Object.keys(file1); // Массив ключей первого файла
  const keys2 = Object.keys(file2); // Массив ключей второго файла
  const keys = _.union(keys1, keys2).sort(); // Массив ключей обоих файлов в алфавитном порядке
  const result = {};
  for (const key of keys) {
    if (keys1.includes(key) && !(keys2.includes(key))) { // Если ключ есть в 1-м, но нет во 2-м файле
      result[`- ${key}`] = file1[key];
    } else if (!(keys1.includes(key)) && keys2.includes(key)) { // Если ключ есть во 2-м, но нет во 1-м файле
      result[`+ ${key}`] = file2[key];
    } else if (keys1.includes(key) && keys2.includes(key)) { // Если ключ есть в обоих файлах
      if (file1[key] === file2[key]) { // Если значения по ключу одинаковые
        result[`  ${key}`] = file1[key];
      } else { // Если значения по ключу разные
        result[`- ${key}`] = file1[key];
        result[`+ ${key}`] = file2[key];
      }
    }
  }
  return JSON.stringify(result);
};

export default getDiff;
