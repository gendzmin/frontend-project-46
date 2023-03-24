/* eslint-disable indent */
/* eslint-disable import/extensions */
import { test, expect } from '@jest/globals';
import getDiff from '../src/index.js';

test('get difference / usual', () => {
    expect(getDiff('/home/gendzmin/frontend-project-46/__fixtures__/file1.json', '__fixtures__/file2.json', 'type')).toEqual('{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}');
});

test('get difference / empty files', () => {
    expect(getDiff('__fixtures__/emptyFile1.json', '__fixtures__/emptyFile2.json', 'type')).toEqual('Files are empty!');
});
