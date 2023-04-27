/* eslint-disable import/extensions */
import { reader, parser } from './parsers.js';
import createFormattedOutput from './tree.js';

const isObjectEmpty = (obj) => { // Проверка объекта
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

const genDiff = (filepath1, filepath2, format) => {
  const [readFile1, extension1] = reader(filepath1);
  const [readFile2, extension2] = reader(filepath2);
  const file1 = parser(readFile1, extension1);
  const file2 = parser(readFile2, extension2);
  if (isObjectEmpty(file1) && isObjectEmpty(file2)) { // Пограничный случай - пустые объекты
    throw new Error('Files are empty!');
  }
  return createFormattedOutput(file1, file2, format);
};

export default genDiff;
