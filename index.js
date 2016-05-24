#!/usr/bin/env node
const program = require('commander');

program
    .version('0.1.6')
    .command('new <name>', 'Create a new miccro application.')
    .command('make:model <name>', 'Create a new Bookshelf model class.')
    .command('make:migration <name>', 'Create a named migration file.')
    .command('migrate', 'Run all migrations that have not yet been run.')
    .command('rollback', 'Rollback the last set of migrations performed.')
    .parse(process.argv);