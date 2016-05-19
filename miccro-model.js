#!/usr/bin/env node
'use strict';

const program = require('commander'),
      fs = require('fs'),
      exec = require('child_process').exec,
      chalk = require("chalk");

program
  .option('-m, --migration', 'Create a named migration file.')
  .parse(process.argv);

/*
 * Get the model name an pluralize it
 */
let modelName = program.args[0];
let pluralized = pluralize(modelName);

/*
 * Stub the model
 */
let model = `
var bookshelf = require('../config/bookshelf');

var ${modelName} = bookshelf.Model.extend({
    tableName: '${pluralized}',
    hasTimestamps: true,
});

module.exports = bookshelf.model('${modelName}', ${modelName});
`.trim();

/*
 * Write the tempalte into a new model file an log the result
 */
fs.writeFile('models/' + modelName + '.js', model, (err) => {
    if (err) throw err;
    console.log(chalk.green(`The model "${modelName}" was created succesfully.`));
});

/*
 * Check for migration option and perform execution
 */
if (program.migration) {
    let execCallback = (error, stdout, stderr) => {
        if (error) console.log(chalk.red(error));
        if (stdout) console.log(chalk.green(stdout));
        if (stderr) console.log(chalk.red(stderr));
    };

    exec('miccro migration create_' + pluralized + '_table --create ' + pluralized, execCallback);
}

/*
 * Pluralize model name
 */
function pluralize(modelName) {
    modelName = modelName.toLowerCase();
    if (modelName.slice(- 1) == 'y') {
        modelName = modelName.substr(0, (modelName.length -1)) + 'ies';
    } else {
        modelName = modelName + 's';
    }

    return modelName;
};