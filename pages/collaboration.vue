<template>
	<v-container>
		<h1 class="text--h3">OpenEBench Collaborations</h1>
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

		<!-- Funding Section -->
		<h2 class="text--h3 section-title-border">Fundings</h2>
		<v-row>
			<v-col
				v-for="(collaborator, index) in fundingCollaborators"
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
		<br />

		<!-- Collaborators Section -->
		<h2 class="text--h3 section-title-border">Collaborators</h2>
		<v-row>
			<v-col
				v-for="(collaborator, index) in otherCollaborators"
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
					type: 'funding',
				},
				{
					title: 'EuCanImage',
					href: 'https://eucanimage.eu/',
					src: require('~/static/collaboration/EUCANImage.png'),
					type: 'funding',
				},
				{
					title: 'DataTools4Heart',
					href: 'https://www.datatools4heart.eu/',
					src: 'https://www.datatools4heart.eu/wp-content/themes/datatools/img/og-dt4h.png',
					type: 'funding',
				},
				{
					title: 'DECIDER',
					href: 'https://www.deciderproject.eu/',
					src: require('~/static/collaboration/decider.jpg'),
					type: 'funding',
				},
				{
					title: 'PerMedCoE',
					href: 'https://permedcoe.eu/',
					src: 'https://permedcoe.eu/wp-content/uploads/2020/11/logo_1.png',
					type: 'funding',
				},
				{
					title: 'EOSC-EVERSE',
					href: 'https://everse.software/',
					src: 'https://everse.software/images/logos/EOSCEverse_PosColour.svg',
					type: 'funding',
				},
				{
					title: 'ELIXIR STEERS',
					href: 'https://elixir-europe.org/about-us/how-funded/eu-projects/steers',
					src: 'https://elixir-europe.org/sites/default/files/styles/left-large/public/images/elixir-steers-logo.png',
					type: 'funding',
				},
				{
					title: 'Fujitsu AMetaPred',
					href: 'https://dev-openebench.bsc.es/benchmarking/OEBC900?event=OEBE9000000000',
					src: require('~/static/collaboration/AMetaPred.png'),
					type: 'collaborator',
				},
				{
					title: 'BAIHA',
					href: 'https://bioinfo4women.bsc.es/research/',
					src: require('~/static/collaboration/baiha.png'),
					type: 'collaborator',
				},
			],
		};
	},
	computed: {
		sortedCollaborators() {
			return this.collaborators
				.slice()
				.sort((a, b) => a.title.localeCompare(b.title));
		},
		fundingCollaborators() {
			return this.sortedCollaborators.filter(
				(collaborator) => collaborator.type === 'funding'
			);
		},
		otherCollaborators() {
			return this.sortedCollaborators.filter(
				(collaborator) => collaborator.type === 'collaborator'
			);
		},
	},
	beforeMount() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>

<style lang="scss" scoped>
.section-title-border {
	border-bottom: 2px solid black;
	margin-bottom: 50px;
	padding-bottom: 3px;
	color: #0b579f;
	font-weight: 400;
	font-size: 1.5rem;
}
</style>
