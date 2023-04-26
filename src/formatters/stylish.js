/* eslint-disable max-len */
import _ from 'lodash';

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
const stringer = (value, acc) => { // Функция, возвращающая значение объекта по ключу или в прямом виде (если это примитивный тип данных), или с помощью функции stringifyValue (если это объект)
  if (_.isObject(value)) {
    return stringifyValue(value, acc + 4);
  }
  return value;
};

const makeStylish = (tree, indent = 2) => {
  const currentIndent = createIndent(indent);
  const lines = tree.map((node) => {
    if (node.type === 'first-only') { // Если значение по ключу есть только в первом объекте
      return `${currentIndent}- ${node.key}: ${stringer(node.value, indent)}`;
    }
    if (node.type === 'second-only') { // Если значение по ключу есть только во втором объекте
      return `${currentIndent}+ ${node.key}: ${stringer(node.value, indent)}`;
    }
    if (node.type === 'equal') { // Если есть оба значения по ключу, и они равны
      return `${currentIndent}  ${node.key}: ${stringer(node.value, indent)}`;
    }
    if (node.type === 'both-complex') { // Если значения по ключу неравны, но оба являются обектами - вызываем функцию-итератор и запускаем всю операцию сравнения для этих двух объектов
      return `${currentIndent}  ${node.key}: ${makeStylish(node.value, indent + 4)}`;
    } // Если значения по ключу неравны, но не являются объектами - просто сравниваем две строки
    return `${currentIndent}- ${node.key}: ${stringer(node.value.first, indent)}\n${currentIndent}+ ${node.key}: ${stringer(node.value.second, indent)}`;
  });
  return `{\n${lines.join('\n')}\n${createIndent(indent - 2)}}`;
};

export default makeStylish;
