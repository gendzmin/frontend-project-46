/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import readData from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getData = (dataName) => {
  const dataPath = getFixturePath(dataName);
  const [data] = readData(dataPath);
  return data;
};

const jsonFile1 = getFixturePath('jsonFile1.json');
const jsonFile2 = getFixturePath('jsonFile2.json');
const yamlFile1 = getFixturePath('yamlFile1.yaml');
const ymlFile2 = getFixturePath('ymlFile2.yml');
const emptyFile = getFixturePath('emptyFile.json');
const jsFile = getFixturePath('jsFile.js');

const resultStylish = getData('resultStylish.txt');
const resultPlain = getData('resultPlain.txt');
const resultJSON = getData('resultJSON.txt');

const dataSet = [[jsonFile1, jsonFile2], [yamlFile1, ymlFile2]];

test.each(dataSet)('[TEST] Nested data', (data1, data2) => {
  expect(genDiff(data1, data2)).toBe(resultStylish);
  expect(genDiff(data1, data2, 'stylish')).toBe(resultStylish);
  expect(genDiff(data1, data2, 'plain')).toBe(resultPlain);
  expect(genDiff(data1, data2, 'json')).toBe(resultJSON);
});

test('[TEST] Errors', () => {
  expect(() => genDiff(emptyFile, emptyFile)).toThrow(new Error('Files are empty!'));
  expect(() => genDiff(jsFile, jsFile)).toThrow(new Error('Unknown extension!'));
  expect(() => genDiff(jsonFile1, jsonFile2, 'stuff')).toThrow(new Error('Wrong format!'));
});
