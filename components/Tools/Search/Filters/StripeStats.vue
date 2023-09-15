<!--
	This component is a stripe with a label on the left and a number on the right.
	The stripe is filled resembling a bar proportional to the number.
-->
<template>
	<v-row :style="style" class="ma-1 pa-0 d-flex align-center">
		<v-col cols="10" class="pa-0 ma-0 d-flex align-left flex-column">
			<v-checkbox
				v-model="checkbox"
				class="pa-0 ma-0"
				hide-details
				dense
				@click="$emit('update:active')"
			>
				<template #label>
					<span
						class="ma-0 pa-0 text-body-2 black--text primary--text"
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
				class="ma-0 pa-0 text-body-2 primary--text"
				:class="{ active: checkbox }"
				>{{ numberWithCommas(count) }}</span
			>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: 'StripeStats',
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
		active: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	data: () => ({
		checkbox: false,
		height: 30,
		emptyPercent: null,
	}),
	computed: {
		style() {
			const emptyPercent = 1 - this.percent;
			return {
				height: this.height + 'px',
				width: '100%',
				background:
					'linear-gradient(to right, white, white calc(' +
					emptyPercent +
					' * 100%) , #EAF1F7 calc(' +
					emptyPercent +
					' * 100%), #EAF1F7)',
			};
		},
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

.active__stripe {
	background: #eaf1f7;
}

::v-deep .v-input--selection-controls__input {
	margin: 0 !important;
	padding-right: 0 !important;
}
</style>
