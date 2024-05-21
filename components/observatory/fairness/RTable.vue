<template>
	<v-simple-table light class="ma-2">
		<template #default>
			<tbody>
				<principle
					id="R"
					text="To be (Re)Usable: the software can be properly used and/or contributed to."
				>
				</principle>
				<h-indicator
					id="R1"
					text="The software provides adequate usage documentation."
				></h-indicator>
				<l-indicator
					id="R1.1"
					text="The software user guides are provided."
				></l-indicator>
				<l-indicator
					id="R1.2"
					text="Examples of use cases are provided."
				></l-indicator>

				<h-indicator
					id="R2"
					text="A clear and accessible usage license is provided."
				></h-indicator>
				<l-indicator id="R2.1" text="Terms of Use are stated."> </l-indicator>
				<l-indicator
					id="R2.2"
					text="Conditions of installation and usage are stated."
				>
				</l-indicator>

				<h-indicator id="R3" text="A contributors policy exists."></h-indicator>
				<l-indicator
					id="R3.1"
					text="A document stating the contributors policy exists."
				>
				</l-indicator>
				<l-indicator id="R3.2" text="Credit for contributions is provided.">
				</l-indicator>

				<h-indicator id="R4" text="Provenance is available."></h-indicator>
				<l-indicator
					id="R4.1"
					text="The software follows a version-control system."
				>
				</l-indicator>
				<l-indicator
					id="R4.2"
					text="The software follows a defined and documented release policy."
				>
				</l-indicator>
				<l-indicator
					id="R4.3"
					text="Metadata of previous versions is available."
				>
				</l-indicator>
			</tbody>
		</template>
	</v-simple-table>
</template>
