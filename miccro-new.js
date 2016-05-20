#!/usr/bin/env node
'use strict';

const program = require('commander'),
      exec = require('child_process').exec,
      chalk = require("chalk");

program
  .parse(process.argv);

console.log('Creating new miccro apllication ...');

let execCallback = (error, stdout, stderr) => {
    if (error) console.log(chalk.red(error));
    // if (stdout) console.log(chalk.green(stdout));
    // if (stderr) console.log(chalk.red(stderr));
    console.log(
        chalk.green('Application created: Use ')
        + chalk.bold.green('cd ' + program.args[0])
        + chalk.green(' && ')
        + chalk.bold.green('npm install.'));
};

let execCallback2 = (error, stdout, stderr) => {
    if (error) console.log(chalk.red(error));
    if (stdout) console.log(chalk.green(stdout));
    if (stderr) console.log(chalk.red(stderr));
};

exec('git clone git@github.com:MarcTroesken/miccro-framework.git ' + program.args[0], execCallback);
exec('rm -rf .git', execCallback2);