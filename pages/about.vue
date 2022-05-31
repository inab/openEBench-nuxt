<template>
	<v-container>
		<h1 class="text--h3">OpenEBench: the ELIXIR platform for benchmarking</h1>
		<p class="mt-1">
			<b
				>Find more information here:
				<v-icon small>mdi-open-in-new</v-icon>
				<a href="https://openebench.readthedocs.io/en/latest/" target="_blank">
					https://openebench.readthedocs.io/en/latest/
				</a>
			</b>
		</p>
		<p>
			OpenEBench (<v-icon small>mdi-open-in-new</v-icon
			><a href="https://openebench.bsc.es" target="_blank">
				https://openebench.bsc.es </a
			>) is the ELIXIR benchmarking and technical monitoring platform for
			bioinformatics tools, web servers and workflows. OpenEBench is part of the
			ELIXIR Tools platform and its development is led by the Barcelona
			Supercomputing Center (BSC) in collaboration with partners within ELIXIR
			and beyond.
		</p>
		<p>
			Within the ELIXIR project, OpenEBench is being developed under the Tools
			Platform at the Work Package 2 (WP2: Benchmarking) (<v-icon small
				>mdi-open-in-new</v-icon
			><a href="https://elixir-europe.org/platforms/tools" target="_blank">
				https://elixir-europe.org/platforms/tools </a
			>).
		</p>
		<p>
			All OpenEBench components have been designed and implemented following the
			recommendations made by the ELIXIR tools platform e.g. making code
			available in public repositories from day 1; are available as software
			containers, and use workflow managers promoted by ELIXIR. Next figure
			illustrates the interconnection of OpenEBench to other ELIXIR tools
			platforms systems and platforms and beyond.
		</p>
		<img
			src="~/static/images/about/oeb-tools-platform.png"
			alt="Diagram of OpenEBench Tools Platform"
			class="mb-3 mt-3"
		/>
		<h2 class="text--h4">The goals of OpenEBench</h2>
		<ul class="mb-5">
			<li>
				Provide guidance and software infrastructure for Benchmarking and
				Techincal monitoring of bioinformatics tools.
			</li>
			<li>
				Engage with existing benchmark initiatives making different communities
				aware of the platform.
			</li>
			<li>
				Maintain a data warehouse infrastructure to keep record of Benchmarking
				initiatives.
			</li>
			<li>
				Expose benchmarking and technical monitoring results to Elixir Tools
				registry.
			</li>
			<li>
				Establish and refine communication protocols with communities and/or
				infrastructure projects willing to have a unified benchmark
				infrastructure Coordinate with Elixir.
			</li>
			<li>
				Work with the ELIXIR Interoperability Platform to keep FAIR data
				principles on the Benchmarking data warehouse.
			</li>
		</ul>
		<h2 class="text--h4">Technical monitoring</h2>
		<p>
			OpenEBench, holds a specific infrastructure to monitor software quality.
			In an initial analysis phase BSC has put together a series of quality
			metrics taken from a number of sources. The source of such metrics
			includes documents by the Software Sustainability Institute,
			recommendations for open source software development, or for software
			quality metrics. For each metric, a specific source of information have
			been chosen and the necessary interface implemented.
		</p>
		<h2 class="text--h4">Scientific benchmarking</h2>
		<p>
			Scientific benchmarking helps determine the precision, recall and other
			metrics of bioinformatics resources in unbiased scenarios, which have been
			set up through reference databases, ad-hoc input and test data sets
			reflecting specifying scientific challenges. Chosen metrics allow us to
			objectively evaluate the relative scientific performance of the different
			participating resources. It is even possible to understand what are the
			software potential biases, strengths and weaknesses and/or under which
			conditions do they perform better or worse.
		</p>
		<h2 class="text--h4">OEB architecture levels</h2>
		<p>
			OpenEBench scientific benchmarking architecture has three different levels
			that allow communities at different maturity stages to make use of the
			platform.
		</p>
		<ul>
			<li>
				<h3 class="text--h5">Level 1</h3>
				Used for the long-term storage of benchmarking events and challenges
				aiming at reproducibility and provenance.
			</li>
			<li>
				<h3 class="text--h5">Level 2</h3>
				Allows the community to use benchmarking workflows to assess
				participants’ performance. Those workflows compute one or more
				evaluation metrics given one or more reference datasets.
			</li>
			<li>
				<h3 class="text--h5">Level 3</h3>
				Goes further by getting workflows specifications from participants, and
				then evaluating them in terms of technical and scientific performance.
				At this level, the whole benchmarking experiment is performed at
				OpenEBench; first, the predictions are made using the software provided
				by the participants, then, those predictions are evaluated with the
				benchmarking workflows, and, finally, the results are stored and
				visualized in the web server.
			</li>
		</ul>
		<img
			src="~/static/images/about/oeb-levels.png"
			alt="OpenEBench Level Architecture"
			class="mb-3 mt-3"
		/>
		<h2 class="text--h4">OpenEBench public API's</h2>
		<p>
			Although the OpenEBench website gives access to all information stored in
			the data warehouse in a friendly manner, the platform is designed to
			provide information in a way that can be integrated in other
			infrastructures. To this end a series of RESTful API’s have been
			developed. Information from these APIs is obtained in JSON format.
		</p>
		<ul>
			<li>
				OpeneBench tools API:
				<v-icon small>mdi-open-in-new</v-icon>
				<a
					href="https://openebench.bsc.es/monitor/tool?from=0&amp;to=10"
					target="_blank"
					>https://openebench.bsc.es/monitor/tool
				</a>
			</li>
			<li>
				OpeneBench scientific API:
				<v-icon small>mdi-open-in-new</v-icon>
				<a href="https://openebench.bsc.es/sciapi/" target="_blank">
					https://openebench.bsc.es/sciapi/
				</a>
			</li>
		</ul>
		<p class="text-center mt-10">
			<b>The white paper for this project is available </b>
			<v-icon small>mdi-open-in-new</v-icon>
			<a
				target="_blank"
				href="https://www.biorxiv.org/content/early/2017/08/31/181677"
				>here</a
			>
		</p>
	</v-container>
</template>

<script>
export default {
	name: 'AboutPage',
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'About',
					disabled: true,
				},
			],
		};
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
