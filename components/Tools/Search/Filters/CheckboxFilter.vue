<template>
	<v-row :style="style" class="ma-1 pa-0 d-flex align-center">
		<v-col cols="10" class="pa-0 ma-0 d-flex align-left flex-column">
			<v-checkbox v-model="checkbox" class="pa-0 ma-0" hide-details dense>
				<template #label>
					<span
						class="ma-0 pa-0 text-caption black--text primary--text"
						:class="{ active: checkbox }"
						>{{ label }}</span
					>
				</template>
			</v-checkbox>
		</v-col>
		<v-col
			cols="2"
			class="pa-0 ma-0 pr-1 text-right d-flex align-right flex-column"
		>
			<span
				class="ma-0 pa-0 text-caption primary--text"
				:class="{ active: checkbox }"
				>{{ numberWithCommas(count) }}</span
			>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: 'CheckboxFilter',
	props: {
		label: {
			type: String,
			required: true,
		},
		count: {
			type: Number,
			required: true,
		},
		percent: {
			type: Number,
			required: true,
		},
	},
	data: () => ({
		checkbox: false,
		height: 30,
		emptyPercent: null,
	}),
	computed: {
		style() {
			return {
				height: this.height + 'px',
				background:
					'linear-gradient(to right, white, white calc(' +
					this.emptyPercent +
					' * 100%) , #EAF1F7 calc(' +
					this.emptyPercent +
					' * 100%), #EAF1F7)',
			};
		},
	},
	mounted() {
		this.emptyPercent = 1 - this.percent;
	},
	methods: {
		numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
	},
};
</script>
<style lang="scss" scoped>
.active {
	font-weight: bold;
}

::v-deep .v-input--selection-controls__input {
	margin: 0 !important;
	padding-right: 0 !important;
}
</style>
