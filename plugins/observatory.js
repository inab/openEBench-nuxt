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
	// observatory.setBaseURL('http://localhost:3500');
	observatory.setBaseURL('https://observatory.openebench.bsc.es/api/');

	// Inject to context as $api
	inject('observatory', observatory);
}
