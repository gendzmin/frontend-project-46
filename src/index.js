import path from 'node:path';
import fs from 'fs';
import parseData from './parsers.js';
import buildTree from './tree.js';
import chooseFormatter from './formatters/index.js';

const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

const readData = (dataPath) => {
  const rawData = fs.readFileSync(path.resolve(dataPath), 'utf-8');
  const extension = (path.extname(dataPath)).slice(1);
  return [rawData, extension];
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const [readFile1, dataFormat1] = readData(filepath1);
  const [readFile2, dataFormat2] = readData(filepath2);
  const file1 = parseData(readFile1, dataFormat1);
  const file2 = parseData(readFile2, dataFormat2);
  if (isObjectEmpty(file1) && isObjectEmpty(file2)) {
    throw new Error('Files are empty!');
  }
  const tree = buildTree(file1, file2);
  const formattedOutput = chooseFormatter(tree, outputFormat);
  return formattedOutput;
};

export default genDiff;
