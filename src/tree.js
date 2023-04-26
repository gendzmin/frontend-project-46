/* eslint-disable max-len */
import _ from 'lodash';
import chooseFormatter from './formatters/index';

const getPresence = (key, file1, file2) => { // Функция, отображающая, в скольких объектах из двух есть значение по заданному ключу
  if (_.has(file1, key) && _.has(file2, key)) {
    return 'both';
  }
  if (_.has(file1, key)) {
    return 'first';
  }
  return 'second';
};
const getData = (key, file1, file2) => { // Функция, отображающая, являются ли объектами значения в данных объектах по данному ключу
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return 'both-complex';
  }
  return 'not-both-complex';
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
  id.data = getData(key, file1, file2);
  id.equality = getEquality(key, file1, file2);
  return id;
};
const getType = (id) => {
  const line = [];
  if (id.presence === 'first') {
    line.push('first-only');
  } else if (id.presence === 'second') {
    line.push('second-only');
  } else if (id.equality === 'equal') {
    line.push('equal');
  } else if (id.data === 'both-complex') {
    line.push('both-complex');
  } else if (id.data === 'not-both-complex') {
    line.push('not-both-complex');
  }
  return line.join();
};

const createValue = (type, key, file1, file2) => {
  if (type === 'first-only' || type === 'equal') {
    return file1[key];
  }
  if (type === 'second-only') {
    return file2[key];
  }
  return { first: file1[key], second: file2[key] };
};

const buildTree = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2)).sort();
  const tree = keys.map((key) => {
    const type = getType(getIdentity(key, file1, file2));
    const value = (type === 'both-complex') ? buildTree(file1[key], file2[key]) : createValue(type, key, file1, file2);
    return { key, type, value };
  });
  return tree;
};

const makeOutput = (file1, file2, format = 'stylish') => {
  const tree = buildTree(file1, file2);
  return chooseFormatter(tree, format);
};

export default makeOutput;
