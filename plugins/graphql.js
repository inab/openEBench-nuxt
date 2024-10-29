export default function (
	{ $axios, $config: { SCIENTIFIC_SERVICE_URL } },
	inject
) {
	// Create a custom axios instance
	const graphql = $axios.create({
		headers: {
			common: {
				Accept: 'application/json', // Cambiar a application/json si el servidor lo espera
				'Content-Type': 'application/json', // Establecer el tipo de contenido como JSON
			},
		},
		timeout: 5000,
	});

	// Set baseURL to something different
	graphql.setBaseURL(SCIENTIFIC_SERVICE_URL);

	// Inject to context as $api
	inject('graphql', graphql);
}
