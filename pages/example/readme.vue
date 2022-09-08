<template>
	<v-container fluid>
		<v-container>
			<!-- EXPLANATION -->

			<h1 class="text-h3 mt-10">{{ community_id }} Community</h1>
			<p class="text-body-2 text--secondary d-flex align-center mt-3">
				In order to obtain metadata about a community from the store, we need
				its id. In this case, we statically get the community "OEBC002".
			</p>
			<p class="text-body-2 text--secondary d-flex align-center mt-3">
				In the actual OEB code, the id is taken from route
				<code> this.$route.params.community </code>
			</p>
			<p class="text-body-2 text--secondary d-flex align-center mt-3">
				To initially get the community into the store:
			</p>
			<small>
				<pre>
				mounted() {
					this.$store.dispatch('community/getCommunity', {
					id: this.community_id,
					});
				}
				</pre
				>
			</small>
			<p class="text-body-2 text--secondary d-flex align-center mt-3">
				This function, "getCommunity", is an action you can inspect in
				'/store/community.js'. It calls the API and then sets the 'community',
				'events', 'datesets' and 'tools' of that community. All these can then
				be accessed using a getter. In this example, we get them like this:
			</p>
			<small>
				<pre>
				computed: {
					...mapGetters('community', {
						events: 'events',
						community: 'community',
						communityReferences: 'communityReferences',
					}),
				},
				</pre
				>
			</small>
			<p class="text-body-2 text--secondary d-flex align-center mt-3">
				To access these data in the template, we do it directly. 'events', for
				instance, are iterated over in the following loop. For each event, the
				name is shown as title and its challenges are displayed in cards.
			</p>
		</v-container>
	</v-container>
</template>
<script>
export default {
	name: 'ExampleOfPageWithChallenges',
	data() {
		return {
			community_id: 'OEBC002',
		};
	},
};
</script>
