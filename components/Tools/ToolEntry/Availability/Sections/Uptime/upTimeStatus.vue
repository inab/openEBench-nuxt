<template>
	<v-row>
		<v-col cols="4" class="d-flex justify-left align-center">
			<div class="status-title mr-1">
				CURRENT <br />
				STATUS
			</div>
			<div class="status-text">{{ status }}</div>
		</v-col>
		<v-col cols="4" class="d-flex justify-left align-center">
			<div class="status-title mr-1">
				DAYS <br />
				{{ status }}
			</div>
			<div class="status-text">{{ time }}</div>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: 'UpTimeStatus',
	components: {},
	props: {
		status: {
			type: String,
			default: 'UP',
		},
		time: {
			type: Number,
			default: 23,
		},
	},
};
</script>
<style scoped>
.status-title {
	font-size: 12px;
	font-weight: regular;
	line-height: normal;
}

.status-text {
	font-size: 30px;
	font-weight: medium;
}
</style>
