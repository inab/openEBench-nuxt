<template>
	<div class="ml-6">
		<div class="text-h5">About the Software Observatory</div>

		<v-row justify="left">
			<v-col md="10" sm="10" cols="10" lg="10" xl="10">
				<p class="mb-6 mt-4">
					The Software Observatory is designed as a dynamic tool to
					systematically monitor, assess, and elevate the quality of Life
					Sciences reearch software. Our mission is not just to observe but to
					actively foster the adoption of best practices in software development
					within the Life Sciences community.
				</p>

				<h6>Data Availability</h6>
				<p class="mb-6">
					Software Metadata and statistics are made available through the
					<a href="https://observatory.openebench.bsc.es/docs/api/"
						>Software Observatory API</a
					>.
				</p>

				<h6>Terminology</h6>

				<p class="mb-6">
					The Software Observatory uses the following terminology:
				</p>

				<ul class="mt-2">
					<li class="mb-2">
						<span class="highlight-info">Canonical Tool/Software</span>:
						abstract notion of a given research software, as a computational
						solution that has been implemented and given an identity name by its
						author/s.
					</li>
					<li class="mb-2">
						<span class="highlight-info"
							>Instance of a canonical tool/software:</span
						>
						Each of the different ways in which a canonical tool is implemented,
						in terms of the way a user interacts with it, e.g. command-line
						applications, web applications, libraries; availability, e.g.
						desktop and/or web applications; or differences in the code that are
						not big enough to justify considering them as distinct tools, e.g.
						different versions of the same software.
					</li>

					<li class="mb-2">
						<span class="highlight-info">Primary Sources</span>: sources used to
						discover software and build an initial collection of instances.
					</li>
					<li class="mb-2">
						<span class="highlight-info">Secondary sources</span>: sources mined
						to further enrich the initial collection of software metadata. They
						are identified through cross-referencies.
					</li>
				</ul>

				<h6>Citation</h6>
				<p class="mb-6">
					<span class="citation-article mt-0"
						>FAIRsoft - A practical implementation of FAIR principles for
						research software </span
					><br />
					Eva Martín del Pico, Josep Lluís Gelpí, Salvador Capella-Gutiérrez<br />
					bioRxiv 2022.05.04.490563; doi:<a
						href="https://doi.org/10.1101/2022.05.04.490563"
					>
						https://doi.org/10.1101/2022.05.04.490563</a
					>
				</p>

				<h6>Terms of Use</h6>
				<p class="mb-6">
					All data is distributed under a
					<a href="https://creativecommons.org/licenses/by-nd/2.0/">
						CC-BY-ND</a
					>
					license.
				</p></v-col
			>
		</v-row>
	</div>
</template>
<script>
export default {
	name: 'About',
	layout: 'observatory',
	data() {
		return {
			illustration: require(`@/static/observatory_illustration_5.svg`),
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: 'https://openebench.bsc.es/',
				},
				{
					text: 'Observatory',
					disabled: true,
					exact: true,
					to: '/observatory',
				},
			],
		};
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
<style scoped>
.highlight-info {
	color: #0b579f;
	font-weight: 600;
}

.citation-article {
	font-size: 1rem !important;
}
</style>
