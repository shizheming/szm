// var data = require('./data/data.js');
module.exports = {
    baseUrl: './',
    outputDir: '../../shizheming.github.io/dist',
    productionSourceMap: false,
    filenameHashing: false,
    lintOnSave: false,
    configureWebpack: () => {
        return {
            performance: {
                hints: false
            }
        };
    },
    /*devServer: {
        port: 8080,
        before(app) {
            data(app);
        }
    }*/
}