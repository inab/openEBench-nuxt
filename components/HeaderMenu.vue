<template>
	<v-app-bar fixed app>
		<v-btn
			v-if="$vuetify.breakpoint.smAndDown"
			icon
			@click.stop="handleToggleOpen"
		>
			<v-icon>mdi-menu</v-icon>
		</v-btn>
		<v-img
			class="mx-2"
			:src="require('~/static/images/opeb_logo.gif')"
			max-height="80"
			max-width="80"
			contain
		/>
		<div v-if="$vuetify.breakpoint.mdAndUp" class="ml-16">
			<v-btn text> Benchmarking </v-btn>
			<v-btn text> Tools & Stats </v-btn>
			<v-btn text> About </v-btn>
		</div>
		<v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
		<v-btn
			v-if="$vuetify.breakpoint.mdAndUp"
			depressed
			outlined
			color="primary"
		>
			<v-icon left>mdi-open-in-new</v-icon> Benchmark your Tool
		</v-btn>
		<v-btn v-if="$vuetify.breakpoint.mdAndUp" depressed color="ml-3 primary">
			<v-icon left>mdi-login-variant</v-icon> Login
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	name: 'HeaderMenu',
	data() {
		return {
			openNavMobile: null,
			fixed: false,
		};
	},
	methods: {
		handleToggleOpen() {
			this.openNavMobile = !this.openNavMobile;
		},
	},
};
</script>
