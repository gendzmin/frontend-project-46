import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJSON from './json.js';

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
