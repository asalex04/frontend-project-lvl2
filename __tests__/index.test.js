import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path
  .join(__dirname, '..', '__tests__', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

const getExpectResult = readFile('fileResult.txt');

test('gendiff', () => {
  const pathBefore = getFilePath('before.yml');
  const pathAfter = getFilePath('after.yml');
  expect(genDiff(pathBefore, pathAfter)).toEqual(getExpectResult);
});
