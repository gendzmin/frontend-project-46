import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJSON from './json.js';

const chooseFormatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return makeJSON(tree);
    default:
      throw new Error('Wrong format!');
  }
};

export default chooseFormatter;
