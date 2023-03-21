#!/usr/bin/env node
import { readFileSync } from 'node:fs';

console.log((readFileSync('../__fixtures__/file1.json')));
