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
				<v-card class="mx-auto my-4" max-width="350">
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

					<!-- Card content -->

					<!-- <v-card-title>{{ member.name }}</v-card-title>
					<v-card-subtitle class="subtitle-container">
						<span
							v-for="(institution, index) in member.institution"
							:key="index"
							>{{ institution
							}}<span v-if="index !== member.institution.length - 1"
								>,&nbsp;</span
							></span
						>
					</v-card-subtitle>
					<v-divider class="mx-4 mb-1"></v-divider>
					<v-card-text>
						{{ member.position_description }}
					</v-card-text> -->

					<v-card-title>{{ member.name }}</v-card-title>
					<v-card-subtitle class="subtitle-container">
						<span
							v-for="(institution, index) in member.institution"
							:key="index"
							>{{ institution
							}}<span v-if="index !== member.institution.length - 1"
								>,</span
							></span
						>

						<v-btn icon @click="toggleExpand(member)" class="arrow">
							<v-icon>{{
								member.show ? 'mdi-chevron-up' : 'mdi-chevron-down'
							}}</v-icon>
						</v-btn>
					</v-card-subtitle>
					<v-expand-transition>
						<div v-show="member.show">
							<v-divider></v-divider>

							<v-card-text>
								{{ member.position_description }}
							</v-card-text>
						</div>
					</v-expand-transition>

					<v-divider class="mx-4 mb-1"></v-divider>

					<div class="px-4 mb-2">
						<v-chip-group selected-class="bg-deep-purple-lighten-2">
							<v-chip target="_blank" :href="member.orcid">
								<img
									src="../static/images/teams/orcid.svg"
									alt="ORCID Logo"
									class="logo chip-with-logo"
								/>ORCID
							</v-chip>
							<v-chip target="_blank" :href="member.github">
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

						<!-- <v-avatar class="avatar-right avatar-wrapper" size="48">
							<img
								:src="alumni.image"
								alt="exmember"
								:class="{ 'grayscale-image': !isMobile }"
							/>
						</v-avatar> -->
					</div>

					<v-card-text>{{ alumni.position_description }}</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import teamData from '@/static/members.json';

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
			members: teamData.Members,
			alumnis: teamData.Alumni,
			isMobile: false,
		};
	},
	methods: {
		toggleExpand(member) {
			member.show = !member.show;
		},
		checkMobile() {
			this.isMobile = window.innerWidth <= 850;
		},
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		window.addEventListener('resize', this.checkMobile);
	},
	beforeDestroy() {
		// Remove event listener to prevent memory leaks
		window.removeEventListener('resize', this.checkMobile);
	},
};
</script>
<style scoped>
.logo {
	margin-right: 5px;
	width: 20px;
	height: 20px;
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

.chip-with-logo {
	margin-bottom: 2px;
}

.card-header {
	display: flex;
	align-items: center;
}

.avatar-right {
	margin-left: auto;
	margin-right: 16px;
}

.card-title-wrapper {
	margin-right: 16px;
}

.subtitle-container {
	display: flex;
	align-items: center; /* Align items vertically */
}

.arrow {
	margin-left: auto; /* Push the button to the right */
}
</style>
