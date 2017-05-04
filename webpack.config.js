/* eslint-disable */
var path = require("path");
module.exports = {
	entry: "./src/app.js",
	output: {
		filename: "./public/bundle.js"
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["env", "es2015", "react"]
				}
			}
		}, {
			test: /\.scss$/,
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "sass-loader",
			}]
		}]
	}
};