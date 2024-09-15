<template>
	<div class="content-container">
		<v-container class="full-height">
			<v-row class="full-height" justify="center">
				<v-col class="full-height" md="10" sm="12" xs="12">
					<v-skeleton-loader v-if="isLoading" class="my-5" type="card-avatar" />
					<slot></slot>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	props: {
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style scoped>
.full-height {
	height: 100%;
}

.content-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	overflow: hidden;
}
</style>
