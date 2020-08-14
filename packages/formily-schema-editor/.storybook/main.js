const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  webpackFinal: async config => {
    config.plugins.push(new MonacoWebpackPlugin())
    
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader")
        }
      ]
    }, {
      test: /\.scss$/,
      use: [
        {
          loader: require.resolve("style-loader")
        },
        require.resolve("css-loader"),
        require.resolve("fast-sass-loader")
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
