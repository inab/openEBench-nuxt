<template>
	<v-card
		class="mx-auto my-4 main-card"
		:max-width="374"
		@mouseover="toggleHovered(true)"
		@mouseleave="toggleHovered(false)"
		@click="handleClickOutside"
	>
		<div class="chips-container" :class="{ 'show-chips': isHovered }">
			<v-chip
				v-if="member.orcid"
				class="chip"
				target="_blank"
				:href="member.orcid"
			>
				<img
					src="@/static/images/teams/orcid.svg"
					alt="ORCID Logo"
					class="logo chip-with-logo"
				/>
			</v-chip>
			<v-chip
				v-if="member.github"
				class="chip"
				target="_blank"
				:href="member.github"
			>
				<img
					src="@/static/images/teams/github-logo.png"
					alt="GitHub Logo"
					class="logo chip-with-logo"
				/>
			</v-chip>
		</div>

		<div class="circle-container">
			<div class="outer-circle">
				<div class="inner-circle">
					<v-avatar size="185" class="avatar-wrapper">
						<img
							:src="require(`@/static/members/images${member.image}`)"
							:alt="getMemberAltText(member)"
							:class="{ 'grayscale-image': !isMobile }"
							style="object-fit: cover; height: 100%; width: 100%"
						/>
					</v-avatar>
				</div>
			</div>
		</div>

		<v-card-title class="name">{{ member.name }}</v-card-title>
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
						<span v-if="idx < member.institution.length - 1">,&nbsp;</span>
					</template>
					<span>{{ getInstitutionFullName(institution).name }}</span>
				</v-tooltip>
			</div>
		</v-card-subtitle>

		<transition name="slide-right">
			<div
				v-if="isHovered || isRolesExpanded"
				class="roles-toggle"
				@click.stop="toggleRoles"
			>
				<span class="roles-text">Roles</span>
				<v-icon class="arrow-icon">{{
					isRolesExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
				}}</v-icon>
			</div>
		</transition>

		<transition name="slide-up">
			<div v-if="isRolesExpanded" class="roles-container">
				<h3 class="roles-title">Takes part on:</h3>
				<ul class="roles-list">
					<li
						v-for="(role, index) in sortedRoles"
						:key="index"
						class="role-item"
					>
						{{ role }}
					</li>
				</ul>
				<div class="close-button" @click.stop="closeRoles">
					<v-icon>mdi-close</v-icon>
				</div>
			</div>
		</transition>
	</v-card>
</template>

<script>
import sharedMethodsMixin from '@/mixins/sharedMethodsMixin.js';

export default {
	name: 'MemberCard',
	mixins: [sharedMethodsMixin],
	props: {
		member: {
			type: Object,
			required: true,
		},
		isMobile: {
			type: Boolean,
			default: false,
		},
		institutionMapping: { type: Object, required: true },
	},
	data() {
		return {
			isHovered: false,
			isRolesExpanded: false,
		};
	},
	computed: {
		sortedRoles() {
			return this.member.roles.slice().sort();
		},
	},
	methods: {
		getMemberAltText(member) {
			return `Photo of ${member.name}`;
		},
		navigateToLink(institution) {
			const institutionInfo = this.getInstitutionFullName(institution);
			if (institutionInfo.link) {
				window.open(institutionInfo.link, '_blank');
			}
		},
		getInstitutionFullName(acronym) {
			const institution = this.institutionMapping[acronym];
			if (institution) {
				return { name: institution.name, link: institution.link };
			}
			return { name: acronym, link: '#' };
		},
		toggleHovered(value) {
			this.isHovered = value;
		},
		toggleRoles() {
			this.isRolesExpanded = !this.isRolesExpanded;
		},
		closeRoles() {
			this.isRolesExpanded = false;
		},
		handleClickOutside() {
			if (this.isRolesExpanded) {
				this.closeRoles();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../assets/sharedStyles.css';

/* Chips styles */
.chip-with-logo {
	margin-bottom: 2px;
}

.chip:hover {
	background-color: darkgray;
}

.logo {
	width: 20px;
	height: 20px;
}

/* Chips container transition */
.chips-container {
	position: absolute;
	left: 10px;
	display: flex;
	flex-direction: column;
	gap: 5px;
	overflow: hidden;
	transition: top 0.3s ease, opacity 0.3s ease;
	top: -15%; /* Initially hidden off-screen */
	opacity: 0;
}

.show-chips {
	top: 10px; /* Slide in when hovered */
	opacity: 1;
}

/* Circle container styles */
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
	margin-top: 10px;
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

.name {
	margin-top: 30px;
}

/* Institution link styles */
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

/* Main card styles */
.main-card {
	cursor: default; /* Normal cursor for the entire card */
}

.main-card:hover {
	box-shadow: 0 4px 20px rgba(0, 0, 0, 20%);
	transition: box-shadow 0.3s ease-in-out;
}

.main-card:hover .grayscale-image {
	filter: none;
}

/* Roles toggle styles */
.roles-toggle {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 80px;
	height: 80px;
	background-color: #0b579f;
	color: white;
	border-top-left-radius: 80px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	transition: transform 0.3s ease, right 0.3s ease; /* Added right transition */
	padding: 10px;
}

.roles-toggle:hover {
	background-color: #083864;
}

.roles-text {
	font-size: 12px;
	margin-right: -2px;
	margin-top: 25px;
	margin-left: 10px;
}

.arrow-icon {
	color: white;
	font-size: 14px; /* Adjusted font size for thinner arrow */
	margin-left: 2px; /* Adjusted margin for better alignment */
	margin-top: 25px;
}

/* Roles container styles */
.roles-container {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #0b579f;
	color: white;
	padding: 20px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	overflow-y: auto;
	max-height: 50%; /* Expand to half the card */
}

.roles-title {
	margin-bottom: 10px;
}

.roles-list {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.role-item {
	margin-bottom: 8px;
}

.close-button {
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
}

/* Transition styles */
.slide-up-enter-active,
.slide-up-leave-active {
	transition: transform 0.2s ease, opacity 0.3s ease;
}

.slide-up-enter,
.slide-up-leave-to {
	transform: translateY(100%);
	opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
	transition: right 0.2s ease;
}

.slide-right-enter,
.slide-right-leave-to {
	right: -100px;
}
</style>
