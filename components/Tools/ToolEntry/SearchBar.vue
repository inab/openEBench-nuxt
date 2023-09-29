<template>
	<v-app-bar hide-on-scroll flat fixed>
		<v-row id="search-container" class="mr-0 pr-0 pt-0" justify="space-between">
			<v-col cols="7" class="d-flex align-start" justify="start">
				<breadcrumbs-bar
					v-if="breadcrumbs.length > 0"
					:items="breadcrumbs"
					class-active="{ text-decoration-underline }"
					class="mt-0 pt-3 align-self-start"
				/>
			</v-col>

			<v-col cols="3" class="d-flex align-center text-center mt-0 pt-0">
				<v-text-field
					v-model="value"
					filled
					rounded
					dense
					flat
					hide-details
					class="mt-1 text-body-2"
				>
					<template #prepend>
						<v-icon color="grey"> mdi-magnify </v-icon>
					</template>
				</v-text-field>
			</v-col>
		</v-row>
	</v-app-bar>
</template>
<script>
import BreadcrumbsBar from '~/components/Molecules/BreadcrumbsBar';

export default {
	name: 'SearchBar',
	components: {
		BreadcrumbsBar,
	},
	props: {
		name: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			value: '',
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Tools',
					disabled: false,
					exact: true,
					to: '/tool',
				},
				{
					text: this.name,
					disabled: true,
				},
			],
		};
	},
};
</script>
<style scoped>
#search-container {
	background-color: white !important;
	color: white;
	top: 0;
	left: 0;
	right: 0;
	height: 70px;
}

.v-input >>> v-input__control {
	margin-top: 4px !important;
	height: 20px !important;
}
</style>
