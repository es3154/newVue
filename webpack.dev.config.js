var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
      main : './src/main.js'
  },
  output: {
      path: path.resolve(__dirname, 'bulider'),
      publicPath: "/assets/",
      filename: '[name].js',
      chunkFilename: '[name].js'
  },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    },
  module: {
    rules: [
        {
            test:/\.css$/,
            exclude:/node_modules/,
            use:[
                "style-loader",
                "css-loader",
                "vue-style-loader"
            ]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            'env',
                            {
                                modules: false,
                                useBuiltlns: "usage"   //Polyfill 相关
                            }
                        ],
                        'stage-2'
                    ],
                    plugins: [
                        'transform-runtime',
                        'syntax-dynamic-import'
                    ]
                }
            }]
        },
        {
            test: /\.vue$/,
            exclude: /(node_modules)/,
            use: [{
                loader: "vue-loader",
                options: {
                    loaders: {
                        js: 'babel-loader?{"presets":["env"]}',
                        css: 'vue-style-loader!css-loader'
                    }
                }
            }]
        },
        {
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                "less-loader"
                ]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            ]
        }
    ]
  },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks : function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ],
    devtool: 'source-map',   //调试相

};