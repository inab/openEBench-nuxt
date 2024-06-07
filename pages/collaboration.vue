<template>
	<v-container>
		<h1 class="text--h3">OpenEBench Collaboration</h1>
		<br />
		<p>
			Collaborations are at the heart of OpenEBench. OpenEBench has been
			designed as a space to foster collaborations within and across
			communities, taking ELIXIR as the overall framework. ELIXIR is the
			pan-European Research Infrastructure for managing research data and other
			digital assets in the Life Sciences domain.
		</p>
		<p>
			Collaborations are essential to ensure that OpenEBench is fit for its
			purpose and responds to users' current needs. It is also a mechanism to
			contribute towards the platform's sustainability. Participation in EU and
			nationally funded projects is one of the existing collaboration
			mechanisms. Participating in funded projects allows us to prioritise
			specific developments to strengthen, extend and add new features to the
			platform that a specific project will utilise. Notably, these developments
			are made available to everyone across OpenEBench, fostering a continuous
			innovation cycle.
		</p>
		<p>
			Beyond funded projects, OpenEBench also works with scientific communities
			willing to sustain their benchmarking efforts in the long run, as well as
			individuals interested in contributing to specific platform components.
		</p>
		<br />

		<!-- Cards for collaborators -->
		<v-row>
			<v-col
				v-for="(collaborator, index) in sortedCollaborators"
				:key="index"
				cols="12"
				sm="6"
				md="4"
			>
				<!-- Collaborators Card -->
				<collaborators-card
					:title="collaborator.title"
					:href="collaborator.href"
					:src="collaborator.src"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import CollaboratorsCard from '~/components/Cards/CollaboratorsCard';

export default {
	name: 'AboutPage',
	components: { CollaboratorsCard },
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
					text: 'About',
					disabled: true,
				},
				{
					text: 'Collaboration',
					disabled: true,
				},
			],
			collaborators: [
				{
					title: 'EUCAIM',
					href: 'https://cancerimage.eu/',
					src: require('~/static/collaboration/eucaim.png'),
				},
				{
					title: 'EuCanImage',
					href: 'https://eucanimage.eu/',
					src: require('~/static/collaboration/EUCANImage.png'),
				},
				{
					title: 'DataTools4Heart',
					href: 'https://www.datatools4heart.eu/',
					src: 'https://www.datatools4heart.eu/wp-content/themes/datatools/css/img/logo_color.svg',
				},
				{
					title: 'DECIDER',
					href: 'https://www.deciderproject.eu/',
					src: require('~/static/collaboration/decider.jpg'),
				},
				{
					title: 'PerMedCoE',
					href: 'https://permedcoe.eu/',
					src: 'https://permedcoe.eu/wp-content/uploads/2020/11/logo_1.png',
				},
				{
					title: 'EOSC-EVERSE',
					href: 'https://everse.software/',
					src: 'https://everse.software/images/logos/EOSCEverse_PosColour.svg',
				},
				{
					title: 'ELIXIR STEERS',
					href: 'https://elixir-europe.org/about-us/how-funded/eu-projects/steers',
					src: 'https://elixir-europe.org/sites/default/files/styles/left-large/public/images/elixir-steers-logo.png',
				},
				{
					title: 'Fujitsu AMetaPred',
					href: 'https://dev-openebench.bsc.es/benchmarking/OEBC900?event=OEBE9000000000',
					src: require('~/static/collaboration/AMetaPred.png'),
				},
				{
					title: 'BAIHA',
					href: 'https://bioinfo4women.bsc.es/research/',
					src: require('~/static/collaboration/baiha.png'),
				},
			],
		};
	},
	computed: {
		sortedCollaborators() {
			return this.collaborators.slice().sort((a, b) => {
				return a.title.localeCompare(b.title);
			});
		},
	},
	beforeMount() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
