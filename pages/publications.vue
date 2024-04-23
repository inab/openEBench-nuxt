<template>
	<v-container>
		<h1 class="text--h3">OpenEBench Publications</h1>
		<br />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat.
		</p>
		<br />
		<v-tabs :vertical="vertical" class="mt-10">
			<v-tab class="justify-start">
				<v-icon left> mdi-information-outline </v-icon>
				Papers
			</v-tab>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined class="pa-5" elevation="1">
					<v-row no-gutters align="center">
						<v-col>
							<marked-wrapper>fnsdjnfjsdnf </marked-wrapper>
						</v-col>
					</v-row>
				</v-card>
			</v-tab-item>
			<v-tab class="justify-start">
				<v-icon left> mdi-information-outline </v-icon>
				Posters
			</v-tab>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined class="pa-5" elevation="1">
					<v-row no-gutters align="center">
						<v-col>
							<marked-wrapper>123456 </marked-wrapper>
						</v-col>
					</v-row>
				</v-card>
			</v-tab-item>
			<v-tab class="justify-start">
				<v-icon left> mdi-information-outline </v-icon>
				Videos
			</v-tab>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined class="pa-5" elevation="1">
					<v-row no-gutters align="center">
						<v-col>
							<marked-wrapper>123456 </marked-wrapper>
						</v-col>
					</v-row>
				</v-card>
			</v-tab-item>
			<v-tab class="justify-start">
				<v-icon left> mdi-information-outline </v-icon>
				Training Materials
			</v-tab>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined class="pa-5" elevation="1">
					<v-row no-gutters align="center">
						<v-col>
							<marked-wrapper>123456 </marked-wrapper>
						</v-col>
					</v-row>
				</v-card>
			</v-tab-item>
		</v-tabs>
	</v-container>
</template>

<script>
export default {
	name: 'PublicationsPage',
	computed: {
		vertical() {
			return this.$vuetify.breakpoint.mdAndUp;
		},
		breadcrumbs() {
			return [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'About',
					disabled: true,
				},
				{
					text: 'Publications',
					disabled: true,
				},
			];
		},
	},
	watch: {
		breadcrumbs() {
			this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		},
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>

<style lang="scss" scoped>
.v-tab {
	text-transform: none !important;
}
</style>
