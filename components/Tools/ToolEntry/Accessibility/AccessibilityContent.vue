<template>
	<v-container class="mt-0 pt-0 pl-8">
		<v-row v-if="accessibilitySection" class="mt-0 pt-0 mb-2">
			<v-col cols="12" class="mt-0 pt-0 pb-0 mb-0">
				<span class="text-subtitle font-weight">{{
					accessibilitySection()
				}}</span>
			</v-col>
			<v-col cols="12" class="mt-0 pt-0 pb-0 mb-0 d-flex justify-center">
				<a class="text-body-2">{{ tool.webpage[0].term }}</a>
			</v-col>
			<v-col cols="11" class="d-flex justify-right">
				<UptimePlot :url="urlFormatter()" class="mb-2" />
			</v-col>
		</v-row>
		<v-row v-if="galaxyAvailable()" class="mt-0 pt-0 mb-2">
			<v-col cols="12" class="mt-0 pt-0 pb-0 mb-0">
				<span class="text-subtitle">Galaxy</span>
			</v-col>
			<v-col
				cols="12"
				class="mt-0 pt-1 pb-0 mb-0 pl-8 d-flex justify-left text-body-2"
			>
				<span class="mb-4 mt-2">
					{{ tool.label[0] }} is available ready-to-use in
					<a href="https://usegalaxy.eu/" target="_blank"> GalaxyEU</a>.
				</span>
			</v-col>
		</v-row>
		<v-row v-if="installationAvailable()" class="mt-0 pt-0 mb-2">
			<v-col cols="12" class="mt-0 pt-0 pb-0 mb-0">
				<span class="text-subtitle">Installation</span>
			</v-col>
			<v-col
				cols="12"
				class="mt-0 pt-1 pb-0 mb-0 pl-8 d-flex justify-left text-body-2"
			>
				<v-tabs v-model="tab">
					<v-tab class="tab">Bioconda</v-tab>
					<v-tab class="tab">Bioconductor</v-tab>
					<v-tab class="tab">Source Code</v-tab>
				</v-tabs>
			</v-col>
			<v-col cols="12" class="mt-2 pt-1 pb-0 mb-0 pl-8 d-flex justify-left">
				<v-tabs-items v-model="tab" class="text-body-2 ma-3 ml-8">
					<v-tab-item>
						This software is available in
						<a href="https://bioconda.github.io/" target="_black">Bioconda</a>.
						Install it with:
						<div class="mt-4 mb-4 ml-4 pa-3 d-flex justify-left code">
							mamba install -c bioconda {{ tool.name }}
							<v-tooltip allow-overflow bottom>
								<template #activator="{ on }">
									<v-icon
										class="mr-0 ml-auto"
										small
										color="#abb2bf"
										v-on="on"
										@click="copyClipboard()"
										@mouseleave="resetMessage()"
									>
										mdi-content-copy
									</v-icon>
								</template>
								{{ tooltipMessage }}
							</v-tooltip>
						</div>
						Detailed installation instructions and how to set an environment
						<a href="https://mamba.readthedocs.io/en/latest/" target="_blank"
							>here</a
						>.
					</v-tab-item>
					<v-tab-item>🚧 To be completed 🚧</v-tab-item>
					<v-tab-item>🚧 To be completed 🚧</v-tab-item>
				</v-tabs-items>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import UptimePlot from './UptimePlot.vue';

export default {
	name: 'AccessibilityContent',
	components: {
		UptimePlot,
	},
	data() {
		return {
			tab: 0,
			tooltipMessage: 'Copy to clipboard',
		};
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
		}),
	},
	methods: {
		accessibilitySection() {
			switch (this.tool.type) {
				case 'rest':
					return 'REST API';
				case 'web':
					return 'Web Application';
				case 'suite':
					return 'Suite';
				case 'workbench':
					return 'Workbench';
				default:
					return '';
			}
		},
		urlFormatter() {
			// TODO: this way of getting id will break the ap for some tools.

			const version = this.tool.version[0];
			// get domain of first webpage in tool.webpage
			const domain = this.tool.webpage[0].term.split('/')[2];

			const url = `biotools:${this.tool.name}:${version}/${this.tool.type}/${domain}`;

			return url;
		},
		galaxyAvailable() {
			// return 'galaxy' in this.tool.sources_labels;
			return true;
		},
		installationAvailable() {
			// TODO: complete this function
			return true;
		},
		copyClipboard() {
			navigator.clipboard.writeText(
				'mamba install -c bioconda ' + this.tool.name
			);
			this.tooltipMessage = 'Copied!';
		},
		resetMessage() {
			this.tooltipMessage = 'Copy to clipboard';
		},
	},
};
</script>
<style>
.tab {
	font-size: 0.75rem;
}

.v-tabs-items {
	width: 100%;
}

.code {
	font-family: monospace;
	font-size: 0.85rem;
	background-color: #282c34;
	color: #abb2bf;
	width: 60%;
	border-radius: 5px;
}
</style>
