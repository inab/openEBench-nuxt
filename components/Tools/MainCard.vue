<template>
	<v-row
		id="search-container"
		align="center"
		justify="center"
		class="mr-0 ml-0"
	>
		<v-col v-if="breadcrumbs.length > 0" cols="12" class="pb-0 pt-3">
			<v-breadcrumbs :items="breadcrumbs" dark class="py-0">
				<template #divider>
					<v-icon color="white">mdi-chevron-right</v-icon>
				</template>
				<template #item="{ item }">
					<v-breadcrumbs-item
						:to="item.to"
						:disabled="item.disabled"
						exact
						class="white--text"
					>
						{{ item.text }}
					</v-breadcrumbs-item>
				</template>
			</v-breadcrumbs>
		</v-col>

		<v-col cols="10" class="text-center mt-0 mb-0 pb-0">
			<h3 class="text-h5 mt-4">Explore Software in OpenEBench</h3>
		</v-col>

		<v-col cols="12" md="6" lg="5" class="mt-0 mb-2 pt-0">
			<!-- Search row -->
			<div class="search-wrapper mb-1">
				<v-icon color="white" class="search-icon-outside">mdi-magnify</v-icon>
				<div class="search-field">
					<input
						v-model="value"
						class="search-input"
						type="text"
						:placeholder="searchPlaceholder"
						@keydown.enter="triggerSearch(value)"
					/>
					<v-icon
						v-if="value"
						color="grey darken-1"
						class="clear-icon"
						@click="clearSearch"
					>
						mdi-close
					</v-icon>
				</div>
				<v-btn outlined class="search-btn" @click="triggerSearch(value)">
					Search
				</v-btn>
			</div>

			<div class="examples-row">
				<span class="examples-text">
					Try:
					<span v-for="(item, i) in exampleValues" :key="item.name">
						<a
							class="example-link white--text"
							@click="inputExample(item.name)"
						>
							{{ item.name }}
						</a>
						<span v-if="i < exampleValues.length - 1">, </span>
					</span>
				</span>
			</div>
			<div class="search-options-row">
				<button
					type="button"
					class="search-options-trigger"
					@click="searchOptionsOpen = !searchOptionsOpen"
				>
					<v-icon small color="white">
						{{ searchOptionsOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
					</v-icon>
					<span
						>Search in <strong>{{ searchOptionsLabel }}</strong></span
					>
				</button>
			</div>

			<div class="chips-panel" :class="{ 'is-open': searchOptionsOpen }">
				<search-categories @selection-change="updateSearchCategoryLabels" />
			</div>
		</v-col>
	</v-row>
</template>

<script>
import { SearchTools } from '~/mixins/SearchTools';
import SearchCategories from '~/components/Tools/Search/SearchCategories.vue';

export default {
	name: 'MainCard',
	components: { SearchCategories },
	mixins: [SearchTools],
	props: {
		breadcrumbs: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			value: '',
			searchOptionsOpen: false,
			selectedSearchCategoryLabels: [],
			exampleValues: [
				{ name: 'trimAl' },
				{ name: 'cell barcode' },
				{ name: 'differential protein abundance' },
			],
			searchingIn: [0, 1, 2, 3],
		};
	},
	computed: {
		totalToolsGlobal() {
			return this.$store.getters['tool/totalToolsGlobal'];
		},
		searchPlaceholder() {
			if (!this.totalToolsGlobal) return 'Search tools...';
			return `Search ${this.totalToolsGlobal.toLocaleString()} tools...`;
		},
		searchOptionsLabel() {
			if (
				!this.searchOptionsOpen ||
				this.selectedSearchCategoryLabels.length === 0
			) {
				return 'all fields';
			}
			return this.selectedSearchCategoryLabels.join(', ');
		},
		searchedTerm() {
			return this.$store.getters['tool/searchedTerm'];
		},
	},
	watch: {
		searchedTerm: {
			handler(val) {
				this.value = val || '';
			},
			immediate: true,
		},
	},
	methods: {
		inputExample(value) {
			this.value = value;
		},
		updateSearchCategoryLabels(labels) {
			this.selectedSearchCategoryLabels = labels;
		},
		clearSearch() {
			this.value = '';
			this.$store.dispatch('tool/updateSearchedTerm', '');
			this.$router.push({ path: '/tool' });
		},
	},
};
</script>

<style scoped>
#search-container {
	background-color: #396fba !important;
	color: white;
	width: 100vw;
	min-height: 290px;
	margin: 0 !important;
	margin-left: calc(-50vw + 50%) !important;
}

.search-wrapper {
	display: flex;
	align-items: center;
	gap: 10px;
	height: 48px;
}

.search-icon-outside {
	flex-shrink: 0;
	color: white !important;
	font-size: 30px !important;
	font-weight: 900 !important;
	-webkit-text-stroke: 0.8px white;
}

.search-field {
	flex: 1;
	display: flex;
	align-items: center;
	background: white;
	border-radius: 28px;
	padding: 0 14px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 15%);
	height: 100%;
}

.search-input {
	flex: 1;
	border: none;
	outline: none;
	font-size: 16px;
	color: #333;
	background: transparent;
	height: 100%;
}

.clear-icon {
	flex-shrink: 0;
	cursor: pointer;
}

.search-btn {
	height: 48px !important;
	border-radius: 28px !important;
	border: 2px solid white !important;
	color: white !important;
	background: transparent !important;
	font-weight: 500;
	align-self: stretch;
}

.search-btn::before {
	opacity: 0 !important;
}

.search-btn:hover {
	background: rgba(255, 255, 255, 12%) !important;
}

.examples-row {
	display: flex;
	justify-content: flex-start;
	padding-left: 45px;
	margin-top: 6px;
	margin-bottom: 10px;
}

.examples-text {
	color: rgba(255, 255, 255, 65%);
	font-size: 12px;
	white-space: nowrap;
}

.example-link {
	font-weight: 700;
	text-decoration: underline;
	text-underline-offset: 2px;
	cursor: pointer;
}

.search-options-row {
	display: flex;
	justify-content: flex-start;
	padding-left: 45px;
}

.search-options-trigger {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	color: rgba(255, 255, 255, 85%);
	font-size: 12px;
	line-height: 1.2;
	background: transparent;
	border: 0;
	padding: 0;
	cursor: pointer;
}

.chips-panel {
	min-height: 46px;
	padding-left: 36px;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.25s;
}

.chips-panel.is-open {
	opacity: 1;
	pointer-events: auto;
}

::v-deep .v-breadcrumbs__item {
	color: white !important;
}

::v-deep .v-breadcrumbs__item--disabled {
	color: rgba(255, 255, 255, 60%) !important;
}
</style>
