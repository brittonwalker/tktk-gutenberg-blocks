const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const { getWebpackEntryPoints } = require("@wordpress/scripts/utils/config");

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		tktkStyles: "./src/tktk-styles/index.js",
	},
	resolve: {
		...defaultConfig.resolve,
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.svg$/,
				use: ["@svgr/webpack", "url-loader"],
			},
		],
	},
};
