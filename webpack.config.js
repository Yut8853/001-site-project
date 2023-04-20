const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MODE = "development";
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
  },
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.scss/,  
        use: [
          {
              loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップを有効にする
              sourceMap: enabledSourceMap,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap
            },
          }
      ]
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg|webp)$/,
        // 画像をBase64として取り込む
        type: "asset/inline",
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({

    }),
    new HtmlWebpackPlugin({				
			template: './src/index.html',
		}),
  ],
  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    static: "dist",
    open: true
  }
};
