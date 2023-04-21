import _ from 'lodash';
import iterateValue from '../tree';

const objecter = (file, key) => {
  if (_.isObject(file[key])) {
    return '[complex value]';
  }
  if ((typeof file[key]) === 'string') {
    return `'${file[key]}'`;
  }
  return file[key];
};

const makePlain = (id, key, file1, file2, path) => {
  const currentPath = (path === '') ? `${key}` : `${path}.${key}`;
  let result;
  if (id.presence === 'first') { // Если значение по ключу есть только в первом объекте
    result = `Property '${currentPath}' was removed`;
  } else if (id.presence === 'second') { // Если значение по ключу есть только во втором объекте
    result = `Property '${currentPath}' was added with value: ${objecter(file2, key)}`;
  } else if (id.equality === 'equal') {
    return 'empty';
  } else if (id.type === 'both-obj') { // Если значения по ключу неравны, но оба являются обектами
    result = `${iterateValue('plain', file1[key], file2[key], currentPath)}`;
  } else if (id.type === 'not-both-obj') { // Если значения по ключу неравны, но не являются объектами
    result = `Property '${currentPath}' was updated. From ${objecter(file1, key)} to ${objecter(file2, key)}`;
  }
  return result;
};

export default makePlain;
