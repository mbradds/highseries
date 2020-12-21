const path = require("path");

module.exports = {
  mode: "production",
  //   target: "es5",
  entry: {
    testCharts: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle_[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-private-methods", { loose: true }],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
};
