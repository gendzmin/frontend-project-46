import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJSON from './json.js';

const chooseFormatter = (tree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return makeJSON(tree);
    default:
      throw new Error(`Unknown output format: '${outputFormat}'!`);
  }
};

export default chooseFormatter;
