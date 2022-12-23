<template>
	<v-main tag="footer" class="footer primary white--text">
		<v-row>
			<v-col class="pa-4" md="3" cols="12" align="center">
				<v-img :src="logo" alt="logo" max-width="150" contain />
				<p class="body-2">&copy;&nbsp; BSC-CNS 2022</p>
			</v-col>
			<v-col class="pa-4" md="6" cols="12">
				<v-expansion-panels v-if="isMobile">
					<v-expansion-panel
						v-for="(footer, index) in footers"
						:key="index"
						class="accordion-content"
					>
						<v-expansion-panel-header>
							<h6 class="title mb-4">
								{{ footer.headline }}
							</h6>
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<ul>
								<li v-for="(link, n) in footer.links" :key="n">
									<nuxt-link v-if="link.to" :to="link.to">
										{{ link.title }}
									</nuxt-link>
									<a v-if="link.href" :href="link.href" target="_blank">
										{{ link.title }}
									</a>
									<v-icon v-if="link.href" small right>mdi-open-in-new</v-icon>
								</li>
							</ul>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
				<v-row v-if="isDesktop" justify="space-around">
					<v-col
						v-for="(footer, index) in footers"
						:key="index"
						class="pa-4 site-map-item"
					>
						<h6 class="title mb-4">
							{{ footer.headline }}
						</h6>
						<ul>
							<li v-for="(link, m) in footer.links" :key="m">
								<nuxt-link
									v-if="link.to"
									dark
									class="white--text"
									:to="link.to"
								>
									{{ link.title }}
								</nuxt-link>
								<a
									v-if="link.href"
									:href="link.href"
									target="_blank"
									dark
									class="white--text"
								>
									{{ link.title }}
								</a>
								<v-icon v-if="link.href" small right dark
									>mdi-open-in-new</v-icon
								>
							</li>
						</ul>
					</v-col>
				</v-row>
			</v-col>
			<v-col md="3" cols="12" class="pa-4">
				<div>
					<v-btn
						text
						icon
						dark
						class="button"
						href="mailto:openebench-support@bsc.es"
						aria-label="Mail link for OpenEBench Support"
					>
						<v-icon>mdi-email-outline</v-icon>
					</v-btn>
					<v-btn
						text
						icon
						dark
						class="button"
						href="https://twitter.com/openebench"
						target="_blank"
						aria-label="Link to Twitter Profile of OpenEBench"
					>
						<v-icon>mdi-twitter</v-icon>
					</v-btn>
				</div>
				<v-row no-gutters class="mt-5">
					<v-col cols="9" align="left">
						<p class="text-sm-body-2">
							This project receives funding from the @EU_H2020 Research &
							Innovation programme.
						</p>
					</v-col>
					<v-col cols="3" align="center">
						<v-img :src="euFlag" alt="logo" max-width="70" contain />
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-main>
</template>

<script>
import logo from '~/static/images/opeb_logo_white_minimal.png';
import euFlag from '~/static/images/eu.svg';
import menuEntries from '~/components/Header/menuEntries';
import subMenuEntries from '~/components/Header/subMenuEntries';

export default {
	data: () => ({
		logo,
		euFlag,
		lang: 'en',
		footers: [
			{
				headline: 'OpenEBench',
				links: menuEntries,
			},
			{
				headline: 'Project',
				links: subMenuEntries,
			},
			{
				headline: 'Legal',
				links: [
					{ title: 'Legal Notice', to: '/legal-notice' },
					{ title: 'Disclaimer', to: '/disclaimer' },
					{ title: 'Cookies Policy', to: '/cookies-policy' },
				],
			},
		],
	}),
	computed: {
		isMobile() {
			return this.$vuetify.breakpoint.smAndDown;
		},
		isDesktop() {
			return this.$vuetify.breakpoint.mdAndUp;
		},
	},
};
</script>

<style lang="scss">
.Cookie--dark-lime .Cookie__button {
	background: var(--v-info-base);
}
.Cookie--dark-lime .Cookie__button:hover {
	background: var(--v-info-lighten1);
}
</style>
