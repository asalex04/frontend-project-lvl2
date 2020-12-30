import _ from 'lodash';

const indent = ' ';
const getTab = (depth, offset = 0) => indent.repeat(4 * depth - offset);

const modify = (formatValue, depth) => {
  if (!_.isObject(formatValue)) {
    return formatValue;
  }
  const result = _.entries(formatValue)
    .map(([key, value]) => `${getTab(depth)}${key}: ${modify(value, depth + 1)}`);
  const output = ['{', ...result, `${getTab(depth - 1)}}`].join('\n');
  return output;
};

const iter = (tree, depth) => {
  const output = tree.map((node) => {
    const { name, status } = node;
    const mapping = {
      hasChildren: () => `${getTab(depth)}${name}: ${iter(node.currentChildren, depth + 1)}`,
      added: () => `${getTab(depth, 2)}+ ${name}: ${modify(node.newValue, depth + 1)}`,
      removed: () => `${getTab(depth, 2)}- ${name}: ${modify(node.oldValue, depth + 1)}`,
      unchanged: () => `${getTab(depth)}${name}: ${modify(node.value, depth + 1)}`,
      changed: () => `${mapping.removed()}\n${mapping.added()}`,
    };
    return mapping[status]();
  });
  return ['{', ...output, `${getTab(depth - 1)}}`].join('\n');
};

export default (tree) => iter(tree, 1);
