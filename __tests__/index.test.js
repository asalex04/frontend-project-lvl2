import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (formats) => formats.map((ext) => [
  path.resolve(__dirname, '..', `__fixtures__/before.${ext}`),
  path.resolve(__dirname, '..', `__fixtures__/after.${ext}`),
]);

const inputFormats = ['json', 'yml'];

const readFile = (filename) => {
  const pathResult = path.resolve(__dirname, '..', `__fixtures__/${filename}`);
  return fs.readFileSync(pathResult, 'utf-8');
};

const expectedResult = {
  stylish: readFile(`resultStylish.txt`),
  plain: readFile(`resultPlain.txt`),
  json: readFile(`resultJson.txt`),
};

test.each(getFixturePath(inputFormats))(
  'gendiff',
  (pathBefore, pathAfter) => {
    expect(genDiff(pathBefore, pathAfter, 'json')).toEqual(expectedResult['json']);
    expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(expectedResult['plain']);
    expect(genDiff(pathBefore, pathAfter, 'stylish')).toEqual(expectedResult['stylish']);
  },
);
