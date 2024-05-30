<template>
	<v-row justify="space-around" class="main-row">
		<v-col>
			<v-card
				dark
				rounded
				class="mt-0 mr-2 pb-1 number-card"
				color="#001752f8"
				elevation="3"
			>
				<v-card-text class="text-center number-text"> Total </v-card-text>
				<v-card-text class="text-center number">
					{{ formatNumber(Number(count)) }}
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'TotalCard',
	props: ['count'],
	methods: {
		formatNumber(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
	},
};
</script>

<style scoped>
.main-row {
	height: 8em;
	margin-top: 2em;
}

.number-card {
	word-break: break-all;
}

.number {
	font-size: 2.1rem;
	color: white !important;
}

.number-text {
	color: white !important;
	font-family: Roboto, sans-serif;
	font-size: 1.3em;
	font-weight: 300;
	line-height: 1em;
	word-break: initial;
	padding-bottom: 0;
}

.number-highlight {
	font-weight: 700;
}
</style>
