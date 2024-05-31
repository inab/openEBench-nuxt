<template>
	<v-tabs color="#0b579f" class="tabs" right>
		<v-tab>
			<v-icon>mdi-chart-bar </v-icon>
		</v-tab>
		<v-tab>
			<v-icon>mdi-book-open-variant</v-icon>
		</v-tab>
		<v-tab-item :transition="false" class="pt-2 pb-2 pr-2">
			<v-row align="center" class="mt-0" justify="space-around">
				<v-col xl="12" lg="12" md="12" sm="12" cols="12" class="mb-0 pb-0">
					<component :is="plotComponent" v-bind="properties"></component>
				</v-col>
				<v-col xl="12" lg="12" md="12" sm="12" cols="12" align-self="start">
					<p class="mt-0 mb-2 ml-8">
						<span class="highlight">{{ caption }}</span>
					</p>
				</v-col>
			</v-row>
		</v-tab-item>
		<v-tab-item :transition="false" class="pt-2 pb-2 pr-5">
			<component :is="infoComponent"></component>
		</v-tab-item>
	</v-tabs>
</template>
<script>
export default {
	props: ['infoComponent', 'plotComponent', 'properties', 'caption'],
	data: () => ({
		absolute: true,
		overlay: false,
	}),
};
</script>
<style scoped>
.v-btn {
	margin-right: 2em;
	margin-bottom: 1em;
	margin-top: 0;
}

div.v-tab {
	min-width: 4em !important;
	max-width: 7em !important;
	margin-right: 1em;
}

div.v-tabs-slider-wrapper {
	min-width: 4em !important;
	max-width: 7em !important;
	margin-right: 1em;
}
</style>
