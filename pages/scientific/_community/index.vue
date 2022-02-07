<template>
	<v-row>
		<v-col cols="2">
			<v-card class="mt-10 ml-5" :elevation="cardElevation">
				<v-navigation-drawer
					v-model="drawer"
					floating
					permanent
					:mini-variant.sync="mini"
				>
					<v-list dense>
						<v-list-item link>
							<v-list-item-icon>
								<v-icon>mdi-view-dashboard</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Results</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item link>
							<v-list-item-icon>
								<v-icon>mdi-folder</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Datasets</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item link>
							<v-list-item-icon>
								<v-icon>mdi-cube-outline</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Participants</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-navigation-drawer>
			</v-card>
		</v-col>
		<v-col cols="10">
			<h1 class="text-h4 mb-5 mt-10">
				Community - {{ $route.params.community }}
			</h1>
			<v-expansion-panels accordion mandatory>
				<v-expansion-panel
					v-for="(event, index) in events"
					:key="index"
					class="mr-5"
				>
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
		</v-col>
	</v-row>
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
		};
	},
	computed: {
		...mapGetters('community', {
			events: 'events',
		}),
		mini() {
			return this.$vuetify.breakpoint.mdAndDown;
		},
		cardElevation() {
			return this.$vuetify.breakpoint.mdAndDown ? '0' : '2';
		},
	},
	mounted() {
		this.$store.dispatch('community/getBenchmarkingEvents', {
			id: this.$route.params.community,
		});
	},
};
</script>
