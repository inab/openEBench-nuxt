<template>
	<v-row class="ml-1 mt-1 mb-1" justify="space-between">
		<span class="text-h5 title"> {{ title }}</span>
		<div v-if="visible_ticks" class="align-self-center text-right mr-6">
			<HeaderAvatar
				v-for="(item, index) in fields"
				:key="index"
				:field="item"
				:field_name="field_names[index]"
			/>
		</div>
	</v-row>
</template>
<script>
import HeaderAvatar from './HeaderAvatar.vue';

export default {
	name: 'PanelHeader',
	components: {
		HeaderAvatar,
	},
	props: ['fields', 'title', 'field_names', 'visible_ticks'],
	data() {
		return {
			model: '',
		};
	},
};
</script>
<style scoped>
.title {
	font-weight: 500;
	font-size: 1rem !important;
}

.overlay {
	position: absolute;
}
</style>
