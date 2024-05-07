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
								<v-avatar size="185" class="avatar-wrapper">
									<img
										:src="member.image"
										alt="Team Member"
										:class="{ 'grayscale-image': !isMobile }"
									/>
								</v-avatar>
							</div>
						</div>
					</div>
					<v-card-title>{{ member.name }}</v-card-title>
					<v-card-subtitle class="subtitle-container">
						<div
							v-for="(institution, index) in member.institution"
							:key="index"
						>
							<span
								class="abbreviation"
								@mouseover="showTooltip = index"
								@mouseleave="showTooltip = null"
							>
								{{ institution }}
							</span>
							<span
								v-if="showTooltip === index"
								class="tooltip"
								:style="{ top: subtitleHeight + 'px' }"
								v-html="getFullForm(member.institution[index])"
							></span>
							<!-- Display comma if not the last item -->
							<span v-if="index < member.institution.length - 1">, </span>
						</div>
						<v-btn icon @click="toggleExpand(member)" class="arrow">
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
												<div class="word">{{ role.name }}</div>
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
								class="chip"
								v-if="member.orcid"
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
								class="chip"
								v-if="member.github"
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
						<div class="card-title-wrapper">
							<v-card-title class="card-title">{{ alumni.name }}</v-card-title>
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
			alumnis: [],
			isMobile: false,
		};
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		this.checkMobile();
		window.addEventListener('resize', this.checkMobile);
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
		getFullForm(abbreviation) {
			// Define your dictionary mapping abbreviations to full forms here
			const abbreviationDictionary = {
				UB: 'University of Barcelona',
				NYU: 'New York University',
				UCLA: 'University of California, Los Angeles',
				MIT: 'Massachusetts Institute of Technology',
				// Add more abbreviations and their full forms as needed
			};

			// Return the full form if abbreviation exists in the dictionary, otherwise return the abbreviation itself
			return abbreviationDictionary[abbreviation] || abbreviation;
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
	margin-left: auto; /* Push the button to the right */
}

.subtitle-container {
	display: flex;
	align-items: center; /* Align items vertically */
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
	filter: grayscale(100%); /* Apply grayscale filter */
	transition: filter 0.3s ease; /* Add transition for smooth effect */
}

.avatar-wrapper:hover .grayscale-image {
	filter: none; /* Remove grayscale filter on hover */
}

.centered-chips {
	display: flex;
	justify-content: center;
}

.text {
	opacity: 0.6;
}
</style>
