#!/usr/bin/env node
'use strict';

const program = require('commander'),
      exec = require('child_process').exec,
      fs = require('fs'),
      chalk = require("chalk");

program
    .option('-c, --create [table]', 'Add the table name.')
    .parse(process.argv);

/*
 * Get the model name an pluralize it
 */
let date = new Date();
let monthCount = date.getMonth() + 1;
let month = (monthCount.toString().length < 2) ? '0' + monthCount.toString() : monthCount.toString();
let fileName = date.getFullYear().toString()
             + month
             + date.getDate().toString()
             + date.getHours().toString()
             + date.getMinutes().toString()
             + date.getSeconds().toString()
             + '_' + program.args[0];

/*
* Stub the model
*/
let stub1 = `
exports.up = function(knex, Promise) {
    // Do the migration
};

exports.down = function(knex, Promise) {
    // Revert the migration
};
`.trim();

/*
* Stub the model
*/
let stub2 = `
exports.up = function(knex, Promise) {
    return knex.schema.createTable('${program.create}', function(table) {
        table.increments('id').primary();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('${program.create}');
};
`.trim();

/*
 * Decide which template should be used and
 * write the template into a new file
 */
if(program.create) {
    fs.writeFile('migrations/' + fileName + '.js', stub2, (err) => {
      if (err) throw err;
      console.log(chalk.green(`Created Migration: ${__dirname}/migrations/${fileName}.js`));
    });
} else {
    fs.writeFile('migrations/' + fileName + '.js', stub1, (err) => {
      if (err) throw err;
      console.log(chalk.green(`Created Migration: ${__dirname}/migrations/${fileName}.js`));
    });
}
