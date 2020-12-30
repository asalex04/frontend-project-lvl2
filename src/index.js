import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import getDiff from './formaters/index.js';

const getFileData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  const dataFormat = path.extname(filepath).slice(1);
  return parse(data, dataFormat);
};

const genDiff = (filePathBefore, filePathAfter, format = 'stylish') => {
  const dataBefore = getFileData(filePathBefore);
  const dataAfter = getFileData(filePathAfter);
  const tree = buildTree(dataBefore, dataAfter);
  return getDiff(tree, format);
};

export default genDiff;
