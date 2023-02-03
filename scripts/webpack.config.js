const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const dotenv = require('dotenv')
const webpack = require('webpack')

dotenv.config()

// NODE_ENV (노드 환경 변수) 개발 모드인지, 운영 모드인지 확인용
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.tsx',

  // 모듈을 해석하는 방식, 번들링에 사용할 파일 (.js, .jsx)
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  output: {
    // 웹팩을 통한 결과물을 저장, 반환할 곳
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[contenthash:8].js',

    // 새로운 내용을 덮어씌울 때 이전 내용을 지우는가
    clean: true,
  },

  // 편리한 디버깅용
  devtool: isProduction ? false : 'eval-source-map',
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    client: {
      overlay: true,
      progress: true,
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    isProduction
      ? new HtmlWebpackPlugin({
          template: 'public/index.html',
          minify: true,
        })
      : new HtmlWebpackPlugin({
          template: 'public/index.html',
        }),
    isProduction
      ? new MiniCssExtractPlugin({
          linkType: false,
          filename: '[name].[contenthash:8].css',
        })
      : undefined,
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ].filter(Boolean),
}
