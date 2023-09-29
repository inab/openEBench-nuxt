const descriptions = {
	web: 'Web Application',
	cmd: 'Command Line Tool',
	app: 'Desktop Application',
	suite: 'Software Suite',
	sparql: 'SPARQL Endpoint',
	workflow: 'Workflow',
	gui: 'Graphical User Interface',
	api: 'Application Programming Interface',
	rest: 'REST API',
	lib: 'Library',
	unknown: 'Undefined',
	undefined: 'Undefined',
	db: 'Database',
	ontology: 'Ontology',
	other: 'Other',
	plugin: 'Plugin',
	workbench: 'Workbench',
	script: 'Script',
	soap: 'SOAP API',
};

export function getSoftwareTypeDescription(type) {
	return descriptions[type];
}
