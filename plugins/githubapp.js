export default function ({ $axios, $config: { _GITHUBAPP_API_URL } }, inject) {
	// Create a custom axios instance
	const githubapp = $axios.create({
		headers: {
			common: {
				Accept: 'text/plain, */*',
			},
		},
	});

	// Set baseURL to something different
	// githubapp.setBaseURL(GITHUBAPP_API_URL);
	// githubapp.setBaseURL('http://localhost:3500');
	githubapp.setBaseURL(
		'https://dev-observatory.openebench.bsc.es/githubapp/api'
	);

	// Inject to context as $api
	inject('githubapp', githubapp);
}
