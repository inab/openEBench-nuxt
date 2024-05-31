import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import createCache from 'vuex-cache';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export const namespaced = true;

export const plugins = [createCache()];
