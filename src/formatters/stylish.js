/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import _ from 'lodash';
import iterateValue from '../tree';

const createIndent = (acc) => ' '.repeat(acc); // Создание отступа

const stringifyValue = (value, indent) => { // Функция, приводящая объекты к строке в нужном формате (без кавычек, с крупными отступами)
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
  return `{\n${iterator(value, indent)}\n${createIndent(indent - 2)}}`;
};
const stringer = (object, key, acc) => { // Функция, возвращающая значение объекта по ключу или в прямом виде (если это примитивный тип данных), или с помощью функции stringifyValue (если это объект)
  if (_.isObject(object[key])) {
    return stringifyValue(object[key], acc + 4);
  }
  return object[key];
};

const makeStylish = (id, key, file1, file2, indent) => {
  const currentIndent = createIndent(indent);
  let result;
  if (id.presence === 'first') { // Если значение по ключу есть только в первом объекте
    result = `${currentIndent}- ${key}: ${stringer(file1, key, indent)}`;
  } else if (id.presence === 'second') { // Если значение по ключу есть только во втором объекте
    result = `${currentIndent}+ ${key}: ${stringer(file2, key, indent)}`;
  } else if (id.equality === 'equal') { // Если есть оба значения по ключу, и они равны
    result = `${currentIndent}  ${key}: ${stringer(file1, key, indent)}`;
  } else if (id.type === 'both-obj') { // Если значения по ключу неравны, но оба являются обектами - вызываем функцию-итератор и запускаем всю операцию сравнения для этих двух объектов
    result = `${currentIndent}  ${key}: ${iterateValue('stylish', file1[key], file2[key], indent + 4)}`;
  } else if (id.type === 'not-both-obj') { // Если значения по ключу неравны, но не являются объектами - просто сравниваем две строки
    result = `${currentIndent}- ${key}: ${stringer(file1, key, indent)}\n${currentIndent}+ ${key}: ${stringer(file2, key, indent)}`;
  }
  return result;
};

export default makeStylish;
