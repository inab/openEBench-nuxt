<template>
	<v-card class="d-flex flex-column">
		<div class="pa-5">
			<v-img :src="logo" contain max-height="100" height="100" />
		</div>
		<v-card-title class="justify-center text-truncate inline-flex">
			{{ acronym }}
		</v-card-title>
		<v-card-subtitle class="text-left">
			<span class="caption text--muted">
				{{ name }}
			</span>
		</v-card-subtitle>
		<v-card-text align="bottom" class="mt-auto">
			<v-chip small :color="statusChipColor" :text-color="statusChipTextColor">
				{{ status }}
			</v-chip>
		</v-card-text>
		<v-card-actions>
			<v-btn text color="primary" :to="to"> Open </v-btn>
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
	},
	computed: {
		linksFiltered() {
			return this.links.filter((link) => link.comment !== '@logo');
		},
		to() {
			return 'communities/' + this._id;
		},
		statusChipColor() {
			switch (this.status) {
				case 'active':
					return 'success';
				default:
					return '';
			}
		},
		statusChipTextColor() {
			switch (this.status) {
				case 'active':
					return 'white';
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
