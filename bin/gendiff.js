#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

const program = () => {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format [stylish]', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2, commander.format));
    });

  commander.parse(process.argv);
};

export default program;
