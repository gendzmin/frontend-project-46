import parseData from './parsers.js';
import readData from './utils.js';
import buildTree from './tree.js';
import chooseFormatter from './formatters/index.js';

const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const [readFile1, extension1] = readData(filepath1);
  const [readFile2, extension2] = readData(filepath2);
  const file1 = parseData(readFile1, extension1);
  const file2 = parseData(readFile2, extension2);
  if (isObjectEmpty(file1) && isObjectEmpty(file2)) {
    throw new Error('Files are empty!');
  }
  const tree = buildTree(file1, file2);
  const formattedOutput = chooseFormatter(tree, format);
  return formattedOutput;
};

export default genDiff;
