import LinkChipWImage from '~/components/Tools/Search/Card/LinkChipWImage.vue';

export default {
	title: 'Molecules/Tools/Search/Card/LinkChipWImage',
};

export const Bioconda = (_args, { argTypes }) => ({
	components: { LinkChipWImage },
	props: Object.keys(argTypes),
	template: `
		<v-row>
			<v-col cols=4>
				<link-chip-w-image v-bind="$props"/>
			</v-col>
		</v-row>
	`,
});

Bioconda.args = {
	link: 'https://www.google.com',
	type: 'bioconda',
	text: 'Bioconda',
};

export const Biotools = (_args, { argTypes }) => ({
	components: { LinkChipWImage },
	props: Object.keys(argTypes),
	template: `
		<v-row>
			<v-col cols=4>
				<link-chip-w-image v-bind="$props"/>
			</v-col>
		</v-row>
	`,
});

Biotools.args = {
	link: 'https://www.google.com',
	type: 'biotools',
	text: 'Biotools',
};

export const Galaxy = (_args, { argTypes }) => ({
	components: { LinkChipWImage },
	props: Object.keys(argTypes),
	template: `
		<v-row>
			<v-col cols=4>
				<link-chip-w-image v-bind="$props"/>
			</v-col>
		</v-row>
	`,
});

Galaxy.args = {
	link: 'https://www.google.com',
	type: 'galaxy',
	text: 'Galaxy',
};

export const Github = (_args, { argTypes }) => ({
	components: { LinkChipWImage },
	props: Object.keys(argTypes),
	template: `
		<v-row>
			<v-col cols=4>
				<link-chip-w-image v-bind="$props"/>
			</v-col>
		</v-row>
	`,
});

Github.args = {
	link: 'https://www.google.com',
	type: 'github',
	text: 'Github',
};

export const Bioconductor = (_args, { argTypes }) => ({
	components: { LinkChipWImage },
	props: Object.keys(argTypes),
	template: `
		<v-row>
		<v-col cols=4>
			<link-chip-w-image v-bind="$props"/>
		</v-col>
	</v-row>
	`,
});

Bioconductor.args = {
	link: 'https://www.google.com',
	type: 'bioconductor',
	text: 'Bioconductor',
};

export const Sourceforge = (_args, { argTypes }) => ({
	components: { LinkChipWImage },
	props: Object.keys(argTypes),
	template: `
		<v-row>
		<v-col cols=4>
			<link-chip-w-image v-bind="$props"/>
		</v-col>
	</v-row>
	`,
});

Sourceforge.args = {
	link: 'https://www.google.com',
	type: 'sourceforge',
	text: 'Sourceforge',
};

export const Bitbucket = (_args, { argTypes }) => ({
	components: { LinkChipWImage },
	props: Object.keys(argTypes),
	template: `
		<v-row>
		<v-col cols=4>
			<link-chip-w-image v-bind="$props"/>
		</v-col>
	</v-row>
	`,
});

Bitbucket.args = {
	link: 'https://www.google.com',
	type: 'bitbucket',
	text: 'Bitbucket',
};

export const Openebench = (_args, { argTypes }) => ({
	components: { LinkChipWImage },
	props: Object.keys(argTypes),
	template: `
		<v-row>
		<v-col cols=4>
			<link-chip-w-image v-bind="$props"/>
		</v-col>
	</v-row>
	`,
});

Openebench.args = {
	link: 'https://www.google.com',
	type: 'openebench',
	text: 'Openebench',
};

export const Toolshed = (_args, { argTypes }) => ({
	components: { LinkChipWImage },
	props: Object.keys(argTypes),
	template: `
		<v-row>
		<v-col cols=4>
			<link-chip-w-image v-bind="$props"/>
		</v-col>
	</v-row>
	`,
});

Toolshed.args = {
	link: 'https://www.google.com',
	type: 'toolshed',
	text: 'Toolshed',
};
