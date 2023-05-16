import path from 'node:path';
import fs from 'fs';

const readData = (datapath) => {
  const rawData = fs.readFileSync(path.resolve(datapath), 'utf-8');
  const extension = (path.extname(datapath)).slice(1);
  return [rawData, extension];
};

export default readData;
