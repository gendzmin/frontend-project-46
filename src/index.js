import { readFileSync } from 'node:fs';

const getDiff = (filepath1, filepath2) => {
    const file1 = readFileSync('../__fixtures__/file1.json');
    return file1;
};

export { getDiff };