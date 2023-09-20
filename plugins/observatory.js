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
			? 'http://localhost:5300'
			: OBSERVATORY_API_URL
		// ? 'https://e096-84-88-188-229.ngrok-free.app'
		//	: 'https://e096-84-88-188-229.ngrok-free.app'
	);

	// Inject to context as $api
	inject('observatory', observatory);
}
