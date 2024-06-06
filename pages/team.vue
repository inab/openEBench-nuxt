<template>
	<v-container>
		<h1 class="text--h3">The Team of OpenEBench</h1>

		<p>
			Here, you can get to know the current and
			<a href="#alumni">past members</a> of the team behind the design,
			development and operation of OpenEBench. OpenEBench is the ELIXIR Open
			Data platform supporting community-driven scientific benchmarking
			activities and the technical monitoring of research software in Life
			Sciences.
			<br class="mb-4" />
			The OpenEBench team is a committed group of professionals with different
			roles and complementary expertise who work together to maintain OpenEBench
			and add new functionality for a better user experience. The team is mainly
			affiliated with the
			<a href="https://bsc.es/" target="_blank"
				>Barcelona Supercomputing Center (BSC).<v-icon small right
					>mdi-open-in-new</v-icon
				></a
			>
			However, we are open to collaborations worldwide as OpenEBench follows the
			Open Science principles since its inception to facilitate working
			together.
			<br class="mb-4" />
			The overall objective is to automatise the interactions within the
			platform as much as possible so users can become an integral part of its
			operations by curating and updating existing information within it.
		</p>
		<br />

		<h2 class="text--h3 section-title-border">Leaders</h2>

		<v-row>
			<v-col
				v-for="(leader, index) in sortedByName(leaders)"
				:key="index"
				cols="12"
				sm="6"
				md="4"
			>
				<MemberCard
					:member="leader"
					:isMobile="isMobile"
					:institutionMapping="institutionMapping"
					:items="items"
				/>
			</v-col>
		</v-row>

		<!-- Team Mates -->
		<h2 class="section-title-border mt-2">Group Members</h2>
		<v-row>
			<v-col
				v-for="(teammate, index) in sortedByName(teammates)"
				:key="index"
				cols="12"
				sm="6"
				md="4"
			>
				<MemberCard
					:member="teammate"
					:isMobile="isMobile"
					:institutionMapping="institutionMapping"
					:items="items"
				/>
			</v-col>
		</v-row>
		<br />
		<br id="alumni" />
		<br />
		<v-divider></v-divider>
		<h2 class="mt-2">The OpenEBench Alumni network</h2>
		<p>
			Different professionals have contributed to the development of OpenEBench
			since its inception in 2017. In this section, you can find past members
			and their main roles within the team. We are grateful for their
			contributions to the platform and interactions with different communities.
		</p>
		<br />
		<v-row>
			<v-col
				v-for="(alumni, index) in sortedByName(alumnis)"
				:key="index"
				cols="12"
				sm="6"
				md="4"
			>
				<AlumniCard
					:alumni="alumni"
					:isMobile="isMobile"
					:institutionMapping="institutionMapping"
					:items="items"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import membersData from '@/static/members/members.json';
import MemberCard from '@/components/Cards/MemberCard.vue';
import AlumniCard from '@/components/Cards/AlumniCard.vue';

export default {
	name: 'TeamPage',
	components: {
		MemberCard,
		AlumniCard,
	},
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
					text: 'Team',
					disabled: true,
				},
			],
			items: [
				{
					color: '#ffcc99',
					icon: require('~/static/members/icons/tl.png'),
					word: 'Tooling (command line)',
					hover: false,
				},
				{
					color: '#ccffcc',
					icon: require('~/static/members/icons/ce.png'),
					word: 'Community Engagement',
					hover: false,
				},
				{
					color: '#ff6666',
					icon: require('~/static/members/icons/ld.png'),
					word: 'Leadership',
					hover: false,
				},
				{
					color: '#ff99cc',
					icon: require('~/static/members/icons/so.png'),
					word: 'Software Observatory',
					hover: false,
				},
				{
					color: '#ccccff',
					icon: require('~/static/members/icons/sb.png'),
					word: 'Scientific Benchmarking',
					hover: false,
				},
				{
					color: '#ffcccc',
					icon: require('~/static/members/icons/cb.png'),
					word: 'Compute Back-end',
					hover: false,
				},
				{
					color: '#99ccff',
					icon: require('~/static/members/icons/bo.png'),
					word: 'Back-office',
					hover: false,
				},
				{
					color: '#ffffcc',
					icon: require('~/static/members/icons/di.png'),
					word: 'Data Interfaces',
					hover: false,
				},
				{
					color: '#cc99ff',
					icon: require('~/static/members/icons/dm.png'),
					word: 'Data Modelization',
					hover: false,
				},
				{
					color: '#ccff99',
					icon: require('~/static/members/icons/dv.png'),
					word: 'Data Visualization',
					hover: false,
				},
				{
					color: '#ffccff',
					icon: require('~/static/members/icons/fd.png'),
					word: 'Web Front-end',
					hover: false,
				},
				{
					color: '#ffcc66',
					icon: require('~/static/members/icons/st.png'),
					word: 'Security',
					hover: false,
				},
				{
					color: '#ccf2ff',
					icon: require('~/static/members/icons/tm.png'),
					word: 'Technical Monitoring',
					hover: false,
				},
			],
			members: [],
			institutionMapping: {
				'BSC-CNS': {
					name: 'Barcelona Supercomputing Center',
					link: 'https://www.bsc.es/',
				},
				UB: {
					name: 'University of Barcelona',
					link: 'https://www.ub.edu/',
				},
				'INB/ELIXIR-ES': {
					name: 'Spanish National Bioinformatics Institute',
					link: 'https://www.inb-elixir.es/',
				},
				ICREA: {
					name: 'Catalan Institution for Research and Advanced Studies',
					link: 'https://www.icrea.cat/',
				},
				// Add more mappings as needed
			},
			alumnis: [],
			isMobile: false,
			show: false,
		};
	},
	beforeMount() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
	mounted() {
		// Initialize members data and store original institution names
		this.members = membersData.Members.map((member) => ({
			...member,
			roles: member.roles.map((role) => ({ name: role, hover: false })),
		}));
		this.alumnis = membersData.Alumni.map((alumni) => ({
			...alumni,
			roles: alumni.roles.map((role) => ({ name: role, hover: false })),
		}));
		// Initial check for mobile
		this.checkMobile();
		// Add event listener for window resize
		window.addEventListener('resize', this.checkMobile);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.checkMobile);
	},
	computed: {
		leaders() {
			return this.members.filter((member) =>
				member.roles.some((role) => role.name === 'Leadership')
			);
		},
		teammates() {
			return this.members.filter(
				(member) => !member.roles.some((role) => role.name === 'Leadership')
			);
		},
	},
	methods: {
		checkMobile() {
			this.isMobile = window.innerWidth <= 850;
		},
		sortedByName(persons) {
			return [...persons].sort((a, b) => a.name.localeCompare(b.name));
		},
	},
};
</script>

<style scoped>
.section-title-border {
	border-bottom: 2px solid black;
	margin-bottom: 50px;
	padding-bottom: 3px;
	color: #0b579f;
	font-weight: 400;
	font-size: 1.5rem;
}
</style>
