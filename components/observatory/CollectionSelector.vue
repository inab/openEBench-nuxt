<template>
	<v-sheet class="mx-auto mb-4" elevation="0" max-width="900">
		<v-card outlined class="pa-2">
			<h6 class="overline text-center collections-header mt-4 mb-2">
				collections
			</h6>
			<p class="mb-1 text-body-2 text-center">
				Select a collection below to view the trends of the software associated
				to a specific project/organization
			</p>
			<v-slide-group
				v-model="model"
				class="pa-4 mb-4"
				show-arrows
				center-active
			>
				<v-slide-item
					v-for="(n, idx) in collections"
					:key="idx"
					v-slot="{ active }"
				>
					<v-btn
						class="mx-2"
						:input-value="active"
						active-class="primary white--text"
						depressed
						rounded
						@click="setCollection(idx)"
					>
						{{ n.title }}
					</v-btn>
				</v-slide-item>
			</v-slide-group>

			<v-expand-transition>
				<v-sheet v-if="model != null" class="mb-2">
					<v-row
						class="fill-height mr-4 ml-4"
						align-content="center"
						justify="center"
						align="center"
					>
						<v-col cols="10">
							<h6 class="text-subtitle mb-0 pb-0 text-left collection-title">
								{{ collections[model].title }}
							</h6>
							<p class="text-subtitle-2 mt-0 pt-0 mb-2 text-left">
								{{ collections[model].subtitle }}
							</p>
							<p
								class="text--secondary text-left collection-description mb-0 mt-0"
							>
								{{ collections[model].description }}
							</p>
						</v-col>
						<v-col cols="2">
							<div class="container">
								<img
									class="responsive-image"
									alt="Community logo"
									:src="
										require(`@/static/collections/${collections[model].image}`)
									"
								/>
							</div>
						</v-col>
					</v-row>
				</v-sheet>
			</v-expand-transition>
		</v-card>
	</v-sheet>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('observatory', {
			currentCollection: 'getCurrentCollection',
			collections: 'getCollections',
			uniqueCollection: 'getUniqueCollection',
		}),
		model() {
			return this.updateModel();
		},
	},
	methods: {
		updateModel() {
			// model is an index, find the index of the current collection
			const index = this.collections.findIndex((object) => {
				return object.id === this.currentCollection;
			});

			if (index !== -1) {
				// set model equal to that index
				// console.log('model is ' + index)
				return index;
			} else {
				// console.log('model is null')
				return null;
			}
		},
		setCollection(idx) {
			// Unless a unique collection is stated, allow the user to select a collection
			if (this.uniqueCollection === null) {
				// Step 1: set currentCollection

				/// If the collection clicked is not already selected, set currentCollection to it
				if (this.collections[idx].id !== this.currentCollection) {
					this.$store.dispatch(
						'observatory/changeCurrentCollection',
						this.collections[idx].id
					);
				}
				/// If the collection is already selected, set currentCollection to (all) tools
				else {
					this.$store.dispatch('observatory/changeCurrentCollection', 'tools');
				}
				// Step2: Refresh data
				this.triggerDataRefresh();
			}
		},
		triggerDataRefresh() {
			// data for fairness page <- fairness store
			this.$store.dispatch('observatory/fairness/getFAIRscores');

			// data for index page <- trends store
			this.$store.dispatch('observatory/trends/getLicensesSunburst');
			this.$store.dispatch('observatory/trends/getLicensesOpenSource');
			this.$store.dispatch('observatory/trends/getSemanticVersioning');
			this.$store.dispatch('observatory/trends/getVersionControlCount');
			this.$store.dispatch('observatory/trends/getVersionControlRepositories');
			this.$store.dispatch('observatory/trends/getPublications');

			// data for data page <- data store
			this.$store.dispatch('observatory/data/getCountsPerSource');
			this.$store.dispatch('observatory/data/getTotalCount');
			this.$store.dispatch('observatory/data/getFeatures');
			this.$store.dispatch('observatory/data/getCoverageSources');
			this.$store.dispatch('observatory/data/getCompleteness');
			this.$store.dispatch('observatory/data/getTypes');
			this.$forceUpdate();
		},
	},
};
</script>
<style scoped>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 110px;
	height: 130px;
}

.responsive-image {
	width: 100%;
	height: auto;
	object-fit: contain;
}

.collections-header {
	color: #0b579f;
}

.collection-title {
	color: #0b579f;
	font-size: 1.8rem;
	font-weight: 500;
}

.collection-description {
	font-size: 0.9em !important;
}
</style>
