// mixins/sharedMethodsMixin.js
export default {
	methods: {
		formatDate(dateString) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(dateString).toLocaleDateString('en-US', options);
		},
	},
};
