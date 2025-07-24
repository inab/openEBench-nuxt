<template>
	<v-row justify="space-around" class="main-row">
		<v-col>
			<div
				class="mt-0 mr-2 pt-3 pb-1 mb-2 number-card glow-card d-flex flex-column align-center justify-center text-white"
				style="
					background-color: #001752f8;
					border-radius: 12px;
					box-shadow: 0 0 10px rgba(18, 121, 219, 60%);
					transition: box-shadow 0.3s ease;
				"
				@mouseover="hover = true"
				@mouseleave="hover = false"
				:style="
					hover
						? 'background-color: #001752f8; border-radius: 10px; box-shadow: 0 0 20px rgba(18, 121, 219, 80%);'
						: 'background-color: #001752f8; border-radius: 10px; box-shadow: 0 0 10px rgba(18, 121, 219, 60%);'
				"
			>
				<div
					class="text-center number-text d-flex flex-column align-center justify-center"
					style="gap: 4px"
				>
					<v-icon size="28" color="white">mdi-database</v-icon>
					<span>Total</span>
				</div>
				<div class="text-center number">
					{{ formatNumber(Number(count)) }}
				</div>
			</div>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'TotalCard',
	props: ['count'],
	data() {
		return {
			hover: false,
		};
	},
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
	margin-bottom: 1em;
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
	font-size: 1.4em;
	font-weight: 600;
	line-height: 1.2em;
	word-break: initial;
	padding-bottom: 0;
}

.number-highlight {
	font-weight: 700;
}

.glow-card {
	box-shadow: 0 0 15px rgba(68, 111, 189, 40%); /* light blue glow */
	transition: box-shadow 0.3s ease;
}

.glow-card:hover {
	box-shadow: 0 0 20px rgba(68, 111, 189, 60%); /* brighter on hover */
}
</style>
