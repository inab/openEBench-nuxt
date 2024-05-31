// almacenamiento central de vuex
export const state = () => ({
	_tab: 'Trends',
	_window: {
		width: 0,
	},
	_currentCollection: 'tools',
	_uniqueCollection: null,
	_collections: [
		{
			id: 'RIS3CAT VEIS',
			title: 'VEIS',
			subtitle: 'Value of the EGA for Industry and Society',
			description:
				'The RIS3CAT VEIS project will create an open ecosystem of technologies that covers and adapts to the needs of analysis and interpretation of omic and clinical data in research and application environments in biomedicine, through the database EGA.',
			homepage: 'https://veis.bsc.es/',
			image: 'Logo_VEIS_Corto.png',
		},
		{
			id: 'ELIXIR-ES',
			title: 'ELIXIR-ES',
			subtitle: 'ELIXIR Spain - INB',
			description:
				'The Spanish National Bioinformatics Institute (‘Instituto Nacional de Bioinformática’ in Spanish, INB) is composed of 19 computational biology groups that comprise a virtual institute. It started operating in 2003 and its more than 40 employees are funded by the National Health Institute Carlos III (ISCIII).',
			homepage: 'https://elixir-europe.org/about-us/who-we-are/nodes/spain',
			image: 'Logo_ELIXIR_ES.png',
		},
		{
			id: 'IMPaCT-Data',
			title: 'IMPaCT-Data',
			subtitle:
				'Integrated Multi-scale Platform for Computational Toxicology Data',
			description:
				'The Spanish Precision Medicine Infrastructure associated with Science and Technology (IMPaCT), aims to impulse precision medicine within the Spanish National Health System. IMPaCT-Data, the Data Science pillar of this infrastructure, has been tasked to design, deploy and extend a Biomedical Cloud taking as reference similar efforts across Europe.',
			homepage: 'https://impact-data.bsc.es/',
			image: 'Logo_IMPaCT-Data-Vertical.png',
		},
		{
			id: 'PerMedCoE',
			title: 'PerMedCoE',
			subtitle:
				'HPC/Exascale Centre of Excellence for Personalised Medicine in Europe',
			description:
				'The goal of PerMedCoE is to provide an efficient and sustainable entry point to the HPC/Exascale-upgraded methodology to translate omics analyses into actionable models of cellular functions of medical relevance.',
			homepage: 'https://www.permedcoe.eu/',
			image: 'Logo_PerMedCoE.jpeg',
		},
		{
			id: 'BioExcel',
			title: 'BioExcel',
			subtitle: 'Centre of Excellence for Computational Biomolecular Research',
			description:
				'BioExcel is a Centre of Excellence for Computational Biomolecular Research set up to support academia and industry in the use of high-end computing in biomolecular research.',
			homepage: 'https://bioexcel.eu/',
			image: 'Logo_bioexcel.png',
		},
		{
			id: '3D-BioInfo',
			title: '3D-BioInfo',
			subtitle: 'ELIXIR 3D-Bioinfo Community',
			description:
				'Structural bioinformatics provides methods and tools to analyse, predict, archive and validate the three-dimensional (3D) structure data of biomacromolecules such as proteins, RNA or DNA.',
			homepage: 'https://elixir-europe.org/communities/3d-bioinfo',
			image: 'Logo_3D-Bioinfo.png',
		},
		{
			id: 'eucaim',
			title: 'EUCAIM',
			subtitle: 'EUropean Federation for CAncer IMages',
			description:
				'The EUCAIM project will not build a new infrastructure from scratch, but will deliver an integrated architecture carefully designed by the AI4HI Network, and major European Research Infrastructures (Euro-BioImaging, BBMRI, EATRIS and ELIXIR) on real-world achievements. The main concept of EUCAIM is of a central hub that federates distributed nodes (repositories, Research Infrastructures, and hospitals) to build up a hybrid distributed and centralised infrastructure of cancer images, including all types of cancer.',
			homepage: 'https://www.eibir.org/projects/eucaim/',
			image: 'Logo_EUCAIM.png',
		},
	],
});

// Accesores o getters
// accesores para coger datos desde los componentes
// Normalmente se llaman desde las popriedades computed de los componentes

export const getters = {
	getActiveTab(state) {
		return state._tab;
	},
	getWindow(state) {
		return state._window;
	},
	getCurrentCollection(state) {
		return state._currentCollection;
	},
	getUniqueCollection(state) {
		return state._uniqueCollection;
	},
	getCollections(state) {
		return state._collections;
	},
};

// Acciones - Metodos publicos
// Estas funciones sirven para llamar a las mutaciones desde los componentes
// A diferencia de las mutaciones, pueden ser asincronas (llamadas APIs)
// Pueden tener algo de business logic y pueden llamar a varias mutaciones
export const actions = {
	/**
	 * Esta funci'on se ejecuta al inicializarse la app
	 * @param {*} vuexContext commit, dispatch, state
	 * @param {*} context es el mismo de asyncData y aqui tenemos acceso a toda la app: app. $axios, env, ...
	 */

	async nuxtServerInit({ _dispatch }, _context) {},

	changeTab(vuexContext, payload) {
		vuexContext.commit('mutateTab', payload);
	},

	changeWindowWidth(vuexContext, payload) {
		vuexContext.commit('setWindowWidth', payload);
	},

	async changeCurrentCollection({ commit }, collection) {
		await commit('setCurrentCollection', collection);
	},

	changeUniqueCollection({ state, commit }, collection) {
		//
		const uniqueCollectionObject = state._collections.find(
			(element) => element.id === collection
		);

		commit('setUniqueCollection', uniqueCollectionObject, collection);
		commit('setCurrentCollection', collection);
	},
};
// Mutations

export const mutations = {
	mutateTab(state, payload) {
		state._tab = payload.key;
	},

	setWindowWidth(state, payload) {
		state._window.width = payload;
	},
	setCurrentCollection(state, collection) {
		state._currentCollection = collection;
	},
	setUniqueCollection(state, collectionObject, collection) {
		// uniqueCollection is just the id of the collection
		state._uniqueCollection = collection;
		// collections is the object with all the info. In this case, only one item
		state._collections = [collectionObject];
	},
};
