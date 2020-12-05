import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const getFilePath = (filename) => path.join(dirName, '.', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

const getExpectResult = readFile('fileResult.txt');

test('gendiff', () => {
  const pathBefore = getFilePath('fileBefore.json');
  const pathAfter = getFilePath('fileAfter.json');
  expect(genDiff(pathBefore, pathAfter)).toEqual(getExpectResult);
});
