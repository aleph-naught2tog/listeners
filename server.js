#!/usr/bin/env node

// Compile the server in case we haven't done so already
const compileOptions = ['-p', 'server/tsconfig.json'];
const result = require('child_process').spawnSync('tsc', compileOptions);
if (result.status) {
  console.error('Initial server compilation failed; exiting.');

  if (result.stdout.length) {
    console.group('');
    console.log(result.stdout.toString('utf8'));
    console.groupEnd();
  }

  if (result.stderr.length) {
    console.group('');
    console.error(result.stderr.toString('utf8'));
    console.groupEnd();
  }

  process.exit(result.status);
}

// Run it
require('./server/dist/index.js');
