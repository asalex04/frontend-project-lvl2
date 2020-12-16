import renderStylish from './stylish.js';
import renderPlain from './plain.js';

const formatters = {
  stylish: renderStylish,
  plain: renderPlain,
  json: JSON.stringify,
};

// export default (diff, format) => formatters[format](diff);
export default (diff, format) => formatters[format](diff);
