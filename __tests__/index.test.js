import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', `__fixtures__/${filename}`);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedResult = {
  stylish: readFile('resultStylish.txt'),
  plain: readFile('resultPlain.txt'),
  jsonFormat: readFile('resultJson.txt'),
};

test.each(['json', 'yml'].map((ext) => [
  getFixturePath(`/before.${ext}`),
  getFixturePath(`/after.${ext}`),
]))(
  'gendiff',
  (pathBefore, pathAfter) => {
    expect(genDiff(pathBefore, pathAfter, 'json')).toEqual(expectedResult.jsonFormat);
    expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(expectedResult.plain);
    expect(genDiff(pathBefore, pathAfter, 'stylish')).toEqual(expectedResult.stylish);
  },
);
