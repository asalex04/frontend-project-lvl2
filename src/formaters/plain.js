const modify = (element) => (typeof element === 'object' ? '[complex value]' : element);

const mapping = {
  added: (fullPath, node) => `Property '${fullPath}' was added with value: '${modify(node.newValue)}'`,
  removed: (fullPath) => `Property '${fullPath}' was removed`,
  unchanged: () => '',
  changed: (fullPath, node) => `Property '${fullPath}' was updated. From '${modify(node.oldValue)}' to '${modify(node.newValue)}'`,
  hasChildren: (fullPath, node, iter) => `${iter(node.currentChildren, fullPath)}`,
};

const iter = (tree, path) => {
  const res = tree.map((node) => {
    const { name, status } = node;
    const fullPath = path ? `${path}.${name}` : name;
    return mapping[status](fullPath, node, iter);
  });
  return res.filter((item) => item !== '').join('\n');
};

export default (tree) => iter(tree, '');
