import yaml from 'js-yaml';

const parser = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const parse = (data, type) => parser[type](data);

export default parse;
