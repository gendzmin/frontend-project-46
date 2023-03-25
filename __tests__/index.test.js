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

const comparisonResult = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

test('get difference / json', () => {
    expect(getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(comparisonResult);
    expect(getDiff(getFixturePath('emptyFile1.json'), getFixturePath('emptyFile2.json'))).toEqual('Files are empty!');
});

test('get difference / yaml', () => {
    expect(getDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(comparisonResult);
    expect(getDiff(getFixturePath('emptyFile1.yml'), getFixturePath('emptyFile1.yml'))).toEqual('Files are empty!');
});

test('get difference / Unknown file extension!', () => {
    expect(() => getDiff(getFixturePath('file.js'), getFixturePath('file.js'))).toThrow(new Error('Unknown file extension!'));
});
