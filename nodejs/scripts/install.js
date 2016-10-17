// This script makes sure that uWS will work.
// It does it in two steps:
// - Try to load the existing precompiled addon
// - If that fails, try to build the addon via `npm run build`
//
// Also has some shortcut errors, with friendly error messages.
'use strict';

const childProcess = require('child_process');

const NATIVE_MODULE = require.resolve('../src/native.js');

// Windows requires node >= 6.4
// Fast-fail if this requirement is not met.
{
  const nodeVersion = process.versions.node.split('.').map(i => +i);
  const incompatibleWindowsVersion = (
    process.platform === 'win32' &&
    (nodeVersion[0] < 6 || nodeVersion[0] === 6 && nodeVersion[1] < 4)
  );

  if (incompatibleWindowsVersion) {
    console.error('µWebSockets requires Node.js 6.4.0 or greater on Windows.');
    process.exit(1);
  }
}

// Try to require the native addon.
try {
  require(NATIVE_MODULE);
  console.log('Using prebuilt addon.');
  process.exit(0);
} catch (err) {
  // Try to build the addon.
  console.log('Prebuilt addon unavailable. Attempting to build addon...');
  const buildProcess = childProcess.exec('npm run build', {
    env: process.env,
    timeout: 120000,
    maxBuffer: 1024 * 1000
  });
  buildProcess.stdout.pipe(process.stdout);
  buildProcess.stderr.pipe(process.stderr);
  buildProcess.on('error', err => {
    // We don't want the exit handler code to run.
    buildProcess.removeAllListeners('exit');

    console.error('Could not run build script:');
    console.error(err.stack);
    // Make sure everything has been flushed.
    process.stdout.write('', () => {
      process.exit(1);
    });
  });
  buildProcess.on('exit', exitCode => {
    if (exitCode !== 0) {
      console.error('Build exited with non-0 error code, aborting.');
      // Make sure everything has been flushed.
      process.stdout.write('', () => {
        process.exit(exitCode);
      });
    } else {
      // See if we can load the addon now.
      // We need to clean the require cache first.
      delete require.cache[NATIVE_MODULE];
      try {
        require(NATIVE_MODULE);
        console.log('Build successful.');
        // Make sure everything has been flushed.
        process.stdout.write('', () => {
          process.exit(0);
        });
      } catch (err) {
        console.error('Could not require native module after building!');
        console.error(err.stack);
        // Make sure everything has been flushed.
        process.stdout.write('', () => {
          process.exit(1);
        });
      }
    }
  });
}
