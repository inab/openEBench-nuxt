module.exports = {
	customSyntax: 'postcss-html',
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recommended-vue',
		'stylelint-config-prettier',
	],
	// add your custom config here
	// https://stylelint.io/user-guide/configuration
	rules: {
		'selector-class-pattern': null,
		'color-function-notation': null,
		'declaration-block-no-duplicate-properties': [
			true,
			{
				// Specify the properties to ignore for duplicate detection
				ignore: ['consecutive-duplicates'],
			},
		],
	},
};
