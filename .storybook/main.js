const path = require('path');

module.exports = {
	stories: [
		'../stories/**/*.stories.mdx',
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	framework: '@storybook/vue',
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../'),
		});
		let rule = config.module.rules.find(
			(r) =>
				// it can be another rule with file loader
				// we should get only svg related
				r.test &&
				r.test.toString().includes('svg') &&
				// file-loader might be resolved to js file path so "endsWith" is not reliable enough
				r.loader &&
				r.loader.includes('file-loader')
		);
		rule.test =
			/\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

		config.module.rules.push({
			test: /\.svg$/,
			use: ['vue-svg-loader'],
		});

		config.resolve.alias['~'] = path.resolve(__dirname, '../');
		return config;
	},
};
