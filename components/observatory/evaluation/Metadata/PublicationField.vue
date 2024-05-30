<template>
	<v-container>
		<v-row class="d-flex align-end">
			<v-col cols="10" class="mt-3 pb-0">
				<v-text-field
					v-model="title"
					label="Title"
					outlined
					dense
					class="text-body-2"
					@input="changeValue"
				></v-text-field>
			</v-col>
			<v-col cols="2" class="mt-3 pb-0">
				<v-text-field
					v-model="year"
					label="Year"
					outlined
					dense
					class="text-body-2"
					@input="changeValue"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row class="mt-0">
			<v-col cols="4">
				<v-text-field
					v-model="doi"
					label="DOI"
					outlined
					dense
					class="text-body-2"
					@input="changeValue"
				></v-text-field>
			</v-col>
			<v-col cols="2">
				<v-text-field
					v-model="pmid"
					label="PMID"
					outlined
					dense
					class="text-body-2"
					@input="changeValue"
				></v-text-field>
			</v-col>
			<v-col cols="2">
				<v-text-field
					v-model="pmcid"
					label="PMCID"
					outlined
					dense
					class="text-body-2"
					@input="changeValue"
				></v-text-field>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: 'PublicationField',
	props: ['item', 'field', 'index', 'id'],
	data() {
		return {
			title: '',
			year: '',
			doi: '',
			pmid: '',
			pmcid: '',
		};
	},
	mounted() {
		this.year = this.item.year;
		this.title = this.item.title;
		this.doi = this.item.doi;
		this.pmid = this.item.pmid;
		this.pmcid = this.item.pmcid;
	},
	methods: {
		checkIfRequired(field) {
			if (field === 'DOI') {
				if (this.doi === '' && this.pmid === '' && this.pmcid === '') {
					return 'At least one ID is required';
				} else {
					return true;
				}
			}
			if (field === 'PMID') {
				if (this.pmid === '' && this.doi === '' && this.pmcid === '') {
					return 'At least one ID is required';
				} else {
					return true;
				}
			}

			if (field === 'PMCID') {
				if (this.pmid === '' && this.doi === '' && this.pmid === '') {
					return 'At least one ID is required';
				} else {
					return true;
				}
			}
		},
		changeValue() {
			const newItem = {
				id: this.id,
				term: {
					title: this.title,
					year: this.year,
					doi: this.doi,
					pmid: this.pmid,
					pmcid: this.pmcid,
				},
			};

			const payload = {
				field: this.field,
				index: this.index,
				value: newItem,
			};
			this.$store.dispatch('observatory/evaluation/changeEntry', payload);
		},
	},
};
</script>
