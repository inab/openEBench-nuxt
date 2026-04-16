// Displayed in Header and Footer

const subMenuEntriesObservatory = [
	{
		title: 'Overview',
		title_hide: 'Overview',
		to: '/observatory',
		exact: true,
		icon: 'mdi-view-dashboard-outline',
	},
	{
		title: 'Trends',
		title_hide: 'Trends',
		to: '/observatory/Trends',
		icon: 'mdi-trending-up',
	},
	{
		title: 'FAIRness Scoreboard',
		title_hide: 'FAIRness Scoreboard',
		to: '/observatory/FAIRness',
		icon: 'mdi-chart-box-outline',
	},
	{
		title: 'FAIRsoft Evaluator',
		title_hide: 'FAIRsoft Evaluator',
		to: '/observatory/Evaluation',
		icon: 'mdi-flask-outline',
	},
	{
		title: 'Data',
		title_hide: 'Observatory Data',
		to: '/observatory/Data',
		icon: 'mdi-database-outline',
	},
	{
		title: 'About',
		title_hide: 'Observatory About',
		to: '/observatory/About',
		icon: 'mdi-information-outline',
	},
];

export default subMenuEntriesObservatory;
