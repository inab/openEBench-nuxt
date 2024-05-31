<template>
	<v-container>
		<h1 class="text--h3">The Team of OpenEBench</h1>
		<br />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat.
		</p>
		<br />

		<!-- Cards for team members -->
		<v-row>
			<v-col
				v-for="(member, index) in members"
				:key="index"
				cols="12"
				sm="6"
				md="4"
			>
				<v-card class="mx-auto my-4" max-width="374">
					<!-- Centered container for circles -->
					<div class="circle-container">
						<!-- Outer circle -->
						<div class="outer-circle" style="margin-top: 10px">
							<!-- Inner circle with white background -->
							<div class="inner-circle">
								<!-- Circle image of team member -->
								<v-tooltip top>
									<template #activator="{ on }">
										<!-- Use v-avatar to display the member's image -->
										<v-avatar size="185" class="avatar-wrapper">
											<!-- Conditional rendering of image based on URL type -->
											<img
												v-if="member.image.startsWith('http')"
												:src="member.image"
												:alt="getMemberAltText(member)"
												:class="{ 'grayscale-image': !isMobile }"
												v-on="on"
											/>
											<img
												v-else
												:src="require('@/static/members/images' + member.image)"
												:alt="getMemberAltText(member)"
												:class="{
													'grayscale-image': !isMobile,
												}"
												v-on="on"
											/>
										</v-avatar>
									</template>
									<!-- Tooltip content to display member's name -->
									<span>{{ member.alias }}</span>
								</v-tooltip>
							</div>
						</div>
					</div>
					<v-card-title>{{ member.name }}</v-card-title>
					<v-card-subtitle class="subtitle-container">
						<div v-for="(institution, idx) in member.institution" :key="idx">
							<v-tooltip bottom>
								<template #activator="{ on }">
									<a
										href="#"
										class="institution-link"
										v-on="on"
										@click.prevent="navigateToLink(institution.trim())"
										>{{ institution.trim() }}</a
									>
									<!-- Display comma if not the last item -->
									<span v-if="idx < member.institution.length - 1"
										>,&nbsp;</span
									>
								</template>
								<span>{{ getInstitutionFullName(institution).name }}</span>
							</v-tooltip>
						</div>
						<v-btn icon class="arrow" @click="toggleExpand(member)">
							<v-icon>{{
								member.show ? 'mdi-chevron-up' : 'mdi-chevron-down'
							}}</v-icon>
						</v-btn>
					</v-card-subtitle>

					<v-expand-transition>
						<div v-show="member.show">
							<v-divider class="mx-4"></v-divider>
							<v-card-text
								><p class="text">Takes part on:</p>

								<v-layout row wrap class="icon-row mt-2" justify-center>
									<v-flex v-for="(role, idx) in member.roles" :key="idx" xs4>
										<v-card
											v-if="!isMobile"
											class="cell"
											:style="{ backgroundColor: getItemColor(role.name) }"
											@mouseenter="role.hover = true"
											@mouseleave="role.hover = false"
										>
											<div class="content" :class="{ hovered: role.hover }">
												<div class="icon-container">
													<div
														:style="{
															backgroundImage: getItemIcon(role.name),
														}"
														class="icon"
													></div>
												</div>
												<div class="word">{{ formatRoleName(role.name) }}</div>
											</div>
										</v-card>
										<v-card
											v-if="isMobile"
											class="cell"
											:style="{ backgroundColor: getItemColor(role.name) }"
											@click="toggleRole(role)"
										>
											<div class="content" :class="{ hovered: role.hover }">
												<div class="icon-container">
													<div
														:style="{ backgroundImage: getItemIcon(role.name) }"
														class="icon"
													></div>
												</div>
												<div class="word">{{ formatRoleName(role.name) }}</div>
											</div>
										</v-card>
									</v-flex>
								</v-layout>
							</v-card-text>
						</div>
					</v-expand-transition>
					<v-divider class="mx-4 mb-1"></v-divider>

					<div class="px-4 mb-2 centered-chips">
						<v-chip-group>
							<v-chip
								v-if="member.orcid"
								class="chip"
								target="_blank"
								:href="member.orcid"
							>
								<img
									src="../static/images/teams/orcid.svg"
									alt="ORCID Logo"
									class="logo chip-with-logo"
								/>ORCID
							</v-chip>
							<v-chip
								v-if="member.github"
								class="chip"
								target="_blank"
								:href="member.github"
							>
								<img
									src="../static/images/teams/github-logo.png"
									alt="GitHub Logo"
									class="logo chip-with-logo"
								/>GITHUB
							</v-chip>
						</v-chip-group>
					</div>
				</v-card>
			</v-col>
		</v-row>
		<br />
		<br />
		<br />
		<v-divider></v-divider>
		<h2 class="mt-2">ALUMNI</h2>
		<br />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat.
		</p>
		<br />
		<v-row>
			<v-col
				v-for="(alumni, index) in alumnis"
				:key="index"
				cols="12"
				sm="6"
				md="4"
			>
				<v-card class="mx-auto" max-width="400">
					<div class="card-header">
						<div class="card-header-content">
							<div class="card-title-wrapper">
								<v-card-title class="card-title">{{
									alumni.name
								}}</v-card-title>
							</div>

							<!-- Use a v-badge to display the year -->
							<v-badge color="#0b579f" :content="alumni.year" inline></v-badge>
						</div>
					</div>

					<v-card-text>{{ alumni.roles }}</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import membersData from '@/static/members/members.json';

