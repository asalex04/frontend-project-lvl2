import _ from 'lodash';

const getTab = (n) => ' '.repeat(n);
const gap = '  ';

const modify = (element, depth) => {
  if (!_.isObject(element)) {
    return element;
  }
  const pair = Object.entries(element);
  const res = pair.map(([key, value]) => `${getTab(depth + 5)}${key}: ${value}`);
  return ['{', ...res, `${getTab(depth + 2)}}`].join('\n');
};

const iter = (tree, depth) => {
  const res = tree.map((node) => {
    const {
      name, oldValue, newValue, status, currentChildren,
    } = node;
    const lines = {
      added: () => `${gap}${getTab(depth)}+ ${name}: ${modify(newValue, depth)}`,
      removed: () => `${gap}${getTab(depth)}- ${name}: ${modify(oldValue, depth)}`,
      unchanged: () => `${gap}${getTab(depth + 2)}${name}: ${modify(oldValue, depth)}`,
      changed: () => `${lines.added()}\n${lines.removed()}`,
      hasChildren: () => `${gap}${getTab(depth + 2)}${name}: ${iter(currentChildren, depth + 2)}`,
    };
    return lines[status]();
  });
  return ['{', ...res, `${getTab(depth)}}`].join('\n');
};

export default (tree) => iter(tree, 0);
