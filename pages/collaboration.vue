<template>
	<v-container>
		<h1 class="text--h3">OpenEBench Collaboration</h1>
		<br />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat.
		</p>
		<br />

		<!-- Cards for collaborators -->
		<v-row>
			<v-col
				v-for="(collaborator, index) in collaborators"
				:key="index"
				cols="12"
				sm="6"
				md="4"
				>
				<!-- Collaborators Card -->
				<collaborators-card
				:title="collaborator.title"
				:href="collaborator.href"
				:src="collaborator.src"/>
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
					src: 'https://eucanimage.eu/wp-content/uploads/2020/12/eucanimage-logo.svg',
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
			]
		};
	},
	beforeMount() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
