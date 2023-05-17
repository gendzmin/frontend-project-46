import yaml from 'js-yaml';

const parseData = (rawData, dataFormat) => {
  switch (dataFormat) {
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
