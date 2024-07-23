<template>
	<v-container>
		<v-expansion-panels v-model="open_panels" multiple>
			<v-expansion-panel>
				<v-expansion-panel-header>
					<PanelHeader
						title="0. Identity"
						:fields="metadataFields.identity"
						:field_names="metadataFieldNames.identity"
						:visible_ticks="visibleTicks(0)"
					/>
				</v-expansion-panel-header>

				<v-expansion-panel-content class="pb-5">
					<v-divider></v-divider>
					<v-row class="mt-0 ml-3 d-flex flex-row" justify="space-between">
						<!-- Name -->
						<MetaField
							title="Name"
							field="label"
							value-type=""
							n_cols="4"
							:increasable="false"
						>
							<template #inputField>
								<FormField
									field="label"
									:increasable="false"
									:item="toolMetadata.label[0]"
									:text-class="nameTextClass()"
								/>
							</template>
						</MetaField>

						<!-- Type -->
						<MetaField
							title="Type of Software"
							field="type"
							value-type=""
							n_cols="3"
							:increasable="false"
						>
							<template #inputField>
								<SelectorType
									field="type"
									:initial-selected-type="toolMetadata.type"
								/>
							</template>
						</MetaField>

						<!-- Version -->
						<MetaField
							title="Version"
							field="version"
							value-type=""
							n_cols="4"
							:increasable="false"
						>
							<template #inputField>
								<VersionCombo
									field="version"
									:selected-version="toolMetadata.version"
									:versions="toolMetadata.other_versions"
								/>
							</template>
						</MetaField>

						<!-- Description -->
						<!-- "class=mr-auto" pushes component to the left-->
						<MetaTextArea
							title="Description"
							:value="toolMetadata.description"
							field="description"
							n_cols="9"
							sm_cols="12"
							class="mr-auto mb-0"
						/>
						<v-col
							v-if="toolMetadata.description.length > 1 > 0"
							cols="3"
							class="mt-auto ml-auto mr-auto"
						>
							<v-alert
								color="grey lighten-2"
								elevation="1"
								class="text-caption"
								dense
								text
								icon="mdi-alert-circle"
							>
								<template #prepend>
									<v-icon color="grey" size="22" class="mr-2">
										mdi-alert-circle
									</v-icon>
								</template>

								<span class="black--text"
									>Only the first description will appear in the exported
									metadata.</span
								>
							</v-alert>
						</v-col>

						<!-- Webpage -->

						<MetaFieldSimpleField
							title="Webpage"
							:value="toolMetadata.webpage"
							field="webpage"
							value-type=""
							n_cols="8"
							class="mr-auto"
							label="URL"
						/>
						<v-col
							v-if="toolMetadata.webpage.length > 1 > 0"
							cols="3"
							class="mt-auto ml-auto mr-auto"
						>
							<v-alert
								color="grey lighten-2"
								elevation="1"
								class="text-caption"
								dense
								text
								icon="mdi-alert-circle"
							>
								<template #prepend>
									<v-icon color="grey" size="22" class="mr-2">
										mdi-alert-circle
									</v-icon>
								</template>

								<span class="black--text"
									>Only the first URL will appear in the exported
									metadata.</span
								>
							</v-alert>
						</v-col>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>

			<v-expansion-panel>
				<v-expansion-panel-header>
					<PanelHeader
						title="1. Accessibility / License"
						:fields="metadataFields.accessibility"
						:field_names="metadataFieldNames.accessibility"
						:visible_ticks="visibleTicks(1)"
					/>
				</v-expansion-panel-header>

				<v-expansion-panel-content class="pb-5">
					<v-divider></v-divider>
					<v-row class="mt-0 ml-3" justify="space-between">
						<!-- License -->
						<MetaFieldLicense
							title="License"
							:value="toolMetadata.license"
							field="license"
							class="mr-auto"
							:increasable="true"
						/>

						<v-col
							v-if="
								toolMetadata.license.length > 1 &&
								toolMetadata.license[1].length > 0
							"
							cols="3"
							class="mt-auto ml-auto mr-auto"
						>
							<v-alert
								color="grey lighten-2"
								elevation="1"
								class="text-caption"
								dense
								text
								dismissible
								icon="mdi-alert-circle"
							>
								<template #prepend>
									<v-icon color="grey" size="22" class="mr-2">
										mdi-alert-circle
									</v-icon>
								</template>

								<span class="grey--text">Several licenses</span>
							</v-alert>
						</v-col>

						<!-- Registries / Package managers -->
						<MetaRegistriesCombo
							title="Registries / Package managers"
							field="registries"
							:selected="toolMetadata.registries"
							:registries="registries"
							n_cols="5"
							class="mr-auto"
						/>

						<!-- E-Infrastructures -->
						<MetaRegistriesCombo
							title="E-Infrastructures"
							field="e_infrastructures"
							:selected="toolMetadata.e_infrastructures"
							:registries="e_infrastructures"
							n_cols="5"
							class="mr-auto"
						/>

						<!-- Source Code -->
						<MetaFieldSimpleField
							title="Source Code"
							:value="toolMetadata.src"
							field="src"
							value-type=""
							n_cols="10"
							class="mr-auto"
							label="URL"
						/>

						<!-- Other Download Link -->
						<MetaFieldSimpleField
							title="Other Download Link"
							:value="toolMetadata.links"
							field="links"
							value-type=""
							n_cols="10"
							class="mr-auto"
							label="URL"
						/>

						<!-- Registration not mandatory -->
						<MetaCheckbox
							:item="toolMetadata.registration_not_mandatory"
							label="Registration is NOT mandatory to use the software or obtain a working version of it."
							color="primary"
							field="registration_not_mandatory"
							title="Registration Not Mandatory"
							n_cols="12"
						/>

						<!-- Availility as library or API -->
						<MetaCheckbox
							v-if="toolMetadata.type != 'lib' && toolMetadata.type != 'api'"
							:item="toolMetadata.api_lib"
							label="This software is available as a library or/and API."
							color="primary"
							field="api_lib"
							title="Availability as library or API"
							n_cols="12"
						/>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>

			<v-expansion-panel>
				<v-expansion-panel-header>
					<PanelHeader
						title="2. Documentation"
						:fields="metadataFields.documentation"
						:field_names="metadataFieldNames.documentation"
						:visible_ticks="visibleTicks(2)"
					/>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pb-5">
					<v-divider></v-divider>
					<v-row class="mt-2 ml-3" justify="space-between">
						<!-- Documentation -->

						<MetaFieldDocumentation
							title="Documentation"
							:value="toolMetadata.documentation"
							field="documentation"
							n_cols="12"
							class="mr-auto"
						/>

						<!-- Topics -->
						<MetaFieldTopicOperation
							title="Topics / Domains of application"
							:value="toolMetadata.topics"
							field="topics"
							value-type=""
							n_cols="12"
							class="mr-auto"
							type-label="topic"
							:accepted-vocabularies="['EDAM']"
						/>

						<!-- Operations -->
						<MetaFieldTopicOperation
							title="Operations / Functions performed by the software"
							:value="toolMetadata.operations"
							field="operations"
							value-type=""
							n_cols="12"
							class="mr-auto"
							type-label="operation"
							:accepted-vocabularies="['EDAM']"
						/>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>

			<v-expansion-panel>
				<v-expansion-panel-header>
					<PanelHeader
						title="3. Test data"
						:fields="metadataFields.testing"
						:field_names="metadataFieldNames.testing"
						:visible_ticks="visibleTicks(3)"
					/>
				</v-expansion-panel-header>

				<v-expansion-panel-content class="pb-5">
					<v-divider></v-divider>
					<v-row class="mt-2 ml-1" justify="space-between">
						<!-- Test -->
						<MetaFieldSimpleField
							title="Test Data"
							:value="toolMetadata.test"
							field="test"
							value-type=""
							n_cols="10"
							class="mr-auto"
							label="URL"
						/>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>

			<v-expansion-panel>
				<v-expansion-panel-header>
					<PanelHeader
						title="4. Interoperability"
						:fields="metadataFields.interoperability"
						:field_names="metadataFieldNames.interoperability"
						:visible_ticks="visibleTicks(4)"
					/>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pb-5">
					<v-divider></v-divider>
					<v-row class="mt-2 ml-1">
						<!-- Input Data formats -->
						<MetaFieldFormat
							title="Input Data formats"
							:value="toolMetadata.input"
							field="input"
							value-type=""
							n_cols="12"
							class="mr-auto"
							type-label="format"
							:accepted-vocabularies="['EDAM']"
						/>

						<!-- Output Data formats -->
						<MetaFieldFormat
							title="Output Data formats"
							:value="toolMetadata.output"
							field="output"
							value-type=""
							n_cols="12"
							class="mr-auto"
							type-label="format"
							:accepted-vocabularies="['EDAM']"
						/>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>

			<v-expansion-panel>
				<v-expansion-panel-header>
					<PanelHeader
						title="5. Versioning"
						:fields="metadataFields.versioning"
						:field_names="metadataFieldNames.versioning"
						:visible_ticks="visibleTicks(5)"
					/>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pb-5">
					<v-divider></v-divider>
					<v-row class="mt-2 ml-1" justify="space-between">
						<!-- Repository -->
						<MetaFieldSimpleField
							title="Repository"
							:value="toolMetadata.repository"
							field="repository"
							value-type=""
							n_cols="10"
							class="mr-auto"
							label="URL"
						/>

						<!-- Version Control -->
						<v-col cols="12" class="align-self-start">
							<v-checkbox
								v-if="toolMetadata.repository.length > 0"
								v-model="versionControl"
								color="primary"
							>
								<template #label>
									<span class="text-body-2 black--text">
										Version Control is used to develop the software.
									</span>
								</template>
							</v-checkbox>
							<v-icon
								v-if="toolMetadata.repository.length > 0"
								color="black"
								small
							>
								mdi-information-outline
							</v-icon>
							<span
								v-if="toolMetadata.repository.length > 0"
								class="text-caption black--text"
							>
								Please, check this box if any fo the previos links corresponds
								to a repository that uses version control.
							</span>
						</v-col>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>

			<v-expansion-panel>
				<v-expansion-panel-header>
					<PanelHeader
						title="6. Reproducibility"
						:fields="metadataFields.reproducibility"
						:field_names="metadataFieldNames.reproducibility"
						:visible_ticks="visibleTicks(6)"
					/>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pb-5">
					<v-divider></v-divider>
					<v-row class="mt-2 ml-1">
						<!-- Dependencies -->

						<MetaFieldSimpleField
							title="Dependencies"
							:value="toolMetadata.dependencies"
							field="dependencies"
							value-type=""
							n_cols="4"
							class="mr-auto"
						/>

						<!-- Empty column -->
						<v-col cols="1"></v-col>

						<!-- Operating System -->
						<MetaFieldSimpleField
							title="Operating System"
							:value="toolMetadata.os"
							field="os"
							value-type=""
							n_cols="4"
							class="mr-auto"
						/>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>

			<v-expansion-panel>
				<v-expansion-panel-header>
					<PanelHeader
						title="7. Recognition"
						:fields="metadataFields.recognition"
						:field_names="metadataFieldNames.recognition"
						:visible_ticks="visibleTicks(7)"
					/>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pb-5">
					<v-divider></v-divider>
					<v-row class="mt-2 ml-1" justify="space-between">
						<!-- Publication -->
						<MetaFieldPublication
							title="Associated Publication"
							:value="toolMetadata.publication"
							value-type=""
							n_cols="12"
							class="mr-auto"
						/>

						<!-- Authors -->
						<MetaFieldAuthors
							title="Authors / Developers"
							:value="toolMetadata.authors"
							field="authors"
							class="mr-auto"
						/>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>

		<v-row class="d-flex mt-3 mb-2">
			<v-btn color="primary" class="mt-5 ml-4" @click="SumbitMetadata">
				Continue
			</v-btn>
			<v-btn text class="mt-5 ml-4" @click="goBack"> Back </v-btn>
			<v-btn text class="mt-5 ml-auto" color="error" @click="cancel">
				Cancel
			</v-btn>
		</v-row>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import MetaCheckbox from './MetaCheckbox.vue';
