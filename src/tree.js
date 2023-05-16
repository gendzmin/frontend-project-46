import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const tree = keys.map((key) => {
    if (!_.has(file2, key)) {
      return { key, value: file1[key], type: 'deleted' };
    }
    if (!_.has(file1, key)) {
      return { key, value: file2[key], type: 'added' };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { key, value: file1[key], type: 'unchanged' };
    }
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return { key, children: buildTree(file1[key], file2[key]), type: 'nested' };
    }
    return { key, value: [file1[key], file2[key]], type: 'changed' };
  });
  return tree;
};

export default buildTree;
