<template>
	<v-container>
		<div v-if="$store.state.observatory.data._unLoaded.countsPerSource">
			<v-row justify="space-around" align="center">
				<v-col v-for="card in 8" :key="card">
					<div class="source-card">
						<v-skeleton-loader class="loading-card" type="card-heading" />
					</div>
				</v-col>
			</v-row>
		</div>
		<div v-else>
			<v-row justify="space-around" align="center">
				<v-col v-for="card in cardsC" :key="cards_info[card.source].title">
					<div class="source-card">
						<!-- Necessary to center cards in columns-->
						<SourceCard
							:title="cards_info[card.source].title"
							:count="card.count"
							:label="cards_info[card.source].label"
						/>
					</div>
				</v-col>
			</v-row>
		</div>

		<div style="position: relative">
			<div v-if="!$vuetify.breakpoint.smAndDown" class="mt-2 card-caption-side">
				<p class="mr-4 mb-6 secondary--text" v-html="mainCardCaption"></p>
			</div>
			<div class="source-card">
				<TotalCard :count="totalC" />
			</div>
			<div v-if="$vuetify.breakpoint.smAndDown" class="card-caption-b">
				<p
					class="mr-2 text--secondary pb-0 mb-0 card-content caption"
					v-html="mainCardCaption"
				></p>
			</div>
		</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SourceCard from '~/components/observatory/data/CountCards/SourceCard.vue';
import TotalCard from '~/components/observatory/data/CountCards/TotalCard.vue';

export default {
	name: 'MainCards',
	components: {
		SourceCard,
		TotalCard,
	},
	data: () => ({
		cards_info: {
			biotools: {
				title: 'Bio.tools',
				flex: 3,
				label: 'elixir',
			},
			bioconda: {
				title: 'Bioconda',
				flex: 3,
				label: 'bioconda',
			},
			galaxy: {
				title: 'GalaxyEU',
				flex: 3,
				label: 'galaxy',
			},
			bioconductor: {
				title: 'Bioconductor',
				flex: 3,
				label: 'bioconductor',
			},
			toolshed: {
				title: 'Galaxy Toolshed',
				flex: 3,
				label: 'galaxy',
			},
			sourceforge: {
				title: 'SourceForge',
				flex: 3,
				label: 'sourceforge',
			},
			github: {
				title: 'GitHub',
				flex: 3,
				label: 'github',
			},
			bitbucket: {
				title: 'BitBucket',
				flex: 3,
				label: 'bitbucket',
			},
			opeb_metrics: {
				title: 'OpenEBench',
				flex: 3,
				label: 'OEB',
			},
		},
		defaultCaption:
			'Each number represents the amount of metadata from that source included in the final integrated collection ("Total"), after processing through the full pipeline.',
		scopedCaption:
			'Each number shows the contribution of that source to this community’s integrated collection ("Total") after processing through the full pipeline.',
	}),
	computed: {
		...mapGetters('observatory/data', {
			cardsC: 'CountsPerSource',
			totalC: 'TotalCount',
		}),
		...mapGetters('observatory', {
			currentCollection: 'getCurrentCollection',
		}),
		mainCardCaption() {
			return this.currentCollection !== 'tools'
				? this.scopedCaption
				: this.defaultCaption;
		},
	},
};
</script>

<style scoped>
.card-caption-side {
	float: right;
	width: 25%;
	text-align: justify;
	margin-top: -1em;
}

.card-caption-b {
	width: 80%;
	text-align: center;
	margin: auto;
}

.source-card {
	margin: auto;
	padding: auto;
	width: 90%;
	width: 13em;
}

.loading-card {
	min-height: 4.5rem;
	width: 100%;
	min-width: 8em;
	display: inline-block;
}
</style>