import MetaField from './MetaField.vue';
import FormField from './FormField.vue';
import SelectorType from './SelectorType.vue';
import VersionCombo from './VersionCombo.vue';
import MetaRegistriesCombo from './MetaRegistriesCombo.vue';
import MetaTextArea from './MetaTextArea.vue';
import PanelHeader from './PanelHeader.vue';
import MetaFieldSimpleField from './MetaFieldSimpleField.vue';
import MetaFieldDocumentation from './MetaFieldDocumentation.vue';
import MetaFieldTopicOperation from './MetaFieldTopicOperation.vue';
import MetaFieldFormat from './MetaFieldFormat.vue';
import MetaFieldPublication from './MetaFieldPublication.vue';
import MetaFieldAuthors from './MetaFieldAuthors.vue';
import MetaFieldLicense from './MetaFieldLicense.vue';

export default {
	name: 'MetadataEdit',
	components: {
		MetaField,
		FormField,
		SelectorType,
		VersionCombo,
		MetaRegistriesCombo,
		MetaCheckbox,
		MetaTextArea,
		PanelHeader,
		MetaFieldSimpleField,
		MetaFieldDocumentation,
		MetaFieldTopicOperation,
		MetaFieldFormat,
		MetaFieldPublication,
		MetaFieldAuthors,
		MetaFieldLicense,
	},
	data() {
		return {
			open_panels: [],
			selectedType: '',
			selectedVersion: '',
			registries: [
				'Conda',
				'DockerHub',
				'PyPI',
				'CRAN',
				'Bioconductor',
				'SourceForge',
				'Galaxy Toolshed',
				'bio.tools',
				'npm',
				'CPAN',
				'RubyGems',
				'DockerHub',
				'BioContainers',
			],
			e_infrastructures: ['Galaxy instance (free)'],
			metadataFieldNames: {
				identity: ['name', 'type', 'version', 'description', 'webpage'],
				accessibility: [
					'license',
					'registries',
					'source code',
					'other download links',
					'registration not mandatory',
					'api library',
				],
				documentation: [
					'documentation',
					'topics / domains of application',
					'operations / functions performed by the tool',
				],
				testing: ['test data'],
				interoperability: ['input data formats', 'output data formats'],
				versioning: ['repository'],
				reproducibility: ['dependencies', 'operating system'],
				recognition: ['associated publication', 'authors / developers'],
			},
			metadataFields: {
				identity: ['label', 'type', 'version', 'description', 'webpage'],
				accessibility: [
					'license',
					'registries',
					'e_infrastructures',
					'src',
					'links',
					'registration_not_mandatory',
					'api_lib',
				],
				documentation: ['documentation', 'topics', 'operations'],
				testing: ['test'],
				interoperability: ['input', 'output'],
				versioning: ['repository'],
				reproducibility: ['dependencies', 'os'],
				recognition: ['publication', 'authors'],
			},
		};
	},
	computed: {
		...mapGetters({
			toolMetadata: 'observatory/evaluation/metadata/getToolMetadata',
		}),

		output() {
			return this.buildItems(this.toolMetadata.output);
		},

		input() {
			return this.buildItems(this.toolMetadata.input);
		},

		versionControl() {
			if (this.toolMetadata.repository.length > 0) {
				if (
					this.toolMetadata.repository[0].term.match('github') !== null ||
					this.toolMetadata.repository[0].term.match('gitlab') !== null ||
					this.toolMetadata.repository[0].term.match('bitbucket') !== null
				) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
	},
	mounted() {
		// populate vocabularies.
		this.$store.dispatch(
			'observatory/evaluation/metadata/getVocabulariesItems'
		);

		// dispatch getting SPDX licenses
		this.$store.dispatch('observatory/evaluation/metadata/fetchSPDXLicenses');
	},
	methods: {
		visibleTicks(i) {
			if (this.open_panels.includes(i)) {
				return false;
			} else {
				return true;
			}
		},

		SumbitMetadata() {
			this.$store.dispatch(
				'observatory/evaluation/metadata/submitVersionControl',
				this.versionControl
			);
			this.$store.dispatch(
				'observatory/evaluation/results/evaluateToolByMetadata',
				this.toolMetadata
			);
			this.$store.dispatch('observatory/evaluation/metadata/transformToJSONLD');
			this.$store.dispatch('observatory/evaluation/metadata/transformToCFF');
			this.$store.dispatch('observatory/evaluation/changeStep', 4);
		},

		goBack() {
			this.$store.dispatch(
				'observatory/evaluation/metadata/updateLoadedMetadata',
				false
			);
			this.$store.dispatch(
				'observatory/evaluation/metadata/updateToolsMetadata',
				{}
			);
			this.$store.dispatch('observatory/evaluation/changeStep', 2);
		},
		cancel() {
			this.$store.dispatch(
				'observatory/evaluation/metadata/updateLoadedMetadata',
				false
			);
			this.$store.dispatch(
				'observatory/evaluation/metadata/updateToolsMetadata',
				{}
			);
			this.$store.dispatch('observatory/evaluation/changeStep', 1);
		},
		nameTextClass() {
			const tClass = ['text-body', 'mt-3'];
			return tClass;
		},
	},
};
</script>
