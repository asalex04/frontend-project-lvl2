import commander from 'commander';

const program = () => {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format [pretty]', 'pretty')
    .arguments('<filepath1> <filepath2>');

  commander.parse(process.argv);
};

export default program;
