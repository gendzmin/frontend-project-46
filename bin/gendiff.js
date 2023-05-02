#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const formatType = program.opts().format;
    console.log(genDiff(filepath1, filepath2, formatType));
  });
program.parse();
