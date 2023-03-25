import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import _ from 'lodash';

const getFileExtension = (file) => _.last(file.split('.'));

const reader = (filepath) => {
  const file = readFileSync(path.resolve(filepath));
  const extension = getFileExtension(filepath);
  return [file, extension];
};

const parser = (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
    case 'yml':
      return yaml.load(file);
    default:
      throw new Error('Unknown file extension!');
  }
};

export { reader, parser };
