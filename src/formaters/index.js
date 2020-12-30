import renderStylish from './stylish.js';
import renderPlain from './plain.js';

const formatters = {
  stylish: renderStylish,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (diff, formatName) => formatters[formatName](diff);
