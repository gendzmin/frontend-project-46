#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('filepath1')
  .argument('filepath2')
  .action((filepath1, filepath2, format) => {
    console.log(genDiff(filepath1, filepath2, format));
  });
program.parse();
