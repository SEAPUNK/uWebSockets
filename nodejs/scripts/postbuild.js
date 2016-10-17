// This script runs after the install script's build process.
// All it does is move the built uws addon to the where it's
// supposed to be for the native.js require script.
const fs = require('fs');
const path = require('path');

const fromFile = path.join(__dirname, '../build/Release/uws.node');
const toFile = path.join(__dirname, `../lib/uws_${process.platform}_${process.versions.modules}.node`);

fs.renameSync(fromFile, toFile);
