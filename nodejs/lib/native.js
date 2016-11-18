'use strict';

try {
    module.exports = process.binding('uws_builtin');
} catch (e) {
    module.exports = require(`../uws_${process.platform}_${process.versions.modules}`);
}
