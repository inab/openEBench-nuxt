import Header from '~/components/Header/HeaderMenu.vue';
import Footer from '~/components/TheFooter.vue';

export default {
	title: 'Layout/Header and Footer',
};

export const HeaderMenuBar = () => ({
	components: { Header },
	template: '<Header />',
});

export const TheFooter = () => ({
	components: { Footer },
	template: '<Footer />',
});
