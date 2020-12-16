import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import diff from './formaters/index.js';

const dataFile = (filepath) => {
  const pathToFile = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const type = path.extname(filepath).slice(1);
  return parse(data, type);
};

const bildAST = (dataBefore, dataAfter) => {
  const keys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  const sortKeys = _.sortBy(keys);
  const AST = sortKeys.map((key) => {
    const node = {
      name: key,
      oldValue: dataBefore[key],
      newValue: dataAfter[key],
    };
    if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
      return {
        name: key,
        status: 'hasChildren',
        currentValue: bildAST(dataBefore[key], dataAfter[key]),
      };
    }
    if (!_.has(dataAfter, key)) return { ...node, status: 'removed' };
    if (!_.has(dataBefore, key)) return { ...node, status: 'added' };
    if (dataBefore[key] !== dataAfter[key]) return { ...node, status: 'updated' };
    return { ...node, status: 'unchanged' };
  });
  return AST;
};

const genDiff = (firstFile, secondFile, format) => {
  const dataBefore = dataFile(firstFile);
  const dataAfter = dataFile(secondFile);
  const Tree = bildAST(dataBefore, dataAfter);
  return diff(Tree, format);
};

export default genDiff;
