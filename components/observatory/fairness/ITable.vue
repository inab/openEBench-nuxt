<template>
	<v-simple-table light class="ma-2">
		<template #default>
			<tbody>
				<principle
					id="I"
					text="To be Interoperable: a software can be integrated with other tools in the users computational workflow."
				>
				</principle>
				<h-indicator
					id="I1"
					text="Input/output data types and formats are documented"
				></h-indicator>
				<l-indicator
					id="I1.1"
					text="Input and output data types are formally specified and related to accepted ontologies."
				>
				</l-indicator>
				<l-indicator
					id="I1.2"
					text="APIs (Rest, libraries) are documented in a standard framework (OpenAPI, WES...)"
				>
				</l-indicator>
				<l-indicator
					id="I1.3"
					text="Input/output data are specified using verifiable schemas (e.g. XDS, Json schema, ...)"
				>
				</l-indicator>
				<l-indicator
					id="I1.4"
					text="The software allows users to choose among various input/output data formats, or provide the necessary tools to convert other common formats into the supported ones."
				>
				</l-indicator>
				<l-indicator
					id="I1.5"
					text="The software provides provenance information according to accepted standards (PROV)"
				>
				</l-indicator>

				<h-indicator
					id="I2"
					text="The software can be deployed in a format to be included in pipelines."
				></h-indicator>
				<l-indicator
					id="I2.1"
					text="The software has API /library versions to be included in users' pipelines."
				>
				</l-indicator>
				<l-indicator
					id="I2.2"
					text="The software can be deployed in e-infrastructures (e. g. Galaxy)."
				>
				</l-indicator>

				<h-indicator
					id="I3"
					text="A proper documentation on the software's dependencies as well as mechanisms to obtain them is available."
				></h-indicator>
				<l-indicator
					id="I3.1"
					text="The software includes details about dependencies."
				>
				</l-indicator>
				<l-indicator
					id="I3.2"
					text="The software includes its dependencies or mechanisms to access them."
				>
				</l-indicator>
				<l-indicator
					id="I3.3"
					text="The software is distributed via a dependencies aware system."
				>
				</l-indicator>
			</tbody>
		</template>
	</v-simple-table>
</template>
