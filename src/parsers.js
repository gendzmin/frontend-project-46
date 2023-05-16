import yaml from 'js-yaml';

const parseData = (rawData, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(rawData);
    case 'yaml':
    case 'yml':
      return yaml.load(rawData);
    default:
      throw new Error('Unknown extension!');
  }
};

export default parseData;
