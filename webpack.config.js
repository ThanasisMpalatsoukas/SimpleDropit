const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './dev/index.js',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './demo')
    },
    devServer: {
        liveReload: true,
        contentBase: [
            path.resolve(__dirname, './dev'),
        ],
        publicPath: '/',
        watchContentBase: true,
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    minimize: false
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    "extract-loader",
                    "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dev/index.html',
            filename: './index.html',
            minify: {
                collapseWhitespace: false,
                preserveLineBreaks: true
            }
        })
    ],
    optimization: {
        minimize: false
    }
};

// const banner = [
//     pkg.title + ' - ' + pkg.version,
//     pkg.description,
//     pkg.homepage,
//     '',
//     'Made by ' + pkg.author,
//     'Under ' + pkg.license + ' License',
//     '',
// ].join('\n');

// const devConfig = {
//     mode: 'development',
//     devtool: 'cheap-module-source-map',
//     entry: './demo/index.js',
//     output: {
//         library: {
//             name: 'SimpleDropit',
//             type: 'umd',
//             umdNamedDefine: true,
//             export: 'default',
//         },
//         filename: 'simpledropit.js',
//         path: path.resolve(__dirname, 'dist/js'),
//         clean: false
//     },
//     devServer: {
//         liveReload: true,
//         contentBase: [
//             path.resolve(__dirname, './src'),
//             path.resolve(__dirname, './public'),
//         ],
//         watchContentBase: true,
//         compress: true,
//         port: 9000,
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.m?js$/,
//                 exclude: /(node_modules|bower_components)/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env']
//                     }
//                 }
//             }
//         ]
//     },
//     plugins: [
//         new webpack.BannerPlugin(banner)
//     ]
// }

// const prodConfig = {
//     mode: 'production',
//     entry: './src/index.js',
//     output: {
//         library: {
//             name: 'SimpleDropit',
//             type: 'umd2',
//         },
//         filename: 'simpledropit.min.js',
//         path: path.resolve(__dirname, 'dist/js'),
//         clean: false
//     },
//     plugins: [
//         new webpack.BannerPlugin(banner)
//     ]
// };

// module.exports = [
//     devConfig,
//     prodConfig
// ];