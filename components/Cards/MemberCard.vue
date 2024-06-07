<template>
	<v-card class="mx-auto my-4" :max-width="374">
		<!-- Centered container for circles -->
		<div class="circle-container">
			<!-- Outer circle -->
			<div class="outer-circle" style="margin-top: 10px">
				<!-- Inner circle with white background -->
				<div class="inner-circle">
					<!-- Circle image of team member -->

					<!-- Use v-avatar to display the member's image -->
					<v-avatar size="185" class="avatar-wrapper">
						<!-- Conditional rendering of image based on URL type -->

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
						<span v-if="idx < member.institution.length - 1">,&nbsp;</span>
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
				<v-card-text>
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
						src="@/static/images/teams/orcid.svg"
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
						src="@/static/images/teams/github-logo.png"
						alt="GitHub Logo"
						class="logo chip-with-logo"
					/>GITHUB
				</v-chip>
			</v-chip-group>
		</div>
	</v-card>
</template>

<script>
import sharedMethodsMixin from '@/mixins/sharedMethodsMixin.js';

export default {
	name: 'MemberCard',
	props: {
		member: {
			type: Object,
			required: true,
		},
		isMobile: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			required: true,
		},
		institutionMapping: { type: Object, required: true },
	},
	mixins: [sharedMethodsMixin],
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
		toggleExpand(member) {
			member.show = !member.show;
		},
	},
};
</script>

<style scoped>
@import '../../assets/sharedStyles.css';

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
</style>
