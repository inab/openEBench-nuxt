export default function (
	{ $axios, $config: { SCIENTIFIC_SERVICE_URL } },
	inject
) {
	// Create a custom axios instance
	const graphql = $axios.create({
		headers: {
			common: {
				Accept: 'text/plain, */*',
			},
		},
	});

	// Set baseURL to something different
	graphql.setBaseURL(SCIENTIFIC_SERVICE_URL);

	// Inject to context as $api
	inject('graphql', graphql);
}
