export default {
	state: () => {
		return {
			list: [
				{
					_id: '1',
					name: 'The HPC/Exascale Centre of Excellence for Personalised Medicine in Europe',
					acronym: 'PerMedCoE',
					description:
						'Personalised Medicine (PerMed) opens unexplored frontiers to treat diseases at the individual level combining clinical and omics information. However, the performances of the current simulation software are still insufficient to tackle medical problems such as tumour evolution or patient-specific treatments. The challenge is to develop a sustainable roadmap to scale-up the essential software for the cell-level simulation to the new European HPC/Exascale systems. Simulation of cellular mechanistic models are essential for the translation of omic data to medical relevant actions and these should be accessible to the end-users in the appropriate environment of the PerMed-specific big confidential data. The goal of PerMedCoE is to provide an efficient and sustainable entry point to the HPC/Exascale-upgraded methodology to translate omics analyses into actionable models of cellular functions of medical relevance.',
					status: 'incubating',
					links: [],
					benchmarkingEvents: [],
					logo: '/images/partners/permedcoe.png',
				},
			],
			loading: false,
		};
	},

	actions: {},

	mutations: {
		setLoading(state, loading) {
			state.loading = loading;
		},
	},

	getters: {
		projectsList: (state) => state.list,
		currentProject: (state) => state.list[0],
	},
};
