/* eslint-disable import/extensions */
/* eslint-disable max-len */
import _ from 'lodash';
import chooseFormatter from './formatters/index.js';

const getType = (key, file1, file2) => { // Функция, отображающая тип разницы между значениями по указанному ключу
  if (_.has(file1, key) && !_.has(file2, key)) {
    return 'first-only';
  }
  if (!_.has(file1, key) && _.has(file2, key)) {
    return 'second-only';
  }
  if (_.isEqual(file1[key], file2[key])) {
    return 'equal';
  }
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return 'both-complex';
  }
  return 'not-both-complex';
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
    const type = getType(key, file1, file2);
    if (type === 'both-complex') {
      return { key, children: buildTree(file1[key], file2[key]), type };
    }
    return { key, value: getValue(type, key, file1, file2), type };
  });
  return tree;
};

const createFormattedOutput = (file1, file2, format) => {
  const tree = buildTree(file1, file2);
  return chooseFormatter(tree, format);
};

export default createFormattedOutput;
