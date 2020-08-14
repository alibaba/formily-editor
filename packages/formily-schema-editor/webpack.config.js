const path = require("path");

module.exports = {
  mode: "production",
  devtool: "none",
  entry: {
    index: path.resolve(__dirname, "./src/index")
  },
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "index.js",
    libraryTarget: "umd"
  },
  stats: "errors-only",
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },

  externals: {
    react: "react",
    "react-dom": "react-dom",
    "react-is": "react-is",
    "@alifd/next": "@alifd/next",
    moment: "moment",
    "@formily/next": "@formily/next",
    "@formily/next-components": "@formily/next-components",
    "@formily/react": "@formily/react",
    "@formily/react-schema-renderer": "@formily/react-schema-renderer",
    "@formily/shared": "@formily/shared",
    "styled-components": "styled-components",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [require.resolve("ts-loader")]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve("style-loader")
          },
          require.resolve("css-loader")
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: require.resolve("style-loader")
          },
          {
            loader: require.resolve("css-loader")
          },
          {
            loader: require.resolve("fast-sass-loader")
          }
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          minetype: "application/font-woff"
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          minetype: "application/font-woff"
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          minetype: "application/octet-stream"
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          minetype: "application/vnd.ms-fontobject"
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          minetype: "image/svg+xml"
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000
        }
      },
      {
        test: /\.html?$/,
        loader: require.resolve("file-loader"),
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  }
};
