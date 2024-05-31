<template>
	<v-container>
		<p class="text--secondary mt-6 mb-2 ml-8 pt-1 caption">
			<v-icon small color="#001752f8"> mdi-arrow-left-bold-box </v-icon>
			<span class="highlight">
				<i>FAIRsoft</i> scores for {{ toolLabel }}.
			</span>

			<span>
				<br />An explanation on how they are calculated can be found
				<a href="https://evamart.github.io/mkdocs-template">here</a>
			</span>
		</p>
		<p class="text--secondary mt-2 mb-2 ml-8 pt-1 caption">
			<v-icon small color="#001752f8"> mdi-arrow-down-bold-box </v-icon>
			<span class="highlight">
				<i>FAIRsoft</i> indicators fullfilments for {{ toolLabel }}.
			</span>
		</p>
	</v-container>
</template>
<script>
export default {
	name: 'CardCaptions',
	props: {
		toolLabel: {
			type: String,
			required: true,
		},
	},
};
</script>
