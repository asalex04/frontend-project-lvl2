import _ from 'lodash';

const tab = (n) => ' '.repeat(n);
const gap = '  ';

const modify = (element, depth) => {
  if (!_.isObject(element)) {
    return element;
  }
  const pair = Object.entries(element);
  const res = pair.map(([key, value]) => `${tab(depth + 5)}${key}: ${value}`);
  return ['{', ...res, `${tab(depth + 2)}}`].join('\n');
};

const iter = (tree, depth) => {
  const res = tree.map((node) => {
    const {
      name, oldValue, newValue, status, currentChildren,
    } = node;
    const lines = {
      added: () => `${gap}${tab(depth)}+ ${name}: ${modify(newValue, depth)}`,
      removed: () => `${gap}${tab(depth)}- ${name}: ${modify(oldValue, depth)}`,
      unchanged: () => `${gap}${tab(depth + 2)}${name}: ${modify(oldValue, depth)}`,
      changed: () => `${lines.added()}\n${lines.removed()}`,
      hasChildren: () => `${gap}${tab(depth + 2)}${name}: ${iter(currentChildren, depth + 2)}`,
    };
    return lines[status]();
  });
  return ['{', ...res, `${tab(depth)}}`].join('\n');
};

export default (tree) => iter(tree, 0);
