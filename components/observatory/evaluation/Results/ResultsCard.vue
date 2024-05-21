<template>
	<v-card outlined>
		<v-card-title>{{ title }}</v-card-title>
		<v-card-subtitle>Indicators and scores</v-card-subtitle>
		<v-row justify="center">
			<v-col cols="5">
				<FAIRplot
					:tool-name="toolMetadata.label[0]"
					:height="260"
					:label="title"
					:color-fill="color"
					:indicators-labels="indicatorsLabels"
					class="mt-3 pb-2 mb-2"
				/>
			</v-col>
			<v-col cols="5">
				<CardCaptions :tool-label="toolMetadata.label[0]" />
			</v-col>
			<!--v-col cols="7" class="pr-6 pl-6">
                <IndicatorsTree :items="items" />
                
            </v-col-->
		</v-row>
		<v-row justify="center" class="mb-3">
			<IndicatorsTable
				:indicators="items"
				:ids-main-indicators="indicatorsLabels"
			/>
		</v-row>
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import FAIRplot from './FAIRplot.vue';
import CardCaptions from './CardCaptions.vue';
import IndicatorsTable from './IndicatorsTable.vue';

export default {
	name: 'ResultsCard',
	components: {
		IndicatorsTable,
		FAIRplot,
		CardCaptions,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		items: {
			type: Array,
			required: true,
		},
		indicatorsLabels: {
			type: Array,
			required: true,
		},
	},
	computed: {
		...mapGetters('observatory', {
			toolMetadata: 'evaluation/metadata/getToolMetadata',
		}),
	},
};
</script>
