const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    mode: "production",
    plugins: [new NodePolyfillPlugin()],
    resolve: {
        extensions: ["", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: "defaults",
                                    },
                                ],
                                "@babel/preset-react",
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.component\.css$/i,
                use: [
                    {
                        loader: "to-string-loader",
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.component\.s[ac]ss$/i,
                use: [
                    {
                        loader: "to-string-loader",
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
};
