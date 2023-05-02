/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable import/extensions */
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import readData from '../src/utils.js';
import parseData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getData = (dataName) => {
    const dataPath = getFixturePath(dataName);
    const [rawData, extension] = readData(dataPath);
    const data = parseData(rawData, extension);
    return data;
};

const simpleJsonFile1 = getFixturePath('simpleFile1.json');
const simpleJsonFile2 = getFixturePath('simpleFile2.json');
const simpleYamlFile1 = getFixturePath('simpleFile1.yaml');
const simpleYmlFile2 = getFixturePath('simpleFile2.yml');
const nestedJsonFile1 = getFixturePath('nestedFile1.json');
const nestedJsonFile2 = getFixturePath('nestedFile2.json');
const nestedYamlFile1 = getFixturePath('nestedFile1.yaml');
const nestedYmlFile2 = getFixturePath('nestedFile2.yml');
const emptyFile = getFixturePath('emptyFile.json');
const jsFile = getFixturePath('file.js');

const resultSimpleStylish = getData('resultSimpleStylish.yaml');
const resultSimplePlain = getData('resultSimplePlain.yaml');
const resultSimpleJSON = getData('resultSimpleJSON.yaml');
const resultNestedStylish = getData('resultNestedStylish.yaml');
const resultNestedPlain = getData('resultNestedPlain.yaml');
const resultNestedJSON = getData('resultNestedJSON.yaml');

const simpleDataSet = [[simpleJsonFile1, simpleJsonFile2], [simpleYamlFile1, simpleYmlFile2]];
const nestedDataSet = [[nestedJsonFile1, nestedJsonFile2], [nestedYamlFile1, nestedYmlFile2]];

test.each(simpleDataSet)('[TEST] Simple data', (data1, data2) => {
    expect(genDiff(data1, data2, 'stylish')).toBe(resultSimpleStylish);
    expect(genDiff(data1, data2, 'plain')).toBe(resultSimplePlain);
    expect(genDiff(data1, data2, 'json')).toBe(resultSimpleJSON);
});

test.each(nestedDataSet)('[TEST] Nested data', (data1, data2) => {
    expect(genDiff(data1, data2, 'stylish')).toBe(resultNestedStylish);
    expect(genDiff(data1, data2, 'plain')).toBe(resultNestedPlain);
    expect(genDiff(data1, data2, 'json')).toBe(resultNestedJSON);
});

test('[TEST] Errors', () => {
    expect(() => genDiff(emptyFile, emptyFile)).toThrow(new Error('Files are empty!'));
    expect(() => genDiff(jsFile, jsFile)).toThrow(new Error('Unknown file extension!'));
    expect(() => genDiff(simpleJsonFile1, simpleJsonFile2, 'stuff')).toThrow(new Error('Wrong format!'));
});
