import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const parse = (data, type) => parsers[type](data);

export default parse;
