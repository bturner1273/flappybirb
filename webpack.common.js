const path = require('path');

module.exports = {
    entry: { 'FlappyBirdNumberInput': './src/FlappyBirdNumberInput.tsx' },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ],

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        library: {
            name: '[name]',
            type: 'umd'
        },
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }
};