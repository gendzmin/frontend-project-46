#!/usr/bin/env node
/* eslint-disable import/extensions */
import { program } from 'commander';
import getDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1', '-V, --version', 'output the version number')
  .argument('filepath1')
  .argument('filepath2')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, format) => {
    // eslint-disable-next-line no-console
    console.log(getDiff(filepath1, filepath2, format));
  });
program.parse();
