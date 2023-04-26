import makePlain from './plain';
import makeStylish from './stylish';
import makeJSON from './json';

const chooseFormatter = (tree, format) => {
  if (format === 'stylish') {
    return makeStylish(tree);
  }
  if (format === 'plain') {
    return makePlain(tree);
  }
  if (format === 'json') {
    return makeJSON(tree);
  }
  throw new Error('Wrong format!');
};

export default chooseFormatter;
