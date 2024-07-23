<template>
	<component :is="componentName" />
</template>

<script>
export default {
	layout: 'visualizationToEmbed',
	asyncData({ params }) {
		const { domain, visualization, collection } = params;
		return { domain, visualization, collection };
	},
	data() {
		return {
			domain: this.$route.params.domain,
			visualization: this.$route.params.visualization,
			collection: this.$route.params.collection,
		};
	},
	computed: {
		componentName() {
			const domain = this.domain;
			const visualization = this.visualization;

			// Create the component name based on the domain and visualization
			try {
				return require(`~/components/observatory/visualizations/${domain}/${visualization}.vue`)
					.default;
			} catch (e) {
				return require('~/components/observatory/visualizations/ErrorComponent.vue')
					.default;
			}
		},
	},
};
</script>
