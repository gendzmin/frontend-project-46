/* eslint-disable max-len */
import _ from 'lodash';
import chooseFormatter from './formatters/index';

const createIndent = (acc) => ' '.repeat(acc); // Создание отступа

const getPresence = (key, file1, file2) => { // Функция, отображающая, в скольких объектах из двух есть значение по заданному ключу
  if (_.has(file1, key) && _.has(file2, key)) {
    return 'both';
  }
  if (_.has(file1, key)) {
    return 'first';
  }
  return 'second';
};
const getType = (key, file1, file2) => { // Функция, отображающая, являются ли объектами значения в данных объектах по данному ключу
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return 'both-obj';
  }
  return 'not-both-obj';
};
const getEquality = (key, file1, file2) => { // Функция, отображающая, равны ли значения у объектов по данному ключу
  if (getPresence(key, file1, file2) === 'both') {
    if (_.isEqual(file1[key], file2[key])) {
      return 'equal';
    }
    return 'diff';
  }
  return 'none';
};

const getIdentity = (key, file1, file2) => { // Функция, собирающая в одну переменную значения трёх предыдующих функций
  const id = {};
  id.presence = getPresence(key, file1, file2);
  id.type = getType(key, file1, file2);
  id.equality = getEquality(key, file1, file2);
  return id;
};

const iterateValue = (format, file1, file2, acc = '') => { // Функция-итератор, запускающая сравнение
  const keys = _.union(Object.keys(file1), Object.keys(file2)).sort();
  const result = keys.map((key) => {
    const id = getIdentity(key, file1, file2);
    return chooseFormatter(format, id, key, file1, file2, acc);
  });
  if (format === 'stylish') {
    return `{\n${result.join('\n')}\n${createIndent(acc - 2)}}`;
  }
  const filtered = _.without(result, 'empty');
  return filtered.join('\n');
};

export default iterateValue;
