<template>
	<v-chip :small="!big" label text-color="#F48F43" color="#F48F43" outlined>
		{{ text }}
	</v-chip>
</template>
<script>
import { getSoftwareTypeDescription } from '~/static/dictionaries/softwareTypes';
export default {
	name: 'ChipType',
	props: {
		type: {
			type: String,
			required: true,
		},
		big: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			text: getSoftwareTypeDescription(this.type),
		};
	},
};
</script>
