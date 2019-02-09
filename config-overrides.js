const rewireMobX = require('react-app-rewire-mobx');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* config-overrides.js */
module.exports = function override(config, env) {

  // use the Preact rewire
  if (env === "production") {
    console.log("⚡ Production build with Preact");
  }

  if (env === "development") {
    console.log("DEV override entry-point");
  }

  config.plugins.push(new HtmlWebpackPlugin({  // Also generate a test.html
    filename: config.plugins[1].options.filename,
    template: config.plugins[1].options.template
  }));

  config.plugins[1].options.template = config.plugins[1].options.template.replace('index.html', 'app.html');
  config.plugins[1].options.filename = config.plugins[1].options.filename.replace('index.html', 'app.html');

  // use the MobX rewire
  config = rewireMobX(config, env);

  return config;
}
