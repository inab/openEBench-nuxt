<template>
	<v-container>
		<h1 class="text--h3">Administration</h1>
		<p>LoggedIn: {{ $store.state.auth.loggedIn }}</p>
		<pre>{{ $store.state.auth.user }}</pre>
	</v-container>
</template>

<script>
export default {
	name: 'AdministrationPage',
	middleware: 'auth',
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Administration',
					disabled: true,
				},
			],
		};
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
