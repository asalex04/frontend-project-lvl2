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
  const diffTree = _.sortBy(keys).map((key) => {
    if (!_.has(dataAfter, key)) {
      return {
        name: key,
        status: 'removed',
        oldValue: dataBefore[key],
      };
    }
    if (!_.has(dataBefore, key)) {
      return {
        name: key,
        status: 'added',
        newValue: dataAfter[key],
      };
    }
    if (_.isPlainObject(dataBefore[key]) && _.isPlainObject(dataAfter[key])) {
      return {
        name: key,
        status: 'hasChildren',
        currentChildren: bildTree(dataBefore[key], dataAfter[key]),
      };
    }
    if (dataBefore[key] !== dataAfter[key]) {
      return {
        name: key,
        status: 'changed',
        newValue: dataAfter[key],
        oldValue: dataBefore[key],
      };
    }
    return {
      name: key,
      status: 'unchanged',
      oldValue: dataBefore[key],
    };
  });
  return diffTree;
};

const genDiff = (filePathBefore, filePathAfter, format = 'stylish') => {
  const dataBefore = getDataFile(filePathBefore);
  const dataAfter = getDataFile(filePathAfter);
  const tree = bildTree(dataBefore, dataAfter);
  return diff(tree, format);
};

export default genDiff;
