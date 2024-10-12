const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "fs": false,  // No need for 'fs' in the browser
            "path": require.resolve("path-browserify"),  // Polyfill for 'path'
            "crypto": require.resolve("crypto-browserify")  // Polyfill for 'crypto'
        }
    }
};
