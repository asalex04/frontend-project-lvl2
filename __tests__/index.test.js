import { test, expect } from 'jest';
import genDiff from '../src/index.js';

test('gendiff', (pathBefore, pathAfter) => {
  expect(genDiff(pathBefore, pathAfter)).toEqual('{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    + timeout: 20
    - timeout: 50
    + verbose: true
  }
  ');
});
