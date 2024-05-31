<template>
	<v-simple-table light class="ma-2">
		<template #default>
			<tbody>
				<principle
					id="A"
					text="To be Accessible: it is possible to access a usable form of a software."
				></principle>

				<h-indicator
					id="A1"
					text="A working version of the software can be accessed/downloaded/built."
				></h-indicator>

				<l-indicator
					id="A1.2"
					text="A working version of the software can be accessed/downloaded/built, including the generation of a software container."
				></l-indicator>
				<l-indicator
					id="A1.3"
					text="A set of instructions and other necessary information the user can follow to build the software is available."
				>
				</l-indicator>
				<l-indicator id="A1.4" text="Test data is available."> </l-indicator>
				<l-indicator id="A1.5" text="Source code of the software is available.">
				</l-indicator>

				<h-indicator
					id="A2"
					text="Code and metadata are available even when the software is no longer in use"
				></h-indicator>
				<l-indicator
					id="2.1"
					text="Metadata of previous versions is available."
				></l-indicator>
				<l-indicator
					id="2.2"
					text="Previous versions are available."
				></l-indicator>

				<h-indicator
					id="A3"
					text="No restrictions exist to access the software"
				></h-indicator>
				<l-indicator
					id="A3.1"
					text="The software can be used without registration."
				>
				</l-indicator>
				<l-indicator
					id="A3.2"
					text="The software can be used in a free operating system."
				>
				</l-indicator>
				<l-indicator
					id="A3.3"
					text="Versions of the software for several operative systems are available."
				>
				</l-indicator>
				<l-indicator
					id="A3.4"
					text="The software can be used in a free e-infrastructure"
				>
				</l-indicator>
				<l-indicator
					id="A3.5"
					text="The software can be used in several e-infrastructure"
				>
				</l-indicator>
			</tbody>
		</template>
	</v-simple-table>
</template>
