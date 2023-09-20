<template>
	<v-chip :small="!big" label text-color="#F48F43" color="#F48F43" outlined>
		{{ descriptions[type] }}
	</v-chip>
</template>
<script>
export default {
	name: 'ChipType',
	props: {
		type: {
			type: String,
			required: true,
		},
		big: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			descriptions: {
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
			},
		};
	},
};
</script>
