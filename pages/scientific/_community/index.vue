<template>
	<v-container>
		<h1 class="text-h3">Community - {{ $route.params.community }}</h1>
		<div v-for="(event, index) in events" :key="index">
			<h2 class="text-h4">Event - {{ event.name }}</h2>
			<classification-table :id="event._id" :key="event._id" />
		</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ClassificationTable from '~/components/Widgets/ClassificationTableWrapper';

export default {
	name: 'CommunityPage',
	components: { ClassificationTable },
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
