<template>
	<div>
		<v-row justify="center">
			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<div class="mb-3 text-h5">FAIRsoft Indicator Scoreboard</div>
			</v-col>
		</v-row>
		<v-row>
			<CollectionSelector />
		</v-row>
		<v-row justify="center">
			<v-col md="9" sm="9" cols="9" lg="9" xl="9">
				<p style="line-height: 2.1" class="mb-1 mt-0">
					<v-card class="mx-auto" elevation="0">
						<!--v-card-subtitle>
							<span class="text-subtitle">What this view shows</span>
						</v-card-subtitle-->
						<v-card-text class="mb-0 pb-0">
							<span class="text-body-2 black--text">
								This scoreboard provides a visual summary of FAIRness scores for
								research software, based on the FAIRsoft indicators. Explore how
								different software collections perform across the four FAIR
								dimensions: Findable, Accessible, Interoperable, and Reusable.
							</span>
						</v-card-text>

						<v-card-actions class="mt-0">
							<v-spacer></v-spacer>
							<span class="ml-3 subtitle-2 grey--text">
								<v-icon small>info</v-icon> How to read this page
							</span>

							<v-btn icon @click="show = !show">
								<v-icon>{{
									show ? 'mdi-chevron-up' : 'mdi-chevron-down'
								}}</v-icon>
							</v-btn>
						</v-card-actions>

						<v-expand-transition>
							<div v-show="show" class="mb-3">
								<v-divider></v-divider>

								<v-card-text>
									<ul>
										<li>
											<strong>FAIR Dimensions</strong>: The page is structured
											around the four FAIR principles. Each one has associated
											indicators (e.g., “F1” for Identity Uniqueness).
										</li>
										<li>
											<strong>Size of bubbles</strong>: Indicates the percentage
											of tools that meet the indicator.
										</li>
										<li>
											<strong>Color coding</strong>: When you select a
											collection, its scores are shown in color, while the
											scores of all tools in the database appear in light grey —
											making it easy to compare your community with the overall
											landscape.
										</li>
										<li>
											<strong>Want to go deeper?</strong> Use the
											<a href="#" target="_blank">FAIRsoft Evaluator</a> to
											analyze a specific software or get improvement
											suggestions.
										</li>
									</ul>
								</v-card-text>
								<v-divider></v-divider>
							</div>
						</v-expand-transition>
					</v-card>
				</p>
				<v-row justify="center" class="my-4 mt-0 mb-0">
					<v-chip-group
						class="mb-0 mt-0 pb-0 pt-0"
						v-model="selected"
						active-class="primary--text"
						mandatory
						column
						center
					>
						<v-chip outlined large class="mr-2" value="findability">
							Findability
						</v-chip>

						<v-chip outlined large class="ml-2 mr-2" value="accessibility">
							Accessibility
						</v-chip>

						<v-chip outlined large class="ml-2 mr-2" value="interoperability">
							Interoperability
						</v-chip>

						<v-chip outlined large class="ml-2 mr-2" value="reusability">
							Reusability
						</v-chip>
					</v-chip-group>
				</v-row>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<div v-if="selected === 'findability'" :key="selected">
					<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
						<PlotWOptions class="copy-icon" :items="dialogItemsFindability" />

						<h6 class="text-center mt-2">Findability</h6>
						<v-card-text class="text-center text-body-2 black--text">
							Findability refers to how easily software and its metadata can be
							discovered by both humans and machines. It ensures that users can
							identify, locate, and reference a tool reliably.
						</v-card-text>

						<v-skeleton-loader
							v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
							class="mb-5 ml-10 mr-10"
							type="card"
						/>

						<BubbleChart
							v-else
							div-id="findability"
							:collection="current_collection"
							:collection-scores="fair_scores.F.fair_scores"
							:indicators-labels="fair_scores.F.labels"
							:control-scores="control_fair_scores.F.fair_scores"
							:collection-colors="colors"
							:collection-colors-lines="colors_lines"
						/>

						<v-divider></v-divider>

						<v-card-text class="black--text">
							<ul>
								<li class="mb-2">
									<strong class="blue_marker">F1 – Identity uniqueness</strong>
									<br />
									<strong
										>Does the software have a persistent and unique
										identifier?</strong
									>
									<ul>
										<li>
											The software has a name that clearly distinguishes it from
											others.
										</li>
										<li>
											Software versions are clearly labelled (e.g., 1.0, 2.1).
										</li>
									</ul>
								</li>

								<li class="mb-2">
									<strong class="orange_marker"
										>F2 – Existence of metadata</strong
									>
									<br />
									<strong
										>Is the software described with rich, structured
										metadata?</strong
									>
									<ul>
										<li>
											Metadata is in machine-readable formats like JSON, XML, or
											YAML.
										</li>
										<li>
											Metadata uses community standards (e.g., EDAM,
											Bioschemas).
										</li>
									</ul>
								</li>

								<li>
									<strong class="green_marker">F3 – Discoverability</strong>
									<br />
									<strong
										>Can the software be found using external resources?
									</strong>
									<ul>
										<li>
											The software is listed in curated registries like
											bio.tools.
										</li>
										<li>
											The software is available in code repositories such as
											GitHub or GitLab.
										</li>
										<li>
											The software is described in a peer-reviewed publication
											or preprint.
										</li>
									</ul>
								</li>
							</ul>
						</v-card-text>
					</v-card>
				</div>
				<div v-else-if="selected === 'accessibility'" :key="selected">
					<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
						<PlotWOptions class="copy-icon" :items="dialogItemsAccessibility" />

						<div>
							<h6 class="text-center mt-2">Accessibility</h6>
							<v-card-text class="text-center text-body-2 black--text">
								Accessibility evaluates whether users can obtain, install, and
								run the software without barriers.
							</v-card-text>
						</div>

						<v-skeleton-loader
							v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
							class="mb-5 ml-10 mr-10"
							type="card"
						/>

						<BubbleChart
							v-else
							div-id="accessibility"
							:collection="current_collection"
							:collection-scores="fair_scores.A.fair_scores"
							:indicators-labels="fair_scores.A.labels"
							:control-scores="control_fair_scores.A.fair_scores"
							:collection-colors="colors"
							:collection-colors-lines="colors_lines"
						/>

						<v-divider></v-divider>

						<v-card-text class="black--text">
							<ul>
								<li class="mb-2">
									<strong class="blue_marker"
										>A1 – Availability of working version</strong
									>
									<br />
									<strong
										>Can users access or install a working version of the
										software?</strong
									>
									<ul>
										<li>
											The software can be accessed through a web service or API.
										</li>
										<li>
											A version can be downloaded and run locally or via
											containers.
										</li>
										<li>
											Clear instructions are provided for building or installing
											the software.
										</li>
										<li>
											Sample input/output data is available for testing the
											tool.
										</li>
										<li>
											The source code is openly accessible for download and
											compilation.
										</li>
									</ul>
								</li>

								<li>
									<strong class="orange_marker"
										>A3 – Unrestricted Access</strong
									>
									<br />
									<strong>Can the software be used without barriers? </strong>
									<ul>
										<li>The software works on free OSes like GNU/Linux.</li>
										<li>
											The software runs on at least two operating systems.
										</li>
										<li>
											The software can be accessed via public platforms (e.g.
											Galaxy, VREs).
										</li>
										<li>
											The software is usable across more than one
											e-infrastructure.
										</li>
									</ul>
								</li>
							</ul>
						</v-card-text>
					</v-card>
				</div>
				<div v-else-if="selected === 'interoperability'" :key="selected">
					<v-card
						v-if="selected === 'interoperability'"
						outlined
						elevation="1"
						class="mt-3 pt-4 pl-6 pb-4"
					>
						<PlotWOptions
							class="copy-icon"
							:items="dialogItemsInterperability"
						/>
						<h6 class="text-center mt-2">Interoperability</h6>
						<v-card-text class="text-center text-body-2 black--text">
							Interoperability assesses whether the software can work smoothly
							with other tools, data formats, and platforms.
						</v-card-text>
						<v-skeleton-loader
							v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
							class="mb-5 ml-10 mr-10"
							type="card"
						/>

						<BubbleChart
							v-else
							div-id="interoperability"
							:collection="current_collection"
							:collection-scores="fair_scores.I.fair_scores"
							:indicators-labels="fair_scores.I.labels"
							:control-scores="control_fair_scores.I.fair_scores"
							:collection-colors="colors"
							:collection-colors-lines="colors_lines"
						/>

						<v-divider></v-divider>

						<v-card-text class="black--text">
							<ul>
								<li class="mb-2">
									<strong class="blue_marker"
										>I1 – Data format standards and practices</strong
									>: <br />
									<strong>
										Does the software use and support standard data formats and
										good data handling practices?</strong
									>
									<ul>
										<li>
											Input/output formats follow accepted standards (e.g., EDAM
											ontology).
										</li>
										<li>
											Input/output formats can be validated using schemas (e.g.,
											JSON, XML, RDF).
										</li>
										<li>
											Multiple input/output formats are supported or
											convertible.
										</li>
									</ul>
								</li>

								<li class="mb-2">
									<strong class="orange_marker"
										>I2 – Software integration</strong
									>
									<br />
									<strong
										>Can the software be used easily with other tools or in
										workflows?</strong
									>
									<ul>
										<li>
											The software is available as a library or has an API
											version.
										</li>
										<li>
											The software can be deployed on platforms like Galaxy or
											VREs.
										</li>
									</ul>
								</li>

								<li>
									<strong class="green_marker"
										>I3 – Dependencies availability</strong
									>
									<br />
									<strong
										>Are the software’s dependencies documented and
										accessible?</strong
									>
									<ul>
										<li>The software explicitly lists its dependencies.</li>
										<li>
											Dependencies are bundled or accessible through external
											resources.
										</li>
										<li>
											The software is available through systems like Bioconda or
											Galaxy Europe.
										</li>
									</ul>
								</li>
							</ul>
						</v-card-text>
					</v-card>
				</div>
				<div v-else-if="selected === 'reusability'" :key="selected">
					<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
						<PlotWOptions class="copy-icon" :items="dialogItemsReusability" />
						<h6 class="text-center mt-2">Reusability</h6>

						<v-card-text class="text-center text-body-2 black--text">
							Reusability evaluates whether the software is well-documented,
							legally usable, and maintained in a way that supports future use.
						</v-card-text>

						<v-skeleton-loader
							v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
							class="mb-5 ml-10 mr-10"
							type="card"
						/>

						<BubbleChart
							v-else
							div-id="reusability"
							:collection="current_collection"
							:collection-scores="fair_scores.R.fair_scores"
							:indicators-labels="fair_scores.R.labels"
							:control-scores="control_fair_scores.R.fair_scores"
							:collection-colors="colors"
							:collection-colors-lines="colors_lines"
						/>

						<v-divider></v-divider>

						<v-card-text class="black--text">
							<ul>
								<li class="mb-2">
									<strong class="blue_marker">R1 – Usage Documentation</strong>
									<br />
									<strong
										>Does the software provide documentation to help users
										understand and apply it effectively?
									</strong>

									<ul>
										<li>
											User manuals or tutorials explain how to use the software.
										</li>
										<!--li>
											Real use cases or examples illustrate practical
											application.
										</li-->
									</ul>
								</li>

								<li class="mb-2">
									<strong class="orange_marker">R2 – License</strong>
									<br />
									<strong
										>Are there clear legal conditions for using the
										software?</strong
									>
									<ul>
										<li>
											The software includes a stated license or terms of use.
										</li>
										<li>
											Installation and usage conditions are clearly described.
										</li>
									</ul>
								</li>

								<li class="mb-2">
									<strong class="green_marker"
										>R3 – Recognition and governance</strong
									>
									<br />
									<strong
										>Are contributor roles acknowledged and policies
										defined?</strong
									>
									<ul>
										<!--li>
											Guidelines for external contributions are documented.
										</li-->
										<li>
											Developers and contributors receive appropriate
											recognition.
										</li>
									</ul>
								</li>

								<li>
									<strong class="purple_marker"
										>R4 – Versioning and historical traceability</strong
									><br />
									<strong
										>Does the software follow version control and track changes
										over time?</strong
									>
									<ul>
										<li>
											The software uses systems like Git to track changes.
										</li>
										<!--li>
											There is a documented policy describing how and when new
											versions are released.
										</li>
										<li>
											Metadata for older versions is maintained in repositories.
										</li-->
									</ul>
								</li>
							</ul>
						</v-card-text>
					</v-card>
				</div>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import CollectionSelector from '~/components/observatory/CollectionSelector.vue';
