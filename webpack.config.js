const path = require('path');

module.exports = {
    entry: './es6/app/App.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'es6'),
                loader: 'babel-loader' }
        ]
    }
};
