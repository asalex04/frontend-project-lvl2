import { test } from 'jest';
import genDiff from './index.js';

test('gendiff', (pathBefore, pathAfter) => {
  expect(genDiff(pathBefore, pathAfter)).toEqual(pathResult);
});
