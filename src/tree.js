import _ from 'lodash';
import chooseFormatter from './formatters/index.js';

const buildTree = (file1, file2) => {
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const tree = keys.map((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { key, value: file1[key], type: 'first-only' };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return { key, value: file2[key], type: 'second-only' };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { key, value: file1[key], type: 'equal' };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, children: buildTree(file1[key], file2[key]), type: 'both-complex' };
    }
    return { key, value: { first: file1[key], second: file2[key] }, type: 'not-both-complex' };
  });
  return tree;
};

const createFormattedOutput = (file1, file2, format) => {
  const tree = buildTree(file1, file2);
  return chooseFormatter(tree, format);
};

export default createFormattedOutput;
