const BASE_URL = process.env.OBSERVATORY_API_URL || 'http://localhost:3000/';

export const embedCodes = {
	licensesPie: {
		title: 'Licenses Pie Chart',
		url: `${BASE_URL}/visualizations/licenses/LicensesPie`,
	},
	licensesBar: {
		title: 'Licenses Bar Chart',
		url: `${BASE_URL}/visualizations/license/LicensesBar`,
	},
	versioning: {
		title: 'Versioning',
		url: `${BASE_URL}/visualizations/versioning/Versioning`,
	},
	// Add more plots as needed
};
