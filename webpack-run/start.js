'use strict'
//"start": "webpack-dev-server --config webpack-config/webpack.dev.config.js --color --progress --hot",
require('./check-versions')()

const path = require('path')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const utils = require('../webpack-config/utils')
const config = require('../webpack-config/index')

// console.log("process.env:", process.env);
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const HOST = process.env.HOST || config.dev.host;
const PORT = Number(process.env.PORT) || config.dev.port

const ora = require('ora')
const devWebpackConfig = require('../webpack-config/webpack.dev.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// Add FriendlyErrorsPlugin
devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
  compilationSuccessInfo: {
    messages: [`Your application is running here: http://${HOST}:${PORT}`],
  },
  onErrors: config.dev.notifyOnErrors
    ? utils.createNotifierCallback()
    : undefined
}))

const compiler = Webpack(devWebpackConfig);
const devServerConfig = {
  ...devWebpackConfig.devServer,
  // config:
  progress: true,
  stats: {
    // timings: true,
    // version: true,
    // warnings: true,
    colors: true,
    // entrypoints: false,
    // children: false,
  }, 
};

const devServer = new WebpackDevServer(compiler, devServerConfig);
// const portfinder = require('portfinder')

const spinner = ora('starting for development...')
spinner.start()
// Launch WebpackDevServer.
devServer.listen(PORT, HOST, err => {
    if (err) throw err
    // console.log("devWebpackConfig:", devWebpackConfig);
    spinner.stop()
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});