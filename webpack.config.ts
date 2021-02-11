import * as path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
export default function createConfig(_, env): Configuration {
  const { mode } = env;
  return {
    mode,
    entry: "./src/index.tsx",
    output: {
      filename:
        mode === "development" ? "[name].js" : "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            mode === "development"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.png$/,
          use: "url-loader",
        },
      ],
    },
    devServer: {
      port: 8080,
      open: true,
      overlay: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename:
          mode === "development" ? "[name].css" : "[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
      new CompressionWebpackPlugin({}),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: "write-references",
        },
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@util": "/src/util",
        "@store": "/src/store",
      },
    },
    devtool: mode === "development" ? "eval-source-map" : undefined,
  };
}
