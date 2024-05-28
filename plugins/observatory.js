export default function (
	{ $axios, $config: { _OBSERVATORY_API_URL } },
	inject
) {
	// Create a custom axios instance
	const observatory = $axios.create({
		headers: {
			common: {
				Accept: 'text/plain, */*',
			},
		},
	});

	// Set baseURL to something different
	observatory.setBaseURL(OBSERVATORY_API_URL);
	// observatory.setBaseURL('http://127.0.0.1:3500');

	// Inject to context as $api
	inject('observatory', observatory);
}
