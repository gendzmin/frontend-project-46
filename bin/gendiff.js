#!/usr/bin/env node
import { program } from 'commander';
import { getDiff } from '../src/index.js';

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.1', '-V, --version', 'output the version number')
    .argument('<type>', 'select file type')
    .option('-f, --format <type>',  'output format')
    .argument('filepath1')
    .argument('filepath2')
    .action((filepath1, filepath2) => {
        console.log(getDiff(filepath1, filepath2));
    });
program.parse();
