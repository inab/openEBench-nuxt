<template>
	<div
		class="alumni-card"
		@mouseover="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<v-card class="mx-auto fixed-height">
			<v-card-title class="name-container">{{ alumni.name }}</v-card-title>
			<v-card-subtitle class="subtitle-container">
				{{ formattedYears }}
				<div class="worked-on" @click="toggleExpand">
					<span
						class="worked-on-text"
						:class="{ 'fade-in': isHovered || isMobile }"
					>
						worked on
					</span>
					<v-icon class="arrow-icon">{{
						showRoles ? 'mdi-chevron-up' : 'mdi-chevron-down'
					}}</v-icon>
				</div>
			</v-card-subtitle>
			<v-divider class="mx-4 mb-1"></v-divider>
			<v-expand-transition>
				<div v-show="showRoles">
					<v-card-text class="scrollable-content">
						<p class="roles-text">{{ sortedandFormattedRoles }}</p>
					</v-card-text>
				</div>
			</v-expand-transition>
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
	},
	data() {
		return {
			showRoles: false,
			isHovered: false,
		};
	},
	computed: {
		formattedYears() {
			return `${this.alumni.startYear} - ${this.alumni.endYear}`;
		},
		sortedandFormattedRoles() {
			const sorted = this.alumni.roles.slice().sort();
			return sorted.join(', ');
		},
	},
	methods: {
		toggleExpand() {
			this.showRoles = !this.showRoles;
		},
	},
};
</script>

<style lang="scss" scoped>
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

.alumni-card:hover {
	box-shadow: 0 4px 20px rgba(0, 0, 0, 20%);
	transition: box-shadow 0.3s ease-in-out;
}

.subtitle-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.worked-on {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.worked-on-text {
	font-size: 12px;
	font-weight: 300;
	text-transform: lowercase;
	margin-right: 4px;
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
}

.fade-in {
	opacity: 1;
}

.arrow-icon {
	font-size: 16px;
	margin-top: 2px;
}

.roles-text {
	font-size: 14px !important;
}

/* Media query for mobile devices */
@media (max-width: 1080px) {
	.worked-on-text {
		opacity: 1 !important;
	}
}
</style>
