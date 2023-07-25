<template>
	<v-row id="search-container" align="center" justify="center" class="mr-0">
		<v-col cols="10" class="text-center mt-0 mb-0 pb-0">
			<h3 class="text-h5 mt-8">Explore Tools in OpenEBench</h3>
		</v-col>
		<v-col cols="5" class="mt-0 mb-5 pt-0">
			<v-text-field
				v-model="value"
				solo
				hide-details
				class="mb-2"
				@keydown.enter="triggerSearch(value)"
			>
				<template #prepend>
					<v-icon color="white"> mdi-magnify </v-icon>
				</template>
				<template #append-outer>
					<v-btn
						elevation="2"
						color="#021A54"
						dark
						@click="triggerSearch(value)"
					>
						Search
					</v-btn>
				</template>
			</v-text-field>
			<span class="mt-4 pt-4 ml-7 pl-2 text-body-2 white--text">
				Examples:
				<span v-for="(item, i) in exampleValues" :key="i">
					<b
						><a class="white--text" @click="inputExample(item.name)">
							{{ item.name }}
						</a></b
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
	data() {
		return {
			value: '',
			exampleValues: [
				{
					name: 'trimAl',
				},
				{
					name: 'PyMut',
				},
			],
		};
	},
	methods: {
		inputExample(value) {
			this.value = value;
		},
	},
};
</script>
<style scoped>
#search-container {
	background-color: #0b579f !important;
	color: white;
	top: 0;
	left: 0;
	right: 0;
	height: 290px;
	overflow: auto;
}

.v-input >>> v-input__control {
	margin-top: 4px !important;
}
</style>
