// mixins/sharedMethodsMixin.js
export default {
	methods: {
		getItemColor(role) {
			const item = this.items.find((item) => item.word === role);
			return item ? item.color : '#ffffff';
		},
		getItemIcon(role) {
			const item = this.items.find((item) => item.word === role);
			return item ? `url(${item.icon})` : '';
		},
		formatRoleName(name) {
			// Check if the role name contains parentheses
			const index = name.indexOf('(');
			if (index !== -1) {
				const firstPart = name.substring(0, index).trim();
				const secondPart = name.substring(index).trim();
				return `${firstPart}\n${secondPart}`;
			}
			return name;
		},
		toggleRole(role) {
			role.hover = !role.hover;
		},
		formatDate(dateString) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(dateString).toLocaleDateString(undefined, options);
		},
	},
};
