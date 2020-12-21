const modify = (element) => (typeof element === 'object' ? '[complex value]' : element);

const render = (obj) => {
  const iter = (data, path) => {
    const res = data.map((node) => {
      const {
        name, oldValue, newValue, status, currentValue,
      } = node;
      const fullPath = path ? [path, name].join('.') : name;
      const lines = {
        added: () => `Property '${fullPath}' was added with value: '${modify(newValue)}'`,
        removed: () => `Property '${fullPath}' was removed`,
        unchanged: () => '',
        updated: () => `Property '${fullPath}' was updated. From '${modify(oldValue)}' to '${modify(newValue)}'`,
        hasChildren: () => `${iter(currentValue, fullPath)}`,
      };
      return lines[status]();
    });
    return res.filter((item) => item !== '').join('\n');
  };
  return iter(obj, '');
};

export default render;
