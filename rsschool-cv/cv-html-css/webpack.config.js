const {join, resolve} = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const fileName = ext => ext
    ? isDev ? `[name].${ext}` : `[name].[contenthash:8].${ext}`
    : isDev ? '[name][ext]' : '[name].[contenthash:8][ext]'

const optimization = () => {
    const optimizationConfig = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (!isDev) optimizationConfig.minimizer = [
        new CssMinimizerPlugin(),
        new TerserPlugin()
    ]

    return optimizationConfig
}

const cssLoaders = addition => {
    let loaders = [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                postcssOptions: {
                    plugins: [
                        'postcss-preset-env',
                        'css-mqpacker'
                    ]
                }
            }
        }
    ]
    if (addition) loaders.push(addition)

    return loaders
}

const plugins = () => {
    let array = [
        new HtmlPlugin({
            template: join(__dirname, 'public', 'index.html')
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(__dirname, 'public'),
                    to: resolve(__dirname, 'docs'),
                    globOptions: {
                        ignore: ['**/*.html']
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin({
            linkType: 'text/css',
            filename: fileName('css'),
            chunkFilename: fileName('css')
        }),
        new ForkTsCheckerPlugin({
            async: false
        })
    ]

    if (isDev) array.push(new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx']
    }))

    return array
}

module.exports = {
    target: 'web',
    mode: isDev ? 'development' : 'production',
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        compress: true,
        client: {
            progress: true,
            overlay: {
                errors: true,
                warnings: false
            },
            logging: 'error',
        }
    },
    devtool: isDev ? 'source-map' : undefined,
    entry: {
        main: join(__dirname, 'src', 'index.tsx')
    },
    output: {
        path: resolve(__dirname, 'docs'),
        filename: fileName('js'),
        chunkFilename: fileName('js'),
        assetModuleFilename: fileName(),
        clean: true
    },
    optimization: optimization(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.(s[ac]ss)$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(?:ico|png|svg|jpe?g|gif|woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(md|mp3|mp4)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: plugins(),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
        alias: {
            '@': resolve(__dirname, 'src'),
            '@styles': resolve(__dirname, 'src/styles'),
            '@components': resolve(__dirname, 'src/components'),
        }
    },
    performance: {
        hints: 'warning'
    }
}