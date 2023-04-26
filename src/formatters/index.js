import makePlain from './plain';
import makeStylish from './stylish';

const chooseFormatter = (tree, format) => {
  if (format === 'stylish') {
    return makeStylish(tree);
  }
  if (format === 'plain') {
    return makePlain(tree);
  }
  throw new Error('Wrong format!');
};

export default chooseFormatter;
