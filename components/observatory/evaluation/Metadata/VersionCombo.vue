<template>
	<v-combobox
		v-model="selectedVersion"
		:items="versions"
		label=""
		dense
		small-chips
		deletable-chips
		hint="Select/introduce the version this metadata applies to"
		persistent-hint
		class="text-body-2 mt-6"
		@change="changeValue"
	></v-combobox>
</template>
<script>
export default {
	name: 'MetaRegistriesCombo',
	props: ['initialSelectedVersion', 'versions', 'field'],
	data() {
		return {
			selectedVersion: this.initialSelectedVersion,
		};
	},
	watch: {
		initialSelectedVersion() {
			this.selectedVersion = this.initialSelectedVersion;
		},
	},
	mounted() {
		this.changeValue();
	},
	methods: {
		changeValue() {
			const payload = {
				field: this.field,
				value: this.selectedVersion,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/updateSelectorEntry',
				payload
			);
			this.$forceUpdate();
		},
	},
};
</script>
