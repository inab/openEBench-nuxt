<template>
	<v-btn
		v-show="visible"
		class="back-to-top"
		fab
		dark
		small
		color="#f48f43"
		@click="scrollToTop"
	>
		<v-icon dark>mdi-arrow-up</v-icon>
	</v-btn>
</template>

<script>
export default {
	name: 'BackToTop',
	data() {
		return {
			visible: false,
			scrollTarget: null,
		};
	},
	mounted() {
		// Use the scrollable container if it exists, otherwise fall back to window
		this.scrollTarget = document.querySelector('#layout-container') || window;
		this.scrollTarget.addEventListener('scroll', this.handleScroll);
	},
	beforeDestroy() {
		this.scrollTarget.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		handleScroll() {
			const scrollTop =
				this.scrollTarget === window
					? window.scrollY
					: this.scrollTarget.scrollTop;

			this.visible = scrollTop > 300;
		},
		scrollToTop() {
			this.scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
		},
	},
};
</script>

<style scoped>
.back-to-top {
	position: fixed;
	bottom: 410px;
	right: 80px;
	z-index: 100;
}
</style>
