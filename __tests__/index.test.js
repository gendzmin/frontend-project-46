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

const comparisonResult = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
const comparisonResult2 = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: null\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: \n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}';
const comparisonResult3 = "Property 'common.follow' was added with value: false\nProperty 'common.setting2' was removed\nProperty 'common.setting3' was updated. From true to null\nProperty 'common.setting4' was added with value: 'blah blah'\nProperty 'common.setting5' was added with value: [complex value]\nProperty 'common.setting6.doge.wow' was updated. From '' to 'so much'\nProperty 'common.setting6.ops' was added with value: 'vops'\nProperty 'group1.baz' was updated. From 'bas' to 'bars'\nProperty 'group1.nest' was updated. From [complex value] to 'str'\nProperty 'group2' was removed\nProperty 'group3' was added with value: [complex value]";

test('getDiff / simple / json / stylish', () => {
    expect(getDiff(getFixturePath('simpleFile1.json'), getFixturePath('simpleFile2.json'), 'stylish')).toEqual(comparisonResult);
    expect(getDiff(getFixturePath('emptyFile1.json'), getFixturePath('emptyFile2.json'), 'stylish')).toEqual('Files are empty!');
});

test('getDiff / simple / yaml / stylish', () => {
    expect(getDiff(getFixturePath('simpleFile1.yml'), getFixturePath('simpleFile2.yml'), 'stylish')).toEqual(comparisonResult);
    expect(getDiff(getFixturePath('emptyFile1.yml'), getFixturePath('emptyFile1.yml'), 'stylish')).toEqual('Files are empty!');
});

test('getDiff / nested / json / stylish', () => {
    expect(getDiff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'), 'stylish')).toEqual(comparisonResult2);
});

test('getDiff / nested / json / plain', () => {
    expect(getDiff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'), 'plain')).toEqual(comparisonResult3);
});

test('getDiff / Unknown file extension!', () => {
    expect(() => getDiff(getFixturePath('file.js'), getFixturePath('file.js'), 'stylish')).toThrow(new Error('Unknown file extension!'));
});

test('getDiff / Wrong format!', () => {
    expect(() => getDiff(getFixturePath('simpleFile1.json'), getFixturePath('simpleFile2.json'), 'stuff')).toThrow(new Error('Wrong format!'));
});
