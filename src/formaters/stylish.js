import _ from 'lodash';

const ident = ' ';
const getTab = (depth, decline = 0) => ident.repeat(4 * depth - decline);

const modify = (element, depth) => {
  if (!_.isObject(element)) {
    return element;
  }
  const result = _.entries(element)
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
      unchanged: () => `${getTab(depth)}${name}: ${modify(node.oldValue, depth + 1)}`,
      changed: () => `${mapping.removed()}\n${mapping.added()}`,
    };
    return mapping[status]();
  });
  return ['{', ...output, `${getTab(depth - 1)}}`].join('\n');
};

export default (tree) => iter(tree, 1);
