export default function (
	{ $axios, $config: { SCIENTIFIC_SERVICE_URL }, app },
	inject
) {
	// Create a custom axios instance
	const graphql = $axios.create({
		withCredentials: true,
		headers: {
			common: {
				Accept: 'application/json',
			},
		},
	});

	// Here is the magic, onRequest is an interceptor, so every request made will go trough this, and then we try to access app.$auth inside it, it is defined
	graphql.onRequest(() => {
		// Here we check if user is logged in
		if (app.$auth.loggedIn) {
			// If the user is logged in, we can now get the token
			const token = app.$auth.strategy.token.get();
			// And set it to the Authorization header
			graphql.setToken(token);
		}
	});

	// Set baseURL to something different
	graphql.setBaseURL(SCIENTIFIC_SERVICE_URL);

	// Inject to context as $api
	inject('graphql', graphql);
}
