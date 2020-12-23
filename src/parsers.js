import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const parse = (data, fileExtension) => parsers[fileExtension](data);

export default parse;
