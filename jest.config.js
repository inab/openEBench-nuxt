module.exports = {
	setupFiles: ['<rootDir>/test/unit/setup'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^~/(.*)$': '<rootDir>/$1',
		'^vue$': 'vue/dist/vue.common.js',
	},
	moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
		'^.+\\.js$': 'babel-jest',
		'.*\\.(vue)$': 'vue-jest',
		'.+\\.(css|scss|png|jpg|svg|gif|webp)$': 'jest-transform-stub',
		'\\.md$': 'jest-raw-loader',
	},
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/components/**/*.vue',
		'<rootDir>/pages/**/*.vue',
	],
	testEnvironment: 'jsdom',
};
