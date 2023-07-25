<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">LICENSE</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<div>
				<span class="text-body-2">Filter tools by types of license:</span>
				<v-btn-toggle
					v-model="selectedLicenseFamilies"
					group
					dense
					multiple
					tile
					color="primary"
					class="flex-wrap mt-1"
				>
					<v-btn
						v-for="(item, i) in licenseFamilies"
						:key="i"
						@click="updateLicenses"
					>
						<span class="text-caption">{{ item }}</span>
					</v-btn>
				</v-btn-toggle>
			</div>

			<div class="mt-2">
				<span class="text-body-2">Or by specific Open Source licenses:</span>
				<v-autocomplete
					v-model="licenses"
					:items="SPDXLicenses"
					multiple
					outlined
					hint="Filter tools with at least one of the selected licenses."
					persistent-hint
					color="primary lighten-1"
					label="Select"
					item-text="value"
					item-value="value"
					class="text-body-2 ml-2 mt-2"
				>
					<template #selection="data">
						<v-chip
							v-bind="data.attrs"
							:input-value="data.selected"
							close
							label
							color="#D2E0ED"
							text-color="primary"
							@click="data.select"
							@click:close="remove(data.item)"
						>
							{{ data.item }}
						</v-chip>
					</template>
					<template #item="data">
						<template>
							<v-list-item-content
								class="text-body-2"
								v-text="data.item"
							></v-list-item-content>
						</template>
					</template>
				</v-autocomplete>
			</div>
		</v-expansion-panel-content>
		<v-divider class="mt-0 mb-0"></v-divider>
	</v-expansion-panel>
</template>
<script>
export default {
	name: 'LicenseFilter',
	data() {
		return {
			licenses: [],
			licenseFamilies: ['OS Permissive', 'OS Copyleft', 'Other'],
			selectedLicenseFamilies: [0, 1, 2],
			SPDXLicenses: [
				'Apache-2.0',
				'Artistic-2.0',
				'BSD-2-Clause',
				'BSD-3-Clause',
				'BSD-3-Clause-Clear',
				'BSL-1.0',
			],
		};
	},
	methods: {
		remove(item) {
			this.licenses.splice(this.licenses.indexOf(item), 1);
		},
	},
};
</script>
