<template>
	<v-main tag="footer" class="footer primary white--text">
		<v-row>
			<v-col class="pa-4" md="3" cols="12" align="center">
				<v-img :src="logo" alt="logo" max-width="150" contain />
				<p class="body-2">&copy;&nbsp; BSC-CNS {{ currentYear }}</p>
			</v-col>
			<v-col class="pa-4" md="6" cols="12">
				<v-expansion-panels v-if="isMobile">
					<v-expansion-panel
						v-for="(footer, index) in footers"
						:key="index"
						class="accordion-content"
					>
						<v-expansion-panel-header>
							<h6 class="title mb-4">{{ footer.headline }}</h6>
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<ul class="no-bullets aligned-list">
								<li
									v-for="(link, n) in footer.links"
									:key="n"
									class="list-item"
								>
									<nuxt-link
										v-if="link.to"
										:to="link.to"
										class="no-underline link-hover"
										>{{ link.title }}</nuxt-link
									>
									<a
										v-if="link.href"
										:href="link.href"
										target="_blank"
										class="no-underline link-hover"
										>{{ link.title }}</a
									>
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
						<h6 class="title mb-4">{{ footer.headline }}</h6>
						<ul class="no-bullets aligned-list">
							<li v-for="(link, m) in footer.links" :key="m" class="list-item">
								<nuxt-link
									v-if="link.to"
									dark
									class="white--text no-underline link-hover"
									:to="link.to"
									>{{ link.title }}</nuxt-link
								>
								<a
									v-if="link.href"
									:href="link.href"
									target="_blank"
									dark
									class="white--text no-underline link-hover"
									>{{ link.title }}</a
								>
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
						href="https://x.com/openebench"
						target="_blank"
						aria-label="Link to X Profile of OpenEBench"
					>
						<v-img
							src="/icons/twitter-x-64.png"
							alt="X icon"
							max-width="18"
							max-height="18"
						></v-img>
					</v-btn>
				</div>
				<v-row no-gutters class="mt-5">
					<v-col cols="9" align="left">
						<p class="text-sm-body-2">
							OpenEBench receives funding from different EC funding Research &
							Innovation programmes.<br />
							<a
								href="/collaboration"
								target="_blank"
								class="link-hover"
								aria-label="Learn more about collaboration"
							>
								Learn more
								<v-icon dark right small>mdi-open-in-new</v-icon>
							</a>
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
import footerEntries from '~/components/footerEntries';
import subMenuEntriesObservatory from '~/components/Header/subMenuEntriesObservatory';
import subMenuEntriesAbout from '~/components/Header/subMenuEntriesAbout';

export default {
	data: () => ({
		logo,
		euFlag,
		lang: 'en',
		footers: [
			{ headline: 'OpenEBench', links: footerEntries },
			{ headline: 'Observatory', links: subMenuEntriesObservatory },
			{ headline: 'About', links: subMenuEntriesAbout },
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
		currentYear() {
			return new Date().getFullYear();
		},
	},
};
</script>

<style lang="scss">
.primary {
	background-color: #1976d2; // Example background color
	color: white;
}

.no-bullets {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.no-underline {
	text-decoration: none;
}

.link-hover {
	color: white !important;
	text-decoration: none;
	transition: text-decoration 0.3s ease;
}

.link-hover:hover {
	text-decoration: underline;
}

.link-hover:hover {
	text-decoration: underline;
}

.aligned-list {
	padding-left: 0;
}

.list-item {
	margin-left: 0;
	padding-left: 0;
	display: flex;
	align-items: center;
}

.site-map-item .title {
	margin-left: 0;
	padding-left: 0;
}

.site-map-item ul {
	margin-top: 0;
	padding-left: 0;
}

@media (max-width: 1024px) and (orientation: portrait),
	(max-width: 1366px) and (orientation: landscape) {
	.link-hover {
		color: black !important;
	}
}
</style>
