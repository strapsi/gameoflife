const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/game-of-life.js'),
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'gol.js'
    },
    devtool: 'inline-source-map'
}