import BubbleChart from '~/components/observatory/fairness/BubbleChart.vue';
import FTable from '~/components/observatory/fairness/FTable.vue';
import ATable from '~/components/observatory/fairness/ATable.vue';
import ITable from '~/components/observatory/fairness/ITable.vue';
import RTable from '~/components/observatory/fairness/RTable.vue';
import PlotWOptions from '~/components/observatory/PlotWOptions.vue';

import { embedCodes } from '~/components/observatory/visualizations/embedCodes.js'; // Import the embed codes

export default {
	name: 'FAIRness',
	components: {
		CollectionSelector,
		BubbleChart,
		PlotWOptions,
	},
	layout: 'observatory',
	computed: {
		...mapGetters('observatory', {
			fair_scores: 'fairness/FAIRscores',
			control_fair_scores: 'fairness/ControlFAIRscores',
			current_collection: 'getCurrentCollection',
		}),
	},

	data() {
		return {
			show: false,
			selected: 'findability',
			colors: ['#5da4d6', '#ff900e', '#2ca065', '#bd86f0'],
			colors_lines: ['#0075c7', '#995302', '#046b37', '#5e3d7d'],
			FTable,
			ATable,
			ITable,
			RTable,
			alertVisible: true,
			dialogItemsFindability: [embedCodes.findabilityBubble],
			dialogItemsAccessibility: [embedCodes.accessibilityBubble],
			dialogItemsInteroperability: [embedCodes.interoperabilityBubble],
			dialogItemsReusability: [embedCodes.reusabilityBubble],
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

	created() {
		this.$store.dispatch('observatory/fairness/getControlFAIRscores');
		this.$store.dispatch('observatory/fairness/getFAIRscores');
	},

	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
<style scoped>
.copy-icon {
	position: absolute;
	top: 5px;
	right: 10px;
}

.green_marker {
	color: #169454;
}

.orange_marker {
	color: #eb8510;
}

.blue_marker {
	color: #027bd1;
}

.purple_marker {
	color: #944fd3;
}
</style>
