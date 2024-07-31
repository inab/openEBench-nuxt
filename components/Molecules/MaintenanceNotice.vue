<template>
	<div v-if="isMissageVisible" class="maintenance-notice">
		<div class="maintenance-notice__box">
			<v-icon right color="primary">mdi-alert</v-icon>
			Please be aware that we will be performing routine server maintenance from
			<b>August 5th to 7th</b>. <br />During this period, you may experience
			temporary disruptions. We apologize for any inconvenience and appreciate
			your understanding.
		</div>
	</div>
</template>
<script>
export default {
	name: 'MaintenanceNotice',
	computed: {
		isMissageVisible() {
			const dateRange = {
				start: new Date('2024-07-31'),
				end: new Date('2024-08-07'),
			};

			if (new Date() >= dateRange.start && new Date() <= dateRange.end) {
				return true;
			}
			return false;
		},
	},
};
</script>
<style scoped>
.maintenance-notice {
	padding: 50px 30px 0;
}

.maintenance-notice__box {
	background-color: #f8f8f8;
	border: 1px solid #c6d8e9;
	border-radius: 5px;
	padding: 20px;
}
</style>
