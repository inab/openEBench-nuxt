<template>
	<div v-if="data.datalink.inline_data.visualization.type">
		<!-- Scatter -->
		<div v-if="data.datalink.inline_data.visualization.type === '2D-plot'">
			<p>
				In this Scatter plot two metrics from the challenge
				<strong> {{ challenge_label }} </strong> are represented in the X and Y
				axis, showing the results from the participating tools in this
				challenge.
			</p>
			<ul>
				<p>
					The grey and orange lines represent the Pareto frontier, which runs
					through the tools of the participants, showing the best efficiency,
					the grey line corresponds to the 'Global pareto' which remains fixed
					in the graph and the orange line to the 'Dynamic pareto', which is
					updated according to the visible tools.
				</p>

				<p>The arrow on the graph represents the optimal corner.</p>

				<p>
					The menu button above the diagram can be used to switch between the
					different classification methods / visualization modes (Square
					Quartiles; Diagonal Quartiles, and k-means Clustering).
				</p>
			</ul>

			<v-alert class="mt-8" border="left" dense text color="info" type="info">
				These classifications will only be available when there are four or more
				participants tools and the dataset has an optimal display.
			</v-alert>
		</div>

		<!-- Barplot -->
		<div
			v-else-if="data.datalink.inline_data.visualization.type === 'bar-plot'"
		>
			<p>
				In this Bar plot one metric from the challenge
				<strong> {{ challenge_label }} </strong> is represented in Y axis,
				showing the results from the participating tools in this challenge.
			</p>
			<ul>
				<p>
					If the participants are similar there is an optimal view button to
					check all the details between them.
				</p>
				<p>
					The menu button above the diagram can be used to show the
					classification in quartiles.
				</p>
			</ul>
			<v-alert class="mt-8" border="left" dense text color="info" type="info">
				The default order is given the maximum value in the first quartile. The
				classification in quartiles only can be available with a minimum of four
				participants.
			</v-alert>
		</div>

		<!-- Box Plot -->
		<div
			v-else-if="data.datalink.inline_data.visualization.type === 'box-plot'"
		>
			<p>
				In this Box Plot the results of a benchmarking challenge,
				<strong> {{ challenge_label }} </strong> display the representation of
				the distribution of a dataset on a seven-number summary of data-points:
			</p>
			<ul>
				<p>
					the “minimum” and “lowerfence”, quartile (Q1), median, third quartile
					(Q3), “maximum” and “upperfence” values.
				</p>
				<p>
					The metric of the challenges (available_metrics) is represented in Y
					axis by default. If the participants have an optimization default
					view, the graph should print with it .
				</p>
			</ul>
			<v-alert class="mt-8" border="left" dense text color="info" type="info">
				The menu button above the diagram can be used to switch the default
				visualization ordered by median value of each participant.
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
li {
	line-height: 22px !important;
	size: 14px !important;
}
</style>
