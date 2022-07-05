<template>
	<div>
		<v-navigation-drawer
			v-if="$vuetify.breakpoint.smAndDown"
			v-model="openNavMobile"
			fixed
			app
		>
			<v-list>
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
				<v-list-item
					v-for="(item, index) in subMenuEntries"
					:key="`sub` + index"
					:to="item.to"
					:href="item.href"
					:target="item.external ? '_blank' : ''"
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
					<v-icon v-if="item.external" right small>mdi-open-in-new</v-icon>
				</v-list-item>
				<v-list-item :href="vreHref" target="_blank">
					<v-list-item-title>Benchmark your Tool</v-list-item-title>
					<v-icon right small>mdi-open-in-new</v-icon>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar fixed app>
			<v-btn
				v-if="$vuetify.breakpoint.smAndDown"
				icon
				data-testid="btn-toggle-menu"
				aria-label="Toggle Menu"
				@click.stop="handleToggleOpen"
			>
				<v-icon>mdi-menu</v-icon>
			</v-btn>
			<nuxt-link to="/" aria-label="Home">
				<v-img
					class="mx-2"
					:src="opebLogo"
					max-height="80"
					max-width="80"
					contain
				/>
			</nuxt-link>
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
			<v-menu v-if="$vuetify.breakpoint.mdAndUp" left offset-y>
				<template #activator="{ on, attrs }">
					<v-btn v-bind="attrs" text v-on="on">
						<v-icon>mdi-chevron-down</v-icon>
						More
					</v-btn>
				</template>
				<v-list>
					<v-list-item
						v-for="(item, index) in subMenuEntries"
						:key="`sub` + index"
						:to="item.to"
						:href="item.href"
						:target="item.external ? '_blank' : ''"
					>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
						<v-icon v-if="item.external" right small>mdi-open-in-new</v-icon>
					</v-list-item>
					<v-list-item
						v-if="$vuetify.breakpoint.mdAndDown"
						:href="vreHref"
						target="_blank"
					>
						<v-list-item-title>Benchmark your Tool</v-list-item-title>
						<v-icon right small>mdi-open-in-new</v-icon>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-spacer />
			<v-btn
				v-if="$vuetify.breakpoint.lgAndUp"
				:href="vreHref"
				target="_blank"
				depressed
				outlined
				color="primary"
			>
				<v-icon left>mdi-open-in-new</v-icon> Benchmark your Tool
			</v-btn>
			<v-btn
				v-if="!$store.state.auth.loggedIn"
				color="primary"
				depressed
				class="ml-2"
				data-testid="btn-login"
				@click="LoginHandler"
				><v-icon left>mdi-login</v-icon> Login</v-btn
			>
			<v-btn
				v-if="$store.state.auth.loggedIn"
				color="secondary"
				depressed
				outlined
				class="ml-2"
				data-testid="btn-logout"
				@click="LogoutHandler"
				><v-icon left>mdi-logout</v-icon>Logout</v-btn
			>
			<!-- <v-btn v-if="$vuetify.breakpoint.mdAndUp" depressed color="ml-3 primary">
				<v-icon left>mdi-login-variant</v-icon> Login
			</v-btn> -->
		</v-app-bar>
		<cookie-law theme="dark-lime">
			<div slot="message">
				OpenEBench uses 🍪 to ensure you get the best experience on our website.
			</div>
		</cookie-law>
	</div>
</template>

<script>
import CookieLaw from 'vue-cookie-law';
import menuEntries from './menuEntries';
import subMenuEntries from './subMenuEntries';
import opebLogo from '~/static/images/opeb_logo.gif';

export default {
	name: 'HeaderMenu',
	components: { CookieLaw },
	props: {
		vreHref: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			openNavMobile: null,
			fixed: false,
			menuEntries,
			subMenuEntries,
			opebLogo,
		};
	},
	methods: {
		handleToggleOpen() {
			this.openNavMobile = !this.openNavMobile;
		},
		LoginHandler() {
			this.$auth.loginWith('keycloak');
		},
		LogoutHandler() {
			this.$auth.logout();
		},
	},
};
</script>
