<template>
	<div class="alumni-card">
		<v-card class="mx-auto fixed-height">
			<v-card-title class="name-container">{{ alumni.name }}</v-card-title>
			<v-card-subtitle class="subtitle-container">{{
				formattedYears
			}}</v-card-subtitle>
			<v-divider class="mx-4 mb-1"></v-divider>
			<v-card-text class="scrollable-content">
				<v-layout row wrap class="icon-row mt-2" justify-center>
					<v-flex v-for="(role, idx) in alumni.roles" :key="idx" xs4>
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
										:style="{ backgroundImage: getItemIcon(role.name) }"
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
		</v-card>
	</div>
</template>

<script>
import sharedMethodsMixin from '@/mixins/sharedMethodsMixin.js';

export default {
	name: 'AlumniCard',
	mixins: [sharedMethodsMixin],
	props: {
		alumni: {
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
	computed: {
		formattedYears() {
			return `${this.alumni.startYear} - ${this.alumni.endYear}`;
		},
	},
};
</script>

<style scoped>
@import '../../assets/sharedStyles.css';

.v-card-text {
	flex: 1 1 auto;
	overflow: hidden;
}

.scrollable-content {
	overflow-y: auto;
	max-height: 80px;
	padding-right: 16px;
}
</style>
