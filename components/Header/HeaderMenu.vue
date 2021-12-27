<template>
	<div>
		<v-navigation-drawer
			v-if="$vuetify.breakpoint.smAndDown"
			v-model="openNavMobile"
			fixed
			app
		>
			<v-list>
				<v-list-item to="/" exact>
					<v-list-item-content>
						<v-list-item-title>Login</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					v-for="(item, i) in menuEntries"
					:key="i"
					:to="item.to"
					router
					exact
				>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar fixed app>
			<v-btn
				v-if="$vuetify.breakpoint.smAndDown"
				icon
				@click.stop="handleToggleOpen"
			>
				<v-icon>mdi-menu</v-icon>
			</v-btn>
			<a href="/">
				<v-img
					class="mx-2"
					:src="require('~/static/images/opeb_logo.gif')"
					max-height="80"
					max-width="80"
					contain
				/>
			</a>
			<div v-if="$vuetify.breakpoint.mdAndUp" class="ml-16">
				<v-btn
					v-for="(item, index) in menuEntries"
					:key="index"
					:to="item.to"
					text
				>
					{{ item.title }}
				</v-btn>
			</div>
			<v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
			<v-btn
				v-if="$vuetify.breakpoint.mdAndUp"
				:href="vreHref"
				target="_blank"
				depressed
				outlined
				color="primary"
			>
				<v-icon left>mdi-open-in-new</v-icon> Benchmark your Tool
			</v-btn>
			<!-- <v-btn v-if="$vuetify.breakpoint.mdAndUp" depressed color="ml-3 primary">
				<v-icon left>mdi-login-variant</v-icon> Login
			</v-btn> -->
		</v-app-bar>
	</div>
</template>

<script>
import menuEntries from './menuEntries';

export default {
	name: 'HeaderMenu',
	data() {
		return {
			openNavMobile: null,
			fixed: false,
			menuEntries,
			vreHref: 'http://' + window.location.hostname + '/vre/home',
		};
	},
	methods: {
		handleToggleOpen() {
			this.openNavMobile = !this.openNavMobile;
		},
	},
};
</script>
