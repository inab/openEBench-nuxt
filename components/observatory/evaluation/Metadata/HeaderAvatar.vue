<template>
	<v-avatar size="30" class="mr-0">
		<v-tooltip bottom :disabled="disabled_tooltip">
			<template #activator="{ on, attrs }">
				<v-icon
					v-if="metaState"
					dense
					v-bind="attrs"
					color="green lighten-2"
					v-on="on"
				>
					mdi-check-circle
				</v-icon>
				<v-icon v-else dense v-bind="attrs" color="grey lighten-1" v-on="on">
					mdi-minus-circle
				</v-icon>
			</template>
			<span>{{ field_name }}</span>
		</v-tooltip>
	</v-avatar>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'HeaderAvatar',
	props: {
		field: {
			type: String,
			required: true,
		},
		field_name: {
			type: String,
			required: true,
		},
		disabled_tooltip: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	data() {
		return {
			model: '',
		};
	},

	computed: {
		...mapGetters({
			toolMetadata: 'observatory/evaluation/metadata/getToolMetadata',
		}),

		metaState() {
			return this.getMetadataState(this.field);
		},
	},
	methods: {
		getMetadataState(field) {
			let state = false;
			switch (typeof this.toolMetadata[field]) {
				case 'boolean': {
					state = this.toolMetadata[field];
					break;
				}

				case 'string': {
					state = this.toolMetadata[field];
					break;
				}

				case 'object': {
					const array = Array.isArray(this.toolMetadata[field]);
					if (array) {
						if (this.toolMetadata[field].length > 0) {
							state = !!this.toolMetadata[field][0];
						} else {
							state = false;
						}
					} else {
						console.log(
							'Unknown type of field',
							field,
							typeof this.toolMetadata[field],
							this.toolMetadata[field]
						);
					}
					break;
				}

				default:
					console.log(
						'Unknown type of field',
						field,
						typeof this.toolMetadata[field],
						this.toolMetadata[field]
					);
			}

			return state;
		},
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
