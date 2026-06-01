<template>
	<div v-if="hasMore" class="load-more-tools">
		<v-btn
			class="load-more-tools__button"
			color="primary"
			text
			:disabled="isDisabled"
			@click="loadMore"
		>
			<v-progress-circular
				v-if="loading.loadMore"
				indeterminate
				size="18"
				width="2"
				class="mr-2"
			/>
			<span v-else class="load-more-tools__arrows" aria-hidden="true">
				<v-icon v-for="n in 3" :key="n" small class="load-more-tools__arrow">
					mdi-chevron-down
				</v-icon>
			</span>
			<span class="load-more-tools__text">
				{{ loading.loadMore ? 'Loading more tools' : 'Show more tools' }}
			</span>
		</v-btn>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'LoadMoreTools',
	computed: {
		...mapGetters('tool', {
			loading: 'loading',
			visibleTools: 'tools',
			totalTools: 'totalTools',
		}),
		hasMore() {
			return this.totalTools > this.visibleTools.length;
		},
		isDisabled() {
			return this.loading.search || this.loading.loadMore || !this.hasMore;
		},
	},
	methods: {
		loadMore() {
			console.log('dispatching...');
			this.$store
				.dispatch('tool/loadMoreTools')
				.then(() => {
					console.log('dispatch resolved');
				})
				.catch((err) => {
					console.error('dispatch error', err);
				});
		},
	},
};
</script>

<style scoped>
.load-more-tools {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 12px;
}

.load-more-tools__button {
	min-width: 180px;
	height: 48px !important;
	border-radius: 6px;
	letter-spacing: 0;
	text-transform: none;
}

.load-more-tools__arrows {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 18px;
	margin-right: 10px;
}

.load-more-tools__arrow {
	height: 8px;
	margin-top: -2px;
	transition: transform 0.18s ease, opacity 0.18s ease;
}

.load-more-tools__arrow:first-child {
	opacity: 0.45;
}

.load-more-tools__arrow:nth-child(2) {
	opacity: 0.7;
}

.load-more-tools__button:hover .load-more-tools__arrow {
	transform: translateY(3px);
}

.load-more-tools__button:hover .load-more-tools__arrow:first-child {
	transition-delay: 0s;
}

.load-more-tools__button:hover .load-more-tools__arrow:nth-child(2) {
	transition-delay: 0.04s;
}

.load-more-tools__button:hover .load-more-tools__arrow:nth-child(3) {
	transition-delay: 0.08s;
}

.load-more-tools__text {
	font-weight: 600;
}
</style>
