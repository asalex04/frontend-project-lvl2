import _ from 'lodash';

const getTab = (n) => '  '.repeat(n);

const modify = (element, depth) => {
  if (!_.isObject(element)) {
    return element;
  }
  const pair = Object.entries(element);
  const res = pair.map(([key, value]) => `${getTab(depth + 2)}${key}: ${value}`);
  return ['{', ...res, `${getTab(depth)}}`].join('\n');
};

const iter = (tree, depth) => {
  const res = tree.map((node) => {
    const { name, status } = node;
    const mapping = {
      added: () => `${getTab(depth)}+ ${name}: ${modify(node.newValue, depth + 1)}`,
      removed: () => `${getTab(depth)}- ${name}: ${modify(node.oldValue, depth + 1)}`,
      unchanged: () => `${getTab(depth + 1)}${name}: ${modify(node.oldValue, depth + 1)}`,
      changed: () => `${mapping.removed()}\n${mapping.added()}`,
      hasChildren: () => `${getTab(depth + 1)}${name}: ${iter(node.currentChildren, depth + 2)}`,
    };
    return mapping[status]();
  });
  return ['{', ...res, `${getTab(depth - 1)}}`].join('\n');
};

export default (tree) => iter(tree, 1);
