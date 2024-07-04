<template>
	<div v-if="data.datalink.inline_data.visualization.type">
		<!-- Scatter -->
		<div v-if="data.datalink.inline_data.visualization.type === '2D-plot'">
			<div class="text--secondary">
				<p class="text--secondary">
					In this Scatter plot two metrics from the challenge
					<strong> {{ challenge_label }} </strong> are represented in the X and
					Y axis, showing the results from the participating tools in this
					challenge.
				</p>
				<ul>
					<li>
						The grey and orange lines represent the Pareto frontier, which runs
						through the tools of the participants, showing the best efficiency,
						the grey line corresponds to the 'Global pareto' which remains fixed
						in the graph and the orange line to the 'Dynamic pareto', which is
						updated according to the visible tools.
					</li>
					<li>The arrow on the graph represents the optimal corner.</li>
				</ul>
			</div>

			<v-alert class="mt-8" border="left" dense text color="info" type="info">
				The menu button above the diagram can be used to switch between the
				different classification methods / visualization modes (Square
				Quartiles; Diagonal Quartiles, and k-means Clustering). These
				classifications will only be available when there are 4 or more
				participants tools and the dataset has an optimal display.
			</v-alert>
		</div>

		<!-- Barplot -->
		<div
			v-else-if="data.datalink.inline_data.visualization.type === 'bar-plot'"
		>
			<div class="text--secondary">
				<p class="text--secondary">
					In this Barplot donec massa sapien faucibus et
					<strong> {{ challenge_label }} </strong> Lorem ipsum dolor sit amet,
					consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
					labore et dolore magna aliqua.
				</p>
				<ul>
					<li>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere
						sollicitudin aliquam ultrices sagittis orci a scelerisque.
					</li>
					<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
				</ul>
			</div>
			<v-alert class="mt-8" border="left" dense text color="info" type="info">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum
				integer enim neque volutpat ac tincidunt. Nulla posuere sollicitudin
				aliquam ultrices.
			</v-alert>
		</div>
	</div>
</template>
<script>
export default {
	name: 'ChartDescriptionCard',
	props: {
		data: {
			type: Object,
			required: true,
		},
		challenge_label: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped>
.text--secondary {
	font-size: 16px !important;
}
</style>
