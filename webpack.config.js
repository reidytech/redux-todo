const path = require("path")
const webpack = require("webpack")

module.exports = {
	context: __dirname,
	entry: [
		"./index.js"
	],
	devtool: "cheap-eval-source-map",
	output: {
		path: path.join(__dirname, "public"),
		filename: "bundle.js",
		publicPath: "/public/"
	},
	resolve: {
		extensions: [".js", ".json"]
	},
	stats: {
		colors: true,
		reasons: true,
		chunks: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			}
		]
	}
}
