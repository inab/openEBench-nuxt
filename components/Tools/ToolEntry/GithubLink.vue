<template>
	<div class="mb-2 mt-1">
		<span>
			<v-icon color="grey" medium> mdi-github </v-icon>
			<a :href="link" class="text-body-2">
				{{ link }}
			</a>
		</span>
	</div>
</template>
<script>
export default {
	name: 'GithubLink',
	props: {
		link: {
			type: String,
			required: true,
		},
	},
};
</script>
