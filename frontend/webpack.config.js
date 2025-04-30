module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/, // Only match .css files
          use: [
            'style-loader', // Injects CSS into the DOM
            'css-loader',   // Resolves CSS imports
            'postcss-loader' // Processes CSS with PostCSS (Tailwind, Autoprefixer, etc.)
          ]
        },
        {
          test: /\.(js|jsx|ts|tsx)$/, // Match JavaScript/TypeScript files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Or another JS loader
          }
        }
      ]
    }
  };