#!/usr/bin/env node
'use strict';

const program = require('commander'),
      exec = require('child_process').exec,
      chalk = require("chalk");

program
  .parse(process.argv);

console.log('Starting application...');

let execCallback = (error, stdout, stderr) => {
    if (error) console.log(chalk.red(error));
    if (stdout) console.log(chalk.green(stdout));
    if (stderr) console.log(chalk.red(stderr));
};

exec('DEBUG=test:* npm start', execCallback);