/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable import/extensions */
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import { test, expect } from '@jest/globals';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultSimpleStylish = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
const resultSimplePlain = "Property 'follow' was removed\nProperty 'proxy' was removed\nProperty 'timeout' was updated. From 50 to 20\nProperty 'verbose' was added with value: true";
const resultSimpleJSON = '[{"key":"follow","type":"first-only","value":false},{"key":"host","type":"equal","value":"hexlet.io"},{"key":"proxy","type":"first-only","value":"123.234.53.22"},{"key":"timeout","type":"not-both-complex","value":{"first":50,"second":20}},{"key":"verbose","type":"second-only","value":true}]';
const resultNestedStylish = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: null\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: \n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}';
const resultNestedPlain = "Property 'common.follow' was added with value: false\nProperty 'common.setting2' was removed\nProperty 'common.setting3' was updated. From true to null\nProperty 'common.setting4' was added with value: 'blah blah'\nProperty 'common.setting5' was added with value: [complex value]\nProperty 'common.setting6.doge.wow' was updated. From '' to 'so much'\nProperty 'common.setting6.ops' was added with value: 'vops'\nProperty 'group1.baz' was updated. From 'bas' to 'bars'\nProperty 'group1.nest' was updated. From [complex value] to 'str'\nProperty 'group2' was removed\nProperty 'group3' was added with value: [complex value]";
const resultNestedJSON = '[{"key":"common","type":"both-complex","value":[{"key":"follow","type":"second-only","value":false},{"key":"setting1","type":"equal","value":"Value 1"},{"key":"setting2","type":"first-only","value":200},{"key":"setting3","type":"not-both-complex","value":{"first":true,"second":null}},{"key":"setting4","type":"second-only","value":"blah blah"},{"key":"setting5","type":"second-only","value":{"key5":"value5"}},{"key":"setting6","type":"both-complex","value":[{"key":"doge","type":"both-complex","value":[{"key":"wow","type":"not-both-complex","value":{"first":"","second":"so much"}}]},{"key":"key","type":"equal","value":"value"},{"key":"ops","type":"second-only","value":"vops"}]}]},{"key":"group1","type":"both-complex","value":[{"key":"baz","type":"not-both-complex","value":{"first":"bas","second":"bars"}},{"key":"foo","type":"equal","value":"bar"},{"key":"nest","type":"not-both-complex","value":{"first":{"key":"value"},"second":"str"}}]},{"key":"group2","type":"first-only","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"second-only","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

test('getDiff / simple / stylish', () => {
    expect(getDiff(getFixturePath('simpleFile1.json'), getFixturePath('simpleFile2.json'), 'stylish')).toEqual(resultSimpleStylish);
    expect(getDiff(getFixturePath('simpleFile1.yml'), getFixturePath('simpleFile2.yml'), 'stylish')).toEqual(resultSimpleStylish);
});

test('getDiff / simple / plain', () => {
    expect(getDiff(getFixturePath('simpleFile1.json'), getFixturePath('simpleFile2.json'), 'plain')).toEqual(resultSimplePlain);
    expect(getDiff(getFixturePath('simpleFile1.yml'), getFixturePath('simpleFile2.yml'), 'plain')).toEqual(resultSimplePlain);
});

test('getDiff / simple / json', () => {
    expect(getDiff(getFixturePath('simpleFile1.json'), getFixturePath('simpleFile2.json'), 'json')).toEqual(resultSimpleJSON);
    expect(getDiff(getFixturePath('simpleFile1.yml'), getFixturePath('simpleFile2.yml'), 'json')).toEqual(resultSimpleJSON);
});

test('getDiff / nested / stylish', () => {
    expect(getDiff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'), 'stylish')).toEqual(resultNestedStylish);
});

test('getDiff / nested / plain', () => {
    expect(getDiff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'), 'plain')).toEqual(resultNestedPlain);
    expect(getDiff(getFixturePath('nestedFile1.yml'), getFixturePath('nestedFile2.yml'), 'plain')).toEqual(resultNestedPlain);
});

test('getDiff / nested / json', () => {
    expect(getDiff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'), 'json')).toEqual(resultNestedJSON);
    expect(getDiff(getFixturePath('nestedFile1.yml'), getFixturePath('nestedFile2.yml'), 'json')).toEqual(resultNestedJSON);
});

test('getDiff / Error / Unknown file extension!', () => {
    expect(() => getDiff(getFixturePath('file.js'), getFixturePath('file.js'))).toThrow(new Error('Unknown file extension!'));
});

test('getDiff / Error / Wrong format!', () => {
    expect(() => getDiff(getFixturePath('simpleFile1.json'), getFixturePath('simpleFile2.json'), 'stuff')).toThrow(new Error('Wrong format!'));
});

test('getDiff / Error / Files are empty!', () => {
    expect(() => getDiff(getFixturePath('emptyFile1.json'), getFixturePath('emptyFile2.json'))).toThrow(new Error('Files are empty!'));
});
