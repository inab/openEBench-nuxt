<template>
	<v-dialog v-model="show" max-width="500px">
		<v-card>
			<v-card-text>
				<h3>Hola!</h3>
				<v-card-actions>
					<v-btn color="primary" @click.stop="show = false">Close</v-btn>
				</v-card-actions>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'IntranetMetricsPage',
	props: {
		value: Boolean,
	},
	computed: {
		show: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit('input', value);
			},
		},
	},
};
</script>
