import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const inputFormats = ['json', 'yml'];
const outputFormats = ['stylish', 'plain', 'json'];
const getPairs = (input, ouput) => input
  .flatMap((item1) => ouput
    .map((item2) => ([item1, item2])));

const expectedResult = {
  stylish: readFile(`resultStylish.txt`),
  plain: readFile(`resultPlain.txt`),
  json: readFile(`resultJson.txt`),
};

test.each(getPairs(inputFormats, outputFormats))(
  'gendiff',
  (ext, resultFormat) => {
    const pathBefore = getFixturePath(`before.${ext}`);
    const pathAfter = getFixturePath(`after.${ext}`);
    expect(genDiff(pathBefore, pathAfter, `${resultFormat}`))
      .toEqual(expectedResult[resultFormat]);
  },
);