export default {
	name: 'TeamPage',
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
					word: 'Compute Backend',
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
		this.alumnis = membersData.Alumni;
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.checkMobile);
	},
	methods: {
		getInstitutionFullName(acronym) {
			const institution = this.institutionMapping[acronym];
			if (institution) {
				return { name: institution.name, link: institution.link };
			}
			return { name: acronym, link: '#' };
		},
		navigateToLink(institution) {
			const institutionInfo = this.getInstitutionFullName(institution);
			if (institutionInfo.link) {
				window.open(institutionInfo.link, '_blank');
			}
		},
		getMemberAltText(member) {
			return `Photo of ${member.name}`;
		},
		toggleExpand(member) {
			member.show = !member.show;
		},
		toggleRole(role) {
			role.hover = !role.hover;
		},
		checkMobile() {
			this.isMobile = window.innerWidth <= 850;
		},
		getItemColor(role) {
			const item = this.items.find((item) => item.word === role);
			return item ? item.color : '#ffffff';
		},
		getItemIcon(role) {
			const item = this.items.find((item) => item.word === role);
			return item ? `url(${item.icon})` : '';
		},
		formatRoleName(name) {
			// Check if the role name contains parentheses
			const index = name.indexOf('(');
			if (index !== -1) {
				const firstPart = name.substring(0, index).trim();
				const secondPart = name.substring(index).trim();
				return `${firstPart}\n${secondPart}`;
			}
			return name;
		},
	},
};
</script>

<style scoped>
.cell {
	padding: 5px;
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 40px;
}

.content {
	position: relative;
	width: 100%;
	text-align: center;
}

.icon-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}

.icon {
	width: 30px;
	height: 30px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
}

.word {
	font-size: 12px;
	white-space: pre-wrap;
	display: none;
	line-height: 1;
}

.hovered .icon {
	display: none;
}

.hovered .word {
	display: block;
	cursor: default;
}

.icon-row {
	margin: 0 -5px;
}

.chip-with-logo {
	margin-bottom: 2px;
}

.logo {
	margin-right: 5px;
	width: 20px;
	height: 20px;
}

.arrow {
	margin-left: auto;
}

.subtitle-container {
	display: flex;
	align-items: center;
}

.circle-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.outer-circle {
	width: 240px;
	height: 240px;
	border-radius: 50%;
	border: 10px solid #0b579f;
	display: flex;
	justify-content: center;
	align-items: center;
}

.inner-circle {
	width: 200px;
	height: 200px;
	border-radius: 50%;
	border: 10px solid white;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
}

.grayscale-image {
	filter: grayscale(100%);
	transition: filter 0.3s ease;
}

.avatar-wrapper:hover .grayscale-image {
	filter: none;
}

.centered-chips {
	display: flex;
	justify-content: center;
}

.text {
	opacity: 0.6;
}

.institution-link {
	cursor: pointer;
	text-decoration: none;
	color: inherit;
	outline: none;
	white-space: nowrap;
}

.institution-link:hover {
	text-decoration: underline;
	color: #0b579f;
}

.card-header {
	display: grid;
	grid-template-columns: 1fr auto; /* Title area and badge area */
	grid-gap: 10px; /* Spacing between title and badge */
}

.card-header-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.card-title-wrapper {
	flex: 1; /* Allow title to take remaining space */
}

.card-title {
	margin: 0; /* Remove default margin */
}
</style>
