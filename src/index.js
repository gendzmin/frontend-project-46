import { reader, parser } from './parsers';
import iterateValue from './tree';

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
  if (format === 'stylish') {
    return iterateValue(format, file1, file2, 2);
  }
  return iterateValue(format, file1, file2);
};

export default getDiff;
