<template>
	<v-container>
		<h2 class="text-h4 mb-10">What's new?</h2>

		<v-row>
			<v-col
				v-for="(item, index) in blogData"
				:key="index"
				align="center"
				sm="12"
				md="3"
			>
				<news-card
					:title="item.title"
					:desc="item.desc"
					img="https://source.unsplash.com/random"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import NewsCard from '~/components/Landing/NewsCard';

export default {
	name: 'NewsCards',
	components: { NewsCard },
	data() {
		return {
			blogData: [
				{
					title: 'Heading',
					desc: 'This is a media card. You can use this section to describe the content.',
				},
				{
					title: 'Heading',
					desc: 'This is a media card. You can use this section to describe the content.',
				},
				{
					title: 'Heading',
					desc: 'This is a media card. You can use this section to describe the content.',
				},
				{
					title: 'Heading',
					desc: 'This is a media card. You can use this section to describe the content.',
				},
			],
		};
	},
};
</script>
