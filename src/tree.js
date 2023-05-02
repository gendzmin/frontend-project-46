/* eslint-disable import/extensions */
/* eslint-disable max-len */
import _ from 'lodash';
import chooseFormatter from './formatters/index.js';

const getPresence = (key, file1, file2) => { // Функция, отображающая, в скольких объектах из двух есть значение по указанному ключу
  if (_.has(file1, key) && _.has(file2, key)) {
    return 'both';
  }
  if (_.has(file1, key)) {
    return 'first-only';
  }
  return 'second-only';
};
const getData = (key, file1, file2) => { // Функция, отображающая тип данных в указанных объектах по указанных ключу
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return 'both-complex';
  }
  return 'not-both-complex';
};
const getEquality = (key, file1, file2) => { // Функция, отображающая, равны ли значения у объектов по указанному ключу
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
const getType = (id) => { // Функция, отображающая тип разницы между значениями по указанному ключу
  if (id.presence.includes('only')) {
    return id.presence;
  }
  if (id.equality === 'equal') {
    return id.equality;
  }
  return id.data;
};

const getValue = (type, key, file1, file2) => { // Функция, возвращающая значение по указанному ключу в нужном виде
  if (type === 'first-only' || type === 'equal') {
    return file1[key];
  }
  if (type === 'second-only') {
    return file2[key];
  }
  return { first: file1[key], second: file2[key] };
};

const buildTree = (file1, file2) => {
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const tree = keys.map((key) => {
    const type = getType(getIdentity(key, file1, file2));
    const value = (type === 'both-complex') ? buildTree(file1[key], file2[key]) : getValue(type, key, file1, file2);
    return { key, value, type };
  });
  return tree;
};

const createFormattedOutput = (file1, file2, format) => {
  const tree = buildTree(file1, file2);
  return chooseFormatter(tree, format);
};

export default createFormattedOutput;
