export default function ({ $axios, $config: { GITHUBAPP_API_URL } }, inject) {
	// Create a custom axios instance
	const githubapp = $axios.create({
		headers: {
			common: {
				Accept: 'text/plain, */*',
			},
		},
	});

	// Set baseURL to something different
	githubapp.setBaseURL(GITHUBAPP_API_URL);

	// Inject to context as $api
	inject('githubapp', githubapp);
}