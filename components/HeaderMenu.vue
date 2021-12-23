<template>
	<v-app-bar fixed app>
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
		<v-spacer />
		<v-btn depressed color="primary"> Login </v-btn>
	</v-app-bar>
</template>

<script>
export default {
	name: 'HeaderMenu',
};
</script>
