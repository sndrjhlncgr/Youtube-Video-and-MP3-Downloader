const {resolve} = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    context: resolve(__dirname, 'src'),
    entry: ['react-hot-loader/patch', './index.jsx'],
    output: {
        filename: 'build.js',
        path: '/',
        publicPath: '/javascripts',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components|public\/)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
}
