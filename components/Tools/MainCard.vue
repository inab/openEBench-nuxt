<template>
	<v-row
		id="search-container"
		align="center"
		justify="center"
		class="mr-0 ml-0"
	>
		<!-- Breadcrumbs inside the hero -->
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

		<v-col cols="12" md="6" lg="5" class="mt-0 mb-5 pt-0">
			<div class="search-wrapper mb-2">
				<div class="search-field">
					<v-icon color="grey darken-1" class="search-icon">mdi-magnify</v-icon>
					<input
						v-model="value"
						class="search-input"
						type="text"
						placeholder="Search tools..."
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
				<v-btn
					elevation="2"
					color="#F48633"
					dark
					class="search-btn"
					@click="triggerSearch(value)"
				>
					Search
				</v-btn>
			</div>
			<span class="mt-2 ml-2 text-body-2 white--text examples-text">
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
		</v-col>
	</v-row>
</template>

<script>
import { SearchTools } from '~/mixins/SearchTools';
export default {
	name: 'MainCard',
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
		};
	},
	computed: {
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

/* Wrapper aligns search field + button side by side at same height */
.search-wrapper {
	display: flex;
	align-items: stretch;
	gap: 8px;
	height: 48px;
}

/* White pill that mimics v-text-field solo */
.search-field {
	flex: 1;
	display: flex;
	align-items: center;
	background: white;
	border-radius: 4px;
	padding: 0 12px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 15%);
}

.search-icon {
	flex-shrink: 0;
	margin-right: 8px;
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

/* Force v-btn to match the 48px height */
.search-btn {
	height: 48px !important;
	align-self: stretch;
}

.examples-text {
	display: block;
}

::v-deep .v-breadcrumbs__item {
	color: white !important;
}

::v-deep .v-breadcrumbs__item--disabled {
	color: rgba(255, 255, 255, 60%) !important;
}
</style>
