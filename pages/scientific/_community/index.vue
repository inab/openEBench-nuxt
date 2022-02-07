<template>
	<v-container>
		<h1 class="text-h4 mb-15 mt-10">
			Community - {{ $route.params.community }}
		</h1>
		<v-expansion-panels accordion mandatory>
			<v-expansion-panel v-for="(event, index) in events" :key="index">
				<v-expansion-panel-header>
					<v-row no-gutters>
						<v-col cols="8">
							{{ event.name }}
						</v-col>
						<v-col cols="4" class="text--secondary">
							{{ event.challenges.length }}
							{{ 'Challenges' | pluralize(event.challenges.length) }}
						</v-col>
					</v-row>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<community-classification-table
						:key="index + '_table'"
						:headers="headers"
						:event="event"
					/>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import CommunityClassificationTable from '~/components/Communities/CommunityClassificationTable';

export default {
	name: 'CommunityPage',
	components: { CommunityClassificationTable },
	data() {
		return {
			headers: [
				{
					text: 'Acronym',
					align: 'start',
					value: 'acronym',
				},
				{ text: 'Name', value: 'name' },
			],
			drawer: true,
			mini: false,
		};
	},
	computed: {
		...mapGetters('community', {
			events: 'events',
		}),
	},
	mounted() {
		this.$store.dispatch('community/getBenchmarkingEvents', {
			id: this.$route.params.community,
		});
	},
};
</script>
