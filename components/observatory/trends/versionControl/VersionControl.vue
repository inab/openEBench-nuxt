<template>
	<v-card outlined elevation="2">
		<PlotWOptions class="copy-icon" :items="dialogItems" />
		<v-container class="mb-3">
			<v-row class="pt-0" justify="center">
				<v-col xl="7" lg="7" md="12" sm="7" xs="12" cols="12" class="mt-0 pt-1">
					<h6 class="text-center mt-6 mb-2">
						Repositories and Version Control
					</h6>
					<p style="line-height: 1.8" class="mt-0 text-center card-content-vs">
						Making software available through any of the main software
						repositories makes it more
						<span class="highlight">Findable</span> and
						<span class="highlight">Accessible</span>.
					</p>
					<p style="line-height: 1.8" class="mb-2 text-center card-content-vs">
						Version control offers a standardized record of source code changes,
						making it easier to be
						<span class="highlight">Reused.</span>
					</p>
				</v-col>
				<v-col xl="4" lg="4" md="10" sm="4" xs="10" align-self="center">
					<v-skeleton-loader
						v-if="$store.state.observatory.trends._unLoaded.versionControlCount"
						class="pt-10 pr-4 pl-4 pb-10 number-card-loader"
						type="image"
					/>
					<v-card
						v-else
						class="mt-2 mr-2 number-card"
						color="#f5971b"
						elevation="0"
					>
						<v-card-text class="text-center number"
							>{{ percentage.toFixed(1) }}%
						</v-card-text>
						<v-card-text class="text-center number-text"
							>of instances use
							<span class="number-highlight">version control</span></v-card-text
						>
					</v-card>
				</v-col>
			</v-row>
			<v-row v-if="versionControlVisible()" justify="center" class="mb-0">
				<v-col cols="10">
					<v-skeleton-loader
						v-if="
							$store.state.observatory.trends._unLoaded
								.versionControlRepositories
						"
						class="mb-5 ml-10 mr-10"
						type="card-avatar"
					/>

					<VersionControlPlot v-else :x-values="x" :y-values="y" />
				</v-col>
				<v-col xl="11" lg="11" md="10" sm="12" align-self="start">
					<p class="mt-0 ml-8 mb-0">
						<span class="highlight"
							>Number of instances in four widely used platforms for software
							distribution and development</span
						>
					</p>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import VersionControlPlot from './VersionControlPlot.vue';
import PlotWOptions from '~/components/observatory/PlotWOptions.vue';
import { embedCodes } from '~/components/observatory/visualizations/embedCodes.js'; // Import the embed codes

export default {
	name: 'VersionControl',
	components: {
		VersionControlPlot,
		PlotWOptions,
	},
	data() {
		return {
			dialogItems: [embedCodes.versionControl],
		};
	},
	computed: {
		...mapGetters('observatory', {
			control_counts: 'trends/VersionControlCount',
			data_vc: 'trends/VersionControlRepositories',
		}),

		x() {
			return Object.values(this.data_vc);
		},

		y() {
			return Object.keys(this.data_vc);
		},

		percentage() {
			const {
				'version control': versionControl,
				'no version control': noVersionControl,
			} = this.control_counts;
			const total = versionControl + noVersionControl;
			return (versionControl / total) * 100;
		},
	},
	created() {
		this.$store.dispatch('observatory/trends/getVersionControlCount');
	},

	methods: {
		versionControlVisible() {
			if (
				this.$store.state.observatory.trends._versionControlCount[
					'version control'
				] === 0
			) {
				return false;
			} else {
				return true;
			}
		},
	},
};
</script>
<style scoped>
.v-card {
	margin: auto;
	padding: auto;
}

.number-card-loader {
	height: 9em;
}

.number-card {
	word-break: break-all;
	opacity: 0.9;
}

.number {
	font-size: 2.7rem;
	padding-top: 0.6em;
	padding-bottom: 0.2em;
	color: white !important;
}

.number-text {
	color: white !important;
	font-family: Roboto, sans-serif;
	font-size: 1.1em;
	font-weight: 300;
	line-height: 1.4em;
	word-break: initial;
	padding: 0.6em;
}

.number-highlight {
	font-weight: 700;
}

.text-subtitle {
	color: black;
	font-family: Roboto, sans-serif;
	font-weight: 300;
	font-size: 1.4em;
}

.highlight {
	color: #001752f8;
	font-weight: 500;
}

.card-content-vs {
	font-size: 0.9em !important;
	width: 95%;
	margin: auto;
}

.copy-icon {
	position: absolute;
	top: 5px;
	right: 10px;
}
</style>
