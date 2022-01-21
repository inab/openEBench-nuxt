let darkMode = false;
if (typeof Storage !== 'undefined') {
	// eslint-disable-line
	darkMode = localStorage.getItem('luxiDarkMode') || false;
}

const palette = {
	default: {
		primary: '#0B579F', // primary main
		accent: '#F47C21', // secondary main
	},
};

export const theme = {
	...palette.default,
};

export default {
	rtl: false,
	theme: {
		dark: darkMode === 'true',
		themes: {
			light: {
				...theme,
			},
			dark: {
				...theme,
			},
		},
		options: {
			customProperties: true,
		},
	},
	icons: {
		values: {
			projects: {
				component: require('~/static/icons/projects.svg?inline'),
			},
			benchmark: {
				component: require('~/static/icons/benchmark.svg?inline'),
			},
			observatory: {
				component: require('~/static/icons/observatory.svg?inline'),
			},
		},
	},
};
