import path from 'node:path';
import { readFileSync } from 'node:fs';

const readData = (datapath) => {
  const rawData = readFileSync(path.resolve(datapath));
  const extension = path.extname(datapath);
  return [rawData, extension];
};

export default readData;
