const modify = (element) => (typeof element === 'object' ? '[complex value]' : element);

const iter = (tree, path) => {
  const res = tree.map((node) => {
    const {
      name, oldValue, newValue, status, currentChildren,
    } = node;
    const fullPath = path ? `${path}.${name}` : name;
    const lines = {
      added: () => `Property '${fullPath}' was added with value: '${modify(newValue)}'`,
      removed: () => `Property '${fullPath}' was removed`,
      unchanged: () => '',
      changed: () => `Property '${fullPath}' was updated. From '${modify(oldValue)}' to '${modify(newValue)}'`,
      hasChildren: () => `${iter(currentChildren, fullPath)}`,
    };
    return lines[status]();
  });
  return res.filter((item) => item !== '').join('\n');
};

export default (tree) => iter(tree, '');
