/* eslint-disable import/extensions */
import { iterateValue, stringer } from './index.js';

const makeStylish = (id, currentIndent, key, file1, file2, acc) => {
  let result;
  if (id.presence === 'first') { // Если значение по ключу есть только в первом объекте
    result = `${currentIndent}- ${key}: ${stringer(file1, key, acc)}`;
  } else if (id.presence === 'second') { // Если значение по ключу есть только во втором объекте
    result = `${currentIndent}+ ${key}: ${stringer(file2, key, acc)}`;
  } else if (id.equality === 'equal') { // Если есть оба значения по ключу, и они равны
    result = `${currentIndent}  ${key}: ${stringer(file1, key, acc)}`;
  } else if (id.type === 'both-obj') { // Если значения по ключу неравны, но оба являются обектами - вызываем функцию-итератор и запускаем всю операцию сравнения для этих двух объектов
    result = `${currentIndent}  ${key}: ${iterateValue('stylish', file1[key], file2[key], acc + 4)}`;
  } else if (id.type === 'not-both-obj') { // Если значения по ключу неравны, но не являются объектами - просто сравниваем две строки
    result = `${currentIndent}- ${key}: ${stringer(file1, key, acc)}\n${currentIndent}+ ${key}: ${stringer(file2, key, acc)}`;
  }
  return result;
};

export default makeStylish;
