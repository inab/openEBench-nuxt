<template>
	<v-card class="d-flex flex-column">
		<v-img :src="img" contain max-height="120" height="120" />
		<v-card-title class="justify-center text-truncate inline-flex">
			{{ name }}
		</v-card-title>
		<v-card-subtitle class="text-left">
			<span class="caption text--muted">
				{{ desc }}
			</span>
		</v-card-subtitle>
		<v-card-actions class="mt-auto">
			<v-btn text color="primary" :to="to"> Open Community </v-btn>
			<v-spacer />
			<v-menu bottom left>
				<template #activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
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
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		links: {
			type: Array,
			required: true,
		},
	},
	computed: {
		linksFiltered() {
			return this.links.filter((link) => link.comment !== '@logo');
		},
		to() {
			return 'communities/' + this.id;
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
