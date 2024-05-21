<template>
	<v-simple-table light class="ma-2">
		<template #default>
			<tbody>
				<principle
					id="F"
					text="To be Findable: a software can be found and unequivocally identified"
				></principle>
				<h-indicator
					id="F1"
					text="The software has a proper, unique and persistent identifier."
				></h-indicator>
				<l-indicator
					id="F1.1"
					text="The software has a unique name to identify it."
				></l-indicator>
				<l-indicator
					id="F1.2"
					text="A scheme is used to uniquely and properly identify the software version."
				></l-indicator>

				<h-indicator
					id="F2"
					text="Software is described with rich metadata, including scientific applicability."
				></h-indicator>

				<l-indicator
					id="F2.1"
					text="Metadata is adjusted to specific metadata formats."
				></l-indicator>
				<l-indicator
					id="F2.2"
					text="Metadata is described using accepted ontologies."
				></l-indicator>

				<h-indicator id="F3" text="The software can be found."></h-indicator>

				<l-indicator
					id="F3.1"
					text="The software is included in the main software registries."
				></l-indicator>
				<l-indicator
					id="F3.2"
					text="The software can be found in any of the major software repositories e.g. GitHub, GitLab, SourceForge."
				></l-indicator>
				<l-indicator
					id="F3.3"
					text="The software can be found in specialised literature services e.g. EuropePMC, PubMed, Journals Site, biorxiv."
				></l-indicator>
			</tbody>
		</template>
	</v-simple-table>
</template>
