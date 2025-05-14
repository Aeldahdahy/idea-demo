const path = require('path');
const flowbiteReact = require("flowbite-react/plugin/webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['source-map-loader'],
        exclude: [
          path.resolve(__dirname, 'node_modules/flowbite') // ✅ Excludes ALL Flowbite source maps
        ]
      }
    ]
  },
  ignoreWarnings: [
    {
      module: /node_modules\/flowbite/, // ✅ Ignores warnings if some slip through
      message: /Failed to parse source map/,
    },
  ],
  plugins: [flowbiteReact()]
};
