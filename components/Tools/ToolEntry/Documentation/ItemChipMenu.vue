<template>
	<v-chip
		class="ml-3 mr-2 pr-0 mt-0"
		:color="color"
		:text-color="textColor"
		label
	>
		<span class="text-body-2 font-weight-medium">{{ text }}</span>
		<v-menu offset-x offset-y right>
			<template #activator="{ on, attrs }">
				<v-btn :color="textColor" icon v-bind="attrs" v-on="on">
					<v-icon small>mdi-dots-vertical</v-icon>
				</v-btn>
			</template>

			<v-list dense>
				<v-list-item v-for="(item, i) in items" :key="i" @click="item.action">
					<v-list-item-icon class="mr-1">
						<v-icon small>{{ item.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content class="text-body-2">{{
						item.text
					}}</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-chip>
</template>
<script>
export default {
	name: 'ItemChipMenu',
	props: {
		text: {
			type: String,
			required: true,
		},
		edamId: {
			type: String,
			required: true,
			default: 'topic_0160',
		},
		color: {
			type: String,
			required: true,
			default: 'green lighten-4',
		},
		textColor: {
			type: String,
			required: true,
			default: '#F48F43',
		},
	},
	data() {
		return {
			items: [
				{
					text: 'Explore relationships',
					icon: 'mdi-file-tree',
					action: this.exploreRelationships,
				},
				{
					text: 'See details',
					icon: 'mdi-open-in-new',
					action: this.seeDetails,
				},
			],
		};
	},
	methods: {
		exploreRelationships() {
			console.log('Explore relationships');
		},
		seeDetails() {
			// open EDAM page of edam_id in new tab
			window.open(`${this.edamId}`, '_blank');
		},
	},
};
</script>
