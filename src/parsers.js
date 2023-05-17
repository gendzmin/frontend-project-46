import yaml from 'js-yaml';

const parseData = (rawData, parserType) => {
  switch (parserType) {
    case 'json':
      return JSON.parse(rawData);
    case 'yaml':
    case 'yml':
      return yaml.load(rawData);
    default:
      throw new Error('Unknown data format!');
  }
};

export default parseData;
