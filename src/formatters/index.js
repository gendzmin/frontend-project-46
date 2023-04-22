/* eslint-disable import/no-cycle */
import makePlain from './plain';
import makeStylish from './stylish';

const chooseFormatter = (format, id, key, file1, file2, acc) => {
  if (format === 'stylish') {
    const indent = acc;
    return makeStylish(id, key, file1, file2, indent);
  }
  if (format === 'plain') {
    const path = `${acc}`;
    return makePlain(id, key, file1, file2, path);
  }
  throw new Error('Wrong format!');
};

export default chooseFormatter;
