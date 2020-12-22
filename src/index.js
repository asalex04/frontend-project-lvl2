import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import diff from './formaters/index.js';

const getDataFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  const fileExtension = path.extname(filepath).slice(1);
  return parse(data, fileExtension);
};

const bildTree = (dataBefore, dataAfter) => {
  const keys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  const sortedKeys = _.sortBy(keys);
  const diffTree = sortedKeys.map((key) => {
    const node = {
      name: key,
      oldValue: dataBefore[key],
      newValue: dataAfter[key],
    };
    if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
      return {
        name: key,
        status: 'hasChildren',
        currentValue: bildTree(dataBefore[key], dataAfter[key]),
      };
    }
    if (!_.has(dataAfter, key)) return { ...node, status: 'removed' };
    if (!_.has(dataBefore, key)) return { ...node, status: 'added' };
    if (dataBefore[key] !== dataAfter[key]) return { ...node, status: 'updated' };
    return { ...node, status: 'unchanged' };
  });
  return diffTree;
};

const genDiff = (firstFile, secondFile, format = 'stylish') => {
  const dataBefore = getDataFile(firstFile);
  const dataAfter = getDataFile(secondFile);
  const Tree = bildTree(dataBefore, dataAfter);
  return diff(Tree, format);
};

export default genDiff;
