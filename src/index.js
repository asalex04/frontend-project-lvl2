import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const dataFile = (filepath) => {
  const pathToFile = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const type = path.extname(filepath).slice(1);
  // console.log(data);
  // console.log(type);
  // console.log(parse(data, type));
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
    if (!_.has(dataAfter, key)) return { ...node, status: 'deleted' };
    if (!_.has(dataBefore, key)) return { ...node, status: 'added' };
    if (dataBefore[key] !== dataAfter[key]) return { ...node, status: 'edited' };
    return { ...node, status: 'unchanged' };
  });
  return AST;
};

const format = (obj) => {
  const tab = '  ';
  const res = obj.map((node) => {
    const {
      name, oldValue, newValue, status,
    } = node;
    const lines = {
      added: () => `${tab}+ ${name}: ${newValue}`,
      deleted: () => `${tab}- ${name}: ${oldValue}`,
      unchanged: () => `${tab}${tab}${name}: ${oldValue}`,
      edited: () => [lines.added(), lines.deleted()],
    };
    return lines[status]();
  });
  const result = _.flatten(res).join('\n');
  return `{\n${result}\n}`;
};

const genDiff = (firstFile, secondFile) => {
  const dataBefore = dataFile(firstFile);
  const dataAfter = dataFile(secondFile);
  const Tree = bildAST(dataBefore, dataAfter);
  return format(Tree);
};

export default genDiff;
