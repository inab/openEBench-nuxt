import LinkChipWIcon from '~/components/Tools/Result/Card/LinkChipWIcon.vue';

export default {
	title: 'Molecules/Tools/Result/Card/LinkChipWIcon',
};

export const Publication = (_args, { argTypes }) => ({
	components: { LinkChipWIcon },
	props: Object.keys(argTypes),
	template: `
		<v-row>
			<v-col cols=4>
				<link-chip-w-icon v-bind="$props"/>
			</v-col>
		</v-row>
	`,
});

Publication.args = {
	link: 'https://www.google.com',
	text: 'Publication',
	icon: 'mdi-text-box-outline',
	color: 'grey darken-1',
};

export const Homepage = (_args, { argTypes }) => ({
	components: { LinkChipWIcon },
	props: Object.keys(argTypes),
	template: `
		<v-row>
			<v-col cols=4>
				<link-chip-w-icon v-bind="$props"/>
			</v-col>
		</v-row>
	`,
});

Homepage.args = {
	link: 'https://www.google.com',
	text: 'Homepage',
	icon: 'mdi-web',
	color: 'grey darken-1',
};
