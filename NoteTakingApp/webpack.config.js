// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// We'll refer to our source and dist paths frequently, so let's store them here
const PATH_SOURCE = path.join(__dirname, './src');
const PATH_DIST = path.join(__dirname, './dist');

// Export a configuration object
module.exports = env => {
  const environment = env.environment;
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';
  return {
    // Tell Webpack to do some optimizations for our environment (development
    // or production). Webpack will enable certain plugins and set
    // `process.env.NODE_ENV` according to the environment we specify.
    // https://webpack.js.org/configuration/mode
    mode: environment,

    devServer: {
      contentBase: PATH_DIST,
      host: 'localhost',
      port: 8080,
      historyApiFallback: true,
      overlay: {
        errors: true,
        warnings: true
      }
    },

    // The point or points to enter the application. This is where Webpack will
    // start. We generally have one entry point per HTML page. For single-page
    // applications, this means one entry point. For traditional multi-page apps,
    // we may have multiple entry points.
    // https://webpack.js.org/concepts#entry
    entry: [path.join(PATH_SOURCE, './index.js')],

    // Tell Webpack where to emit the bundles it creates and how to name them.
    // https://webpack.js.org/concepts#output
    // https://webpack.js.org/configuration/output#outputFilename
    output: {
      path: PATH_DIST,
      filename: 'js/[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/i,

          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/, // Apply this rule to files ending in .js
          exclude: /node_modules/, // Don't apply to files residing in node_modules
          use: {
            // Use the following loader and options
            loader: 'babel-loader',
            // We can pass options to both babel-loader and Babel. This option object
            // will replace babel.config.js
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: true, // Output the targets/plugins used when compiling

                    // Configure how @babel/preset-env handles polyfills from core-js.
                    // https://babeljs.io/docs/en/babel-preset-env
                    useBuiltIns: 'usage',

                    // Specify the core-js version. Must match the version in package.json
                    corejs: 3

                    // Specify which environments we support/target for our project.
                    // (We have chosen to specify targets in .browserslistrc, so there
                    // is no need to do it here.)
                    // targets: "",
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    plugins: [
      // This plugin will generate an HTML5 file that imports all our Webpack
      // bundles using <script> tags. The file will be placed in `output.path`.
      // https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: path.join(PATH_SOURCE, './index.html')
      }),
      new CleanWebpackPlugin()
    ]
  };
};
