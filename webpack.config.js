const path = require('path');
const PugPlugin = require('pug-plugin');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const { DEVSERVER_PORT, DEVSERVER_HOST } = process.env;

module.exports = (env) => {
    //TODO чтобы подключить визуальный интерфейс, переименуй env в project
    return {
        mode,
        target,
        devtool,
        devServer: {
            port: DEVSERVER_PORT,
            host: DEVSERVER_HOST,
            open: true,
        },
        entry: {
            index: `./projects/${env.project}/index.pug`, //чтобы подключить визуальный интерфейс, убер env
        },
        output: {
            path: path.resolve(__dirname, 'dist'), //TODO складывать в соотв.папку
            clean: true,
            filename: '[name].[contenthash].js',
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
