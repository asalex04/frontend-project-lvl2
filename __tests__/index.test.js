import fs from 'fs';
import _ from 'lodash';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const getFilePath = (filename) => path
  .join(dirName, '..', '__tests__', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');
const getName = (resultFormat) => _.upperFirst(resultFormat);
const cases = [['json', 'stylish']];

test.each(cases)(
  'gendiff',
  (ext, resultFormat) => {
    const pathBefore = getFilePath(`before.${ext}`);
    // console.log(pathBefore);
    const pathAfter = getFilePath(`after.${ext}`);
    // console.log(pathAfter);
    console.log(resultFormat);
    // console.log(genDiff(pathBefore, pathAfter, resultFormat));
    const getExpectResult = readFile(`result${getName(resultFormat)}.txt`);
    expect(genDiff(pathBefore, pathAfter, `${resultFormat}`)).toEqual(getExpectResult);
  },
);
