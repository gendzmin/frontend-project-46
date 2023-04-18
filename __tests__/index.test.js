/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable import/extensions */
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import { test, expect } from '@jest/globals';
import { getDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const comparisonResult = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
const comparisonResult2 = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: null\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: \n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}';

test('get difference - simple / json', () => {
    expect(getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(comparisonResult);
    expect(getDiff(getFixturePath('emptyFile1.json'), getFixturePath('emptyFile2.json'), 'stylish')).toEqual('Files are empty!');
});

test('get difference - simple / yaml', () => {
    expect(getDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(comparisonResult);
    expect(getDiff(getFixturePath('emptyFile1.yml'), getFixturePath('emptyFile1.yml'), 'stylish')).toEqual('Files are empty!');
});

test('get difference - nested / json', () => {
    expect(getDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'stylish')).toEqual(comparisonResult2);
});

test('get difference / Unknown file extension!', () => {
    expect(() => getDiff(getFixturePath('file.js'), getFixturePath('file.js'), 'stylish')).toThrow(new Error('Unknown file extension!'));
});

test('wrong formatter / json', () => {
    expect(() => getDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'stuff')).toThrow(new Error('Wrong format!'));
});
