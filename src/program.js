import commander from 'commander';
//import genDiff from '.';

export default program = () => {
  console.log('test');
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format [pretty]', 'pretty')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig, commander.format));
    });

  commander.parse(process.argv);
};
