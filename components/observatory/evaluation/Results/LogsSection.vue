<template>
	<v-row>
		<v-col md="12" lg="12">
			<small>
				<!-- Display the logs with styling applied -->
				<pre
					class="block language-html ml-3 pt-4 pb-0 pr-8 pl-5">{{ buildText(categorizedLogs.generic) }}<br><strong >Result: </strong>{{ buildText(categorizedLogs.result) }}
				</pre>
			</small>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'LogsSection',
	props: {
		logs: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			categorizedLogs: {
				generic: [],
				result: [],
				status: [],
			},
		};
	},

	watch: {
		logs: {
			handler(newLogs) {
				this.categorizedLogs = this.categorizeLogs(newLogs);
			},
			immediate: true,
		},
	},

	methods: {
		buildText(logs) {
			const text = logs.join('\n');
			if (text === '') {
				return 'No logs available';
			}
			return text;
		},
		categorizeLogs(logs) {
			const categorizedLogs = {
				generic: [],
				result: [],
				status: [],
			};

			logs.forEach((log) => {
				if (log.includes('Result:')) {
					categorizedLogs.result.push(log.replace('Result:', '').trim());
				} else if (log.includes('Status:')) {
					categorizedLogs.status.push(log.replace('Status:', '').trim());
				} else {
					categorizedLogs.generic.push(log.trim());
				}
			});

			return categorizedLogs;
		},
	},
};
</script>
