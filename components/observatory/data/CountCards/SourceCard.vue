<template>
	<v-card light rounded elevation="3" class="pr-3 pt-2 pl-3 pb-1">
		<v-row dense align="center">
			<v-col cols="4">
				<v-avatar color="#001752f8">
					<img :src="require(`~/static/${label}-logo.svg`)" />
				</v-avatar>
			</v-col>
			<v-col id="counts-text" cols="8">
				<span
					><h3>{{ title }}</h3></span
				>
				<span
					><h2>{{ formatNumber(Number(count)) }}</h2></span
				>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: 'SourceCard',
	props: ['title', 'count', 'label'],
	methods: {
		formatNumber(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
	},
};
</script>
<style scoped>
#counts-text {
	text-align: right !important;
}

.v-avatar img {
	width: 85%;
}

.v-card {
	min-height: 4.5rem;
	width: 100%;
	min-width: 8em;
	display: inline-block;
}

.v-card h3 {
	font-family: 'Open Sans', sans-serif;
	font-size: 0.9rem;
	font-weight: 300;
	line-height: normal;
	margin: 0.2rem;
}

.v-card h2 {
	font-family: 'Open Sans', sans-serif;
	font-size: 1rem;
	font-weight: 500;
	line-height: normal;
	margin: 0.3rem;
}
</style>
