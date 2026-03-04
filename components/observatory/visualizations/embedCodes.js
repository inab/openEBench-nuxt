const BASE_URL = 'http://openebench.bsc.es';

export const embedCodes = {
	licensesPie: {
		title: 'Licenses Pie Chart',
		url: `${BASE_URL}/visualizations/licenses/LicensesPie`,
	},
	licensesBar: {
		title: 'Open Source Licenses Bar Chart',
		url: `${BASE_URL}/visualizations/license/LicensesBar`,
	},
	versionControl: {
		title: 'Version Control Repositories Bars Chart',
		url: `${BASE_URL}/visualizations/versionControl/VersionControlBars`,
	},
	publications: {
		title: 'Software Publications Percentage and Impact Factor Plot',
		url: `${BASE_URL}/visualizations/publications/PublicationsScatters`,
	},
	versioningPie: {
		title: 'Versioning Pie Chart',
		url: `${BASE_URL}/visualizations/versioning/VersioningPie`,
	},
	dependencies: {
		title: 'Dependencies Plot',
		url: `${BASE_URL}/visualizations/dependencies/DependenciesPlot`,
	},
	documentation: {
		title: 'Documentation Plot',
		url: `${BASE_URL}/visualizations/documentation/DocumentationPlot`,
	},
	findabilityBubble: {
		title: 'Findability Bubble Chart',
		url: `${BASE_URL}/visualizations/FAIRness/FindabilityBubble`,
	},
	accessibilityBubble: {
		title: 'Accessibility Bubble Chart',
		url: `${BASE_URL}/visualizations/FAIRness/AccessibilityBubble`,
	},
	interoperabilityBubble: {
		title: 'Interoperability Bubble Chart',
		url: `${BASE_URL}/visualizations/FAIRness/InteroperabilityBubble`,
	},
	reusabilityBubble: {
		title: 'Reusability Bubble Chart',
		url: `${BASE_URL}/visualizations/FAIRness/ReusabilityBubble`,
	},
};
