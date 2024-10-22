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
	// githubapp.setBaseURL('https://observatory-dev.openebench.bsc.es/github-metadata-api');
	githubapp.setBaseURL('http://localhost:3800');

	// githubapp.setBaseURL(GITHUBAPP_API_URL);

	// Inject to context as $api
	inject('githubapp', githubapp);
}
