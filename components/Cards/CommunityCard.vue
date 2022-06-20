<template>
	<v-card class="d-flex flex-column">
		<div class="pa-5">
			<nuxt-link :to="to" :aria-label="name">
				<v-img :src="logo" contain max-height="100" height="100" />
			</nuxt-link>
		</div>
		<v-card-title class="justify-center text-truncate inline-flex">
			{{ acronym }}
		</v-card-title>
		<v-card-subtitle class="text-left">
			<span class="text--primary">
				{{ name }}
			</span>
		</v-card-subtitle>
		<v-card-text align="bottom" class="mt-auto">
			<v-chip
				v-if="benchmarkingEvents.length > 0"
				small
				color="primary lighten-5"
				text-color="black"
				:to="to + '/events'"
			>
				<v-icon small class="mr-1">mdi-calendar-star</v-icon>
				{{ benchmarkingEvents.length }}
				{{ 'Events' | pluralize(benchmarkingEvents.length) }}
			</v-chip>
			<v-chip
				v-if="referenceTools.length > 0"
				small
				color="primary lighten-5"
				text-color="black"
			>
				<v-icon small class="mr-1">mdi-tire</v-icon>
				{{ referenceTools.length }}
				{{ 'Tools' | pluralize(referenceTools.length) }}
			</v-chip>
			<v-chip small :color="statusChipColor" :text-color="statusChipTextColor">
				{{ status }}
			</v-chip>
		</v-card-text>
		<v-card-actions>
			<v-btn text color="primary" :to="to"> Current Event </v-btn>
			<v-spacer />
			<v-menu v-if="links.length > 0" bottom left>
				<template #activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" aria-label="Expand sub menu" v-on="on">
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="(link, i) in linksFiltered"
						:key="i"
						:href="link.uri"
						target="_blank"
					>
						{{ link.label }}
						<v-spacer />
						<v-icon small right>mdi-open-in-new</v-icon>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: {
		// eslint-disable-next-line vue/prop-name-casing
		_id: {
			type: String,
			required: true,
		},
		acronym: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		logo: {
			type: String,
			required: true,
		},
		links: {
			type: Array,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		benchmarkingEvents: {
			type: Array,
			required: true,
		},
		referenceTools: {
			type: Array,
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
	},
	computed: {
		linksFiltered() {
			return this.links.filter((link) => link.comment !== '@logo');
		},
		statusChipColor() {
			switch (this.status) {
				case 'active':
					return 'light-green lighten-4';
				case 'incubating':
					return 'cyan lighten-4';
				default:
					return '';
			}
		},
		statusChipTextColor() {
			switch (this.status) {
				case 'active':
					return 'black';
				case 'incubating':
					return 'black';
				default:
					return '';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.v-card__title {
	background-color: var(--v-primary-lighten5);
}
.v-card__title + .v-card__subtitle {
	margin-top: 16px;
}
</style>
