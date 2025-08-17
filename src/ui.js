import chalk from 'chalk';

export const logo = `
   ____ _     _
  / __/(_)___/ /__ ____
 / _/ / / __/  '_/(_-<
/_/  /_/_/ /_/\_\/___/
`;

export function printHeader(commandTitle) {
  console.log(chalk.cyan(logo));
  if (commandTitle) {
    console.log(chalk.blue.bold(`\n${commandTitle}\n`));
  }
}