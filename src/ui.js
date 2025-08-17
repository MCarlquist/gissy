import chalk from 'chalk';

export const logo = `
   ____  _   _____   _       _   _ _______ _______
  / __ \\| | |_   _| (_)     | | | |__   __|__   __|
 | |  | | |   | |    _  ___  | | | |  | |     | |
 | |  | | |   | |   | |/ __| | | | |  | |     | |
 | |__| | |___| |_  | |\\__ \\ | |_| |  | |     | |
  \\____/|______\\__| |_||___/  \\___/   |_|     |_|
`;

export function printHeader(commandTitle) {
  console.log(chalk.cyan(logo));
  if (commandTitle) {
    console.log(chalk.blue.bold(`\n${commandTitle}\n`));
  }
}