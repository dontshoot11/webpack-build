const path = require('path');
const fs = require('fs-extra');
const PugPlugin = require('pug-plugin');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const { DEVSERVER_PORT, DEVSERVER_HOST } = process.env;
 
module.exports = (env) => {
    //TODO чтобы подключить визуальный интерфейс, переименуй env в project
    const entries = {};
    const files = fs.readdirSync(`./projects/${env.project}/`);
    files.forEach(file => {
        if (file.match(/\.pug$/)) {
           const name = file.split('.')[0];
            entries[name] = `./projects/${env.project}/${file}`;
        }})

    return {
        mode,
        target,
        devtool,
        devServer: {
            port: DEVSERVER_PORT,
            host: DEVSERVER_HOST,
            open: true,
            static: './static', //TODO  заставить вотчер работац
        },
        entry: entries,
        output: {
            path: path.resolve(__dirname, `projects/${env.project}/`, 'dist'),
            clean: true,
            filename: '[name].[contenthash].js',
            assetModuleFilename: 'assets/[hash][ext]',
        },
        plugins: [
            new PugPlugin({
                pretty: devMode ? true : false,
                extractCss: {
                    filename: '[name].[contenthash].css',
                },
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: PugPlugin.loader,
                    options: {
                        method: 'render',
                        esModule: true,
                    },
                },
                {
                    test: /\.(c|sa|sc)ss$/i,
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [require('postcss-preset-env')],
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.woff2?$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]',
                    },
                },
                {
                    test: /\.(jpe?g|png|webp|gif|svg)$/i,
                    use: [
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    ],
                    type: 'asset/resource',
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
    };
};
