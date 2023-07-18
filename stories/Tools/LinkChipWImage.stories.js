import LinkChipWImage from '~/components/Tools/Result/Card/LinkChipWImage.vue';

export default {
	title: 'Molecules/Tools/Result/Card/LinkChipWImage',
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
	src: require('~/static/icons/bioconda-logo-color.png'),
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
	src: require('~/static/icons/elixir-logo-color.png'),
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
	src: require('~/static/icons/galaxy-logo-color.png'),
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
	src: require('~/static/icons/github-logo-color.png'),
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
	src: require('~/static/icons/bioconductor-logo-color.png'),
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
	src: require('~/static/icons/sourceforge-logo-color.png'),
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
	src: require('~/static/icons/bitbucket-logo-color.png'),
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
	src: require('~/static/icons/OEB-minimal-logo-blue.png'),
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
	src: require('~/static/icons/galaxy-logo-color.png'),
};
