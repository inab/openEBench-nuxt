export default {
	data() {
		return {
			plotHeight: 0,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.updatePlotHeight();
			window.addEventListener('resize', this.updatePlotHeight);
		});
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.updatePlotHeight);
	},
	methods: {
		updatePlotHeight() {
			this.$nextTick(() => {
				const footerHeight = 65; // 65px is the height of the footer
				this.plotHeight = window.innerHeight - footerHeight;
			});
		},
	},
};
