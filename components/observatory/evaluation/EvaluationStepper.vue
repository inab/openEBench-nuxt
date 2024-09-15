<template>
	<!----------------- STEPPER ------------------->
	<v-stepper v-model="step" elevation="0" vertical class="ml-0 pl-0 mb-4">
		<!----------------- STEP 1 ------------------->
		<v-stepper-step :complete="step > 1" step="1">
			Select the source of the software's metadata
		</v-stepper-step>
		<v-stepper-content step="1">
			<v-row
				justify="space-around"
				class="mb-4 mt-4 mr-0 ml-0 d-flex align-center"
			>
				<v-col cols="3" md="3" sm="7">
					<EvaluationSourceCard
						title="Software Observatory"
						description="Select a software from the Software Observatory's database"
						source="software_observatory"
						icon="mdi-database"
					>
						<!--template v-slot:note>
							<span>
								Learn more about database content
								<a href="/Data" target="blank">here.</a>
							</span>
						</template-->
					</EvaluationSourceCard>
				</v-col>
				<v-col cols="3" md="3" sm="7">
					<EvaluationSourceCard
						title="GitHub repository"
						description="Enter the URL of the software's GitHub repository"
						source="github"
						icon="mdi-github"
					>
						<!--template v-slot:note>
							<span> The repository must be public. </span>
						</template-->
					</EvaluationSourceCard>
				</v-col>
				<v-col cols="3" md="3" sm="7">
					<EvaluationSourceCard
						title="Metadata file"
						description="Provide the URL of a metadata file in Bioschema format"
						source="metadata_file"
						icon="mdi-code-json"
					>
						<!--template v-slot:note>
							<span> Use this option if you have a metadata file. </span>
						</template-->
					</EvaluationSourceCard>
				</v-col>
			</v-row>
		</v-stepper-content>
		<!-------------------------------------------->

		<!----------------- STEP 2 ------------------->
		<v-stepper-step :complete="step > 2" step="2">
			Introduce software to evaluate
		</v-stepper-step>
		<v-stepper-content v-if="source === 'github'" step="2">
			<GitHubInput />
		</v-stepper-content>

		<v-stepper-content v-else-if="source === 'software_observatory'" step="2">
			<ObservatoryInput />
		</v-stepper-content>

		<v-stepper-content v-else step="2">
			<MetadataFileInput />
		</v-stepper-content>

		<!-------------------------------------------->

		<!---------------- STEP 3 -------------------->
		<v-stepper-step :complete="step > 3" step="3">
			Edit the metadata if needed
		</v-stepper-step>

		<v-stepper-content step="3">
			<MetadataEdit v-if="LoadedMetadata" />
		</v-stepper-content>
		<!-------------------------------------------->

		<!---------------- STEP 4 -------------------->
		<v-stepper-step step="4"> Results </v-stepper-step>
		<v-stepper-content step="4">
			<ResultsTabs />
		</v-stepper-content>
		<!-------------------------------------------->
	</v-stepper>
	<!-------------------------------------------->
</template>
<script>
import { mapGetters } from 'vuex';
import EvaluationSourceCard from './EvaluationSourceCard.vue';
import GitHubInput from './GitHub/GitHubInput.vue';
import ObservatoryInput from './Observatory/ObservatoryInput.vue';
import MetadataFileInput from './MetadataFile/MetadataFileInput.vue';
import MetadataEdit from './Metadata/MetadataEdit.vue';
import ResultsTabs from './Results/ResultsTabs.vue';

export default {
	name: 'EvaluationStepper',
	components: {
		EvaluationSourceCard,
		GitHubInput,
		ObservatoryInput,
		MetadataFileInput,
		MetadataEdit,
		ResultsTabs,
	},

	computed: {
		...mapGetters('observatory', {
			step: 'evaluation/getStep',
			source: 'evaluation/getSource',
			toolMetadata: 'evaluation/metadata/getToolMetadata',
			LoadedMetadata: 'evaluation/metadata/getLoadedMetadata',
		}),
	},
};
</script>
<style scoped>
.subtitle {
	font-size: 1.4rem;
	font-weight: 500;
}

.btn {
	white-space: normal;
	word-wrap: break-word;
}
</style>
