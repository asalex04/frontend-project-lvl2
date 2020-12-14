import _ from 'lodash';

const tab = (n) => ' '.repeat(n);
const gap = '  ';

const modify = (element, depth) => {
  if (!_.isObject(element)) return element;
  const pair = Object.entries(element);
  const res = pair.map(([key, value]) => `${tab(depth + 5)}${key}: ${value}`);
  return ['{', ...res, `${tab(depth + 2)}}`].join('\n');
};

const format = (obj) => {
  const iter = (data, depth) => {
    const res = data.map((node) => {
      const {
        name, oldValue, newValue, status, currentValue,
      } = node;
      const lines = {
        added: () => `${gap}${tab(depth)}+ ${name}: ${modify(newValue, depth)}`,
        deleted: () => `${gap}${tab(depth)}- ${name}: ${modify(oldValue, depth)}`,
        unchanged: () => `${gap}${tab(depth + 2)}${name}: ${modify(oldValue, depth)}`,
        edited: () => `${lines.added()}\n${lines.deleted()}`,
        hasChildren: () => `${gap}${tab(depth + 2)}${name}: ${iter(currentValue, depth + 2)}`,
      };
      return lines[status]();
    });
    return ['{', ...res, `${tab(depth)}}`].join('\n');
  };
  return iter(obj, 0);
};

export default format;
