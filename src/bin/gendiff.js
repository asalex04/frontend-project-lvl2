#!/usr/bin/env node
import fs from 'fs';
import commander from 'commander';
import genDiff from '../index.js';

const program = () => {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format [stylish]', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      fs.writeFileSync('result', genDiff(filepath1, filepath2, commander.format));
      console.log(genDiff(filepath1, filepath2, commander.format));
    });

  commander.parse(process.argv);
};

program();
