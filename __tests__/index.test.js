import fs from 'fs';
import _ from 'lodash';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const getName = (resultFormat) => _.upperFirst(resultFormat);
const instances = [['json', 'stylish'], ['yml', 'plain'], ['yml', 'json']];

test.each(instances)(
  'gendiff',
  (ext, resultFormat) => {
    const pathBefore = getFixturePath(`before.${ext}`);
    const pathAfter = getFixturePath(`after.${ext}`);
    const expectedResult = readFile(`result${getName(resultFormat)}.txt`);
    expect(genDiff(pathBefore, pathAfter, `${resultFormat}`)).toEqual(expectedResult);
  },
);
