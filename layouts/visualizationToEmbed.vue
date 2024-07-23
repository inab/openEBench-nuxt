<template>
	<div class="embed-container">
		<v-app>
			<div class="main-content">
				<Nuxt />
			</div>
			<v-footer ref="footer" padless class="text-caption">
				<v-col class="text-caption" cols="12">
					Provided by
					<a href="https://openebench.bsc.es/" target="_blank">OpenEBench</a>
				</v-col>
			</v-footer>
		</v-app>
	</div>
</template>

<script>
export default {
	layout: 'visualizationToEmbed',
};
</script>

<style scoped>
html,
body {
	height: 100%;
	margin: 0;
}

.embed-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	overflow: hidden;
}

v-app {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	overflow: hidden;
}

.main-content {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

v-footer {
	flex-shrink: 0;
}
</style>
