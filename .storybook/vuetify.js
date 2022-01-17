import Vue from 'vue';
import Vuetify from 'vuetify';
import theme from '../config/vuetify.options.js';
import LRU from 'lru-cache';

const themeCache = new LRU({
	max: 10,
	maxAge: 1000 * 60 * 60, // 1 hour
});

Vue.use(Vuetify);

export default new Vuetify({
	...theme,
});
