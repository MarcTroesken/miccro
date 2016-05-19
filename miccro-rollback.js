#!/usr/bin/env node
'use strict';

const program = require('commander'),
      exec = require('child_process').exec,
      chalk = require("chalk");

program
  .parse(process.argv);

let execCallback = (error, stdout, stderr) => {
    if (error) console.log(chalk.red(error));
    if (stdout) console.log(chalk.green(stdout));
    if (stderr) console.log(chalk.red(stderr));
};

exec('knex migrate:rollback', execCallback);



