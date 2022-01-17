import opebLogo from '~/static/images/opeb_logo.gif';
import opebLogoWhite from '~/static/images/opeb_logo_white_minimal.png';

export default {
	title: 'Atoms/Design Tokens',
};

export const Typography = () => ({
	template: `
	<div>
		<h1 class="text-h3 mb-10"> Typography </h1>
		<h2 class="text-h1">H1 / Roboto</h2>
		<h2 class="text-h2">H2 / Roboto</h2>
		<h3 class="text-h3">H3 / Roboto</h3>
		<h4 class="text-h4">H4 / Roboto</h4>
		<h5 class="text-h5">H5 / Roboto</h5>
		<h6 class="text-h6">H6 / Roboto</h6>
		<p class="subtitle-1">subtitle-1 / Roboto</p>
		<p class="subtitle-2">subtitle-2 / Roboto</p>
		<p class="body-1">body-1 / Roboto</p>
		<p class="body-2">body-2 / Roboto</p>
	</div>
	`,
});

export const FontEmphasis = () => ({
	template: `
		<div>
			<h1 class="text-h3 mb-5"> Font Emphasis </h1>
			<p class="font-weight-black">
				Black text.
			</p>
			<p class="font-weight-bold">
				Bold text.
			</p>
			<p class="font-weight-medium">
				Medium weight text.
			</p>
			<p class="font-weight-regular">
				Normal weight text.
			</p>
			<p class="font-weight-light">
				Light weight text.
			</p>
			<p class="font-weight-thin">
				Thin weight text.
			</p>
			<p class="font-italic">
				Italic text.
			</p>
		</div>
	`,
});

export const BaseColors = () => ({
	template: `
	<div>
		<h1 class="text-h3 mb-5"> Color Tokens </h1>
		<p>
			<v-btn color="primary">
				#0b579f Primary Color
			</v-btn>
		</p>
		<p>
			<v-btn color="secondary">
				#424242 Secondary Color
			</v-btn>
		</p>
		<p>
			<v-btn color="accent">
				#f47c21 Accent Color
			</v-btn>
		</p>
	</div>
	`,
});

export const Logos = () => ({
	props: {
		opebLogo: {
			default: () => opebLogo,
		},
		opebLogoWhite: {
			default: () => opebLogoWhite,
		},
	},
	template: `
		<div>
			<h1 class="text-h3 mb-5"> Logos </h1>
			<h2 class="text-h4 mt-5"> Default Logo </h1>
			<v-img
				:src="opebLogo"
				max-height="150"
				max-width="150"
				class="mt-5"
				contain
			/>
			<h2 class="text-h4 mt-5"> Logo on Color </h1>
			<v-img
				:src="opebLogoWhite"
				max-height="150"
				max-width="150"
				class="mt-5 primary"
				contain
			/>
		</div>
	`,
});
