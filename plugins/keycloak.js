import { Oauth2Scheme } from '@nuxtjs/auth-next/dist/runtime';

function encodeQuery(queryObject) {
	return Object.entries(queryObject)
		.filter(([_key, value]) => typeof value !== 'undefined')
		.map(
			([key, value]) =>
				encodeURIComponent(key) +
				(value != null ? '=' + encodeURIComponent(value) : '')
		)
		.join('&');
}

export default class KeycloakScheme extends Oauth2Scheme {
	logout() {
		if (this.options.endpoints.logout) {
			const opts = {
				redirect_uri: this.logoutRedirectURI,
			};
			const url = this.options.endpoints.logout + '?' + encodeQuery(opts);
			window.location.replace(url);
		}
		return this.$auth.reset();
	}
}
