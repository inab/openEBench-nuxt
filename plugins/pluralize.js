import Vue from 'vue';
import pluralize from 'pluralize';

export default () => {
	Vue.filter('pluralize', function (value, number) {
		return pluralize(value, number);
	});
};
