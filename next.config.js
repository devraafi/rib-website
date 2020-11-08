// const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass');
// const optimizedImages = require('next-optimized-images');
const withBabelMinify = require('next-babel-minify')();
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const withTypescript = require('@zeit/next-typescript');

module.exports =
  withBabelMinify(
    withSass(
      withTypescript(
        {
          webpack: function (config) {
            config.module.rules.push({
              test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 100000,
                  name: '[name].[ext]'
                }
              }
            });
            config.optimization.minimizer.push(
              new OptimizeCSSAssetsPlugin({})
            )
            return config
          },
          /* config options here */
          minified: true,
          cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: "[local]___[hash:base64:5]",
          },
        },
      ), {
      sassLoaderOptions: {}
    }
    )
  )
