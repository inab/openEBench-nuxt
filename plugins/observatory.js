export default function ({ $axios, $config: { OBSERVATORY_API_URL } }, inject) {
	// Create a custom axios instance
	const observatory = $axios.create({
		headers: {
			common: {
				Accept: 'text/plain, */*',
			},
		},
	});

	// Set baseURL to something different
	observatory.setBaseURL(
		process.env.NODE_ENV !== 'production'
			? // 'http://localhost:3500'
			  'https://observatory-dev.openebench.bsc.es/api'
			: OBSERVATORY_API_URL
	);

	// Inject to context as $api
	inject('observatory', observatory);
}
