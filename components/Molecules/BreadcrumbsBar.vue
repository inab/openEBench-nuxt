<template>
	<v-breadcrumbs v-bind="$attrs" class="hidden-xs-only" :items="$attrs.items">
		<template #divider> <v-icon>mdi-chevron-right</v-icon> </template>
		<!--The following slot allow to customize the class of items-->
		<!--The classes are passed as props (classDisabled, classActive)-->
		<template #item="{ item }">
			<v-breadcrumbs-item
				v-if="item.disabled"
				:class="colorClass"
				:href="item.to"
				:disabled="item.disabled"
			>
				<span :class="classDisabled">{{ item.text }}</span>
			</v-breadcrumbs-item>
			<v-breadcrumbs-item
				v-else
				:class="colorClass"
				:href="item.to"
				:disabled="item.disabled"
			>
				<span :class="classActive">{{ item.text }}</span>
			</v-breadcrumbs-item>
		</template>
	</v-breadcrumbs>
</template>
<script>
export default {
	name: 'BreadcrumbsBar',
	props: {
		classDisabled: {
			type: String,
			default: '',
			required: false,
			// example: '{ white--text }',
		},
		classActive: {
			type: String,
			default: '',
			required: false,
			// example: '{ white--text text-decoration-underline }',
		},
	},
};
</script>
