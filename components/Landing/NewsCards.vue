<template>
	<v-container class="mt-10">
		<h2 class="text-h4 mb-10">Social Media</h2>

		<v-row>
			<v-col align="center" sm="12" md="4">
				<news-card />
			</v-col>
			<v-col align="center" sm="12" md="4">
				<news-card />
			</v-col>
			<v-col align="center" sm="12" md="4">
				<news-card />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import NewsCard from '~/components/Landing/NewsCard';

export default {
	name: 'NewsCards',
	components: { NewsCard },
};
</script>
