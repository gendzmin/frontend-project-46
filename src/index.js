/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import { reader, parser } from './parsers.js';
import makeStylish from './stylish.js';

const isObjectEmpty = (obj) => { // Проверка объекта
  if ((obj === undefined) || (Object.keys(obj).length === 0)) {
    return true;
  }
  return false;
};

const createIndent = (acc) => ' '.repeat(acc); // Создание отступа

const stringifyValue = (value, acc) => { // Функция, приводящая объекты к строке в нужном формате (без кавычек, с крупными отступами)
  const iterator = (element, i) => {
    if (!_.isObject(element)) {
      return `${element}`;
    }
    const keys = Object.keys(element);
    const result = keys.map((key) => {
      const currentIndent = createIndent(i);
      const currentKey = `${currentIndent}${key}`;
      const currentValue = `${iterator(element[key], i + 4)}`;
      if (_.isObject(element[key])) {
        return `  ${currentKey}: {\n${currentValue}\n${createIndent(i + 2)}}`;
      }
      return `  ${currentKey}: ${currentValue}`;
    });
    return result.join('\n');
  };
  return `{\n${iterator(value, acc)}\n${createIndent(acc - 2)}}`;
};
const stringer = (object, key, acc) => { // Функция, возвращающая значение объекта по ключу или в прямом виде (если это примитивный тип данных), или с помощью функции stringifyValue (если это объект)
  if (_.isObject(object[key])) {
    return stringifyValue(object[key], acc + 4);
  }
  return object[key];
};
const getPresence = (key, file1, file2) => { // Функция, отображающая, в скольких объектах из двух есть значение по заданному ключу
  if (_.has(file1, key) && _.has(file2, key)) {
    return 'both';
  }
  if (_.has(file1, key)) {
    return 'first';
  }
  return 'second';
};
const getType = (key, file1, file2) => { // Функция, отображающая, являются ли объектами значения в данных объектах по данному ключу
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return 'both-obj';
  }
  return 'not-both-obj';
};
const getEquality = (key, file1, file2) => { // Функция, отображающая, равны ли значения у объектов по данному ключу
  if (getPresence(key, file1, file2) === 'both') {
    if (_.isEqual(file1[key], file2[key])) {
      return 'equal';
    }
    return 'diff';
  }
  return 'none';
};

const getIdentity = (key, file1, file2) => { // Функция, собирающая в одну переменную значения трёх предыдующих функций
  const id = {};
  id.presence = getPresence(key, file1, file2);
  id.type = getType(key, file1, file2);
  id.equality = getEquality(key, file1, file2);
  return id;
};

const compareValues = (format, key, file1, file2, acc) => { // Функция, вызывающая форматтер с использованием данных о сравнении двух объектов из функции getIdentity
  const currentIndent = createIndent(acc);
  const id = getIdentity(key, file1, file2);
  if (format === 'stylish') {
    return makeStylish(id, currentIndent, key, file1, file2, acc);
  }
  throw new Error('Wrong format!');
};

const iterateValue = (format, obj1, obj2, acc) => { // Функция-итератор, запускающая сравнение
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const result = keys.map((key) => `${compareValues(format, key, obj1, obj2, acc)}`);
  return `{\n${result.join('\n')}\n${createIndent(acc - 2)}}`;
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

export { iterateValue, stringer, getDiff };
