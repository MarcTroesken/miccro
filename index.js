#!/usr/bin/env node
const program = require('commander');

program
    .version('0.1.4')
    .command('new <name>', 'Create a new miccro application.')
    .command('model <name>', 'Create a new Bookshelf model class.')
    .command('serve', 'Boot up a node server.')
    .command('migrate', 'Run all migrations that have not yet been run.')
    .command('migration <name>', 'Create a named migration file.')
    .command('rollback', 'Rollback the last set of migrations performed.')
    .parse(process.argv);