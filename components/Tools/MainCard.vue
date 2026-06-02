<template>
	<v-row
		id="search-container"
		align="center"
		justify="center"
		class="mr-0 ml-0"
	>
		<v-col cols="12" class="pb-0 pt-3" v-if="breadcrumbs.length > 0">
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
						:placeholder="`Search ${totalToolsGlobal} tools...`"
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

			<!-- Meta row -->
			<div class="meta-row">
				<span class="search-in-label">Search in:</span>
				<span class="examples-text">
					Examples:
					<span v-for="(item, i) in exampleValues" :key="i">
						<b
							><a class="white--text" @click="inputExample(item.name)">{{
								item.name
							}}</a></b
						>
						<span v-if="i < exampleValues.length - 1">, </span>
					</span>
				</span>
			</div>
			<!-- Chips row -->
			<div class="chips-row" :class="{ 'chips-disabled': !value }">
				<search-categories />
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
			exampleValues: [{ name: 'trimAl' }, { name: 'PyMut' }],
			searchingIn: [0, 1, 2, 3],
		};
	},
	computed: {
		totalToolsGlobal() {
			return this.$store.getters['tool/totalTools'];
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
	min-height: 220px;
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

/* Chips row wrapper */
.chips-row {
	padding-left: 36px;
	transition: opacity 0.25s;
}

.chips-disabled {
	opacity: 0.45;
	pointer-events: none;
}

.search-in-label {
	color: rgba(255, 255, 255, 85%);
	font-size: 12px;
	white-space: nowrap;
}

/* .examples-text {
	color: rgba(255, 255, 255, 65%);
	font-size: 12px;
	text-align: right;
} */

.examples-text {
	color: rgba(255, 255, 255, 65%);
	font-size: 12px;
	text-align: right;
	padding-right: 98px;
	white-space: nowrap;
}

::v-deep .v-breadcrumbs__item {
	color: white !important;
}

::v-deep .v-breadcrumbs__item--disabled {
	color: rgba(255, 255, 255, 60%) !important;
}

/* Row with "Search in:" on left and Examples on right */
.meta-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 45px;
	padding-right: 2px;
	margin-top: 6px;
	margin-bottom: 2px;
}
</style>
