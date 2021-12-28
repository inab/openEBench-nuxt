<template>
	<v-content tag="footer" class="footer primary white--text">
		<v-row>
			<v-col class="pa-4" md="3" cols="12" align="center">
				<v-img :src="logo" alt="logo" max-width="150" contain />
				<p class="body-2">&copy;&nbsp; BSC-CNS 2021</p>
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
								{{ footer.title }}
							</h6>
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<ul>
								<li v-for="(item, index) in footer.description" :key="index">
									<nuxt-link :to="footer.link[index]">
										{{ item }}
									</nuxt-link>
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
							{{ footer.title }}
						</h6>
						<ul>
							<li v-for="(item, index) in footer.description" :key="index">
								<nuxt-link dark class="white--text" :to="footer.link[index]">
									{{ item }}
								</nuxt-link>
							</li>
						</ul>
					</v-col>
				</v-row>
			</v-col>
			<v-col md="3" cols="12" class="pa-4">
				<div class="socmed">
					<v-btn text icon dark class="button">
						<v-icon>mdi-facebook</v-icon>
					</v-btn>
					<v-btn text icon dark class="button">
						<v-icon>mdi-twitter</v-icon>
					</v-btn>
					<v-btn text icon dark class="button">
						<v-icon>mdi-instagram</v-icon>
					</v-btn>
					<v-btn text icon dark class="button">
						<v-icon>mdi-linkedin</v-icon>
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
						<v-img :src="euFlag" alt="logo" max-width="50" contain />
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-content>
</template>

<script>
import logo from '~/static/images/opeb_logo_white_minimal.png';
import euFlag from '~/static/images/eu.svg';
export default {
	data: () => ({
		logo,
		euFlag,
		lang: 'en',
		footers: [
			{
				title: 'Company',
				description: ['Team', 'History', 'Contact us', 'Locations'],
				link: ['#team', '#history', '#contact-us', '#locations'],
			},
			{
				title: 'Resources',
				description: [
					'Resource',
					'Resource name',
					'Another resource',
					'Final resource',
				],
				link: [
					'#resource',
					'#resource-name',
					'#another-resource',
					'#final-resource',
				],
			},
			{
				title: 'Legal',
				description: ['Privacy policy', 'Terms of use'],
				link: ['#privacy-policy', '#terms-of-use'],
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
