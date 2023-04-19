/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import { reader, parser } from './parsers.js';
import { iterateValue } from './tree.js';

const isObjectEmpty = (obj) => { // Проверка объекта
  if ((obj === undefined) || (Object.keys(obj).length === 0)) {
    return true;
  }
  return false;
};

const getDiff = (filepath1, filepath2, format) => {
  const [readFile1, extension1] = reader(filepath1);
  const [readFile2, extension2] = reader(filepath2);
  const file1 = parser(readFile1, extension1);
  const file2 = parser(readFile2, extension2);
  if (isObjectEmpty(file1) && isObjectEmpty(file2)) { // Пограничный случай - пустые объекты
    return 'Files are empty!';
  }
  const result = iterateValue(format, file1, file2, 2);
  return result;
};

export default getDiff;
