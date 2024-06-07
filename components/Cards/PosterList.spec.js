import { shallowMount } from '@vue/test-utils';
import Posters from './PosterList.vue';
import { posters } from '@/test/unit/mockData/Posters';

describe('PosterList.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(Posters, {
			propsData: { posters },
		});
	});

	it('renders the component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('renders the correct number of posters', () => {
		const posterPreviews = wrapper.findAll('.poster-preview');
		expect(posterPreviews.length).toBe(posters.length);
	});

	it('displays sorted posters by date', () => {
		const sortedPosters = wrapper.vm.sortedPosters;
		expect(sortedPosters[0].title).toBe('Poster 2');
		expect(sortedPosters[1].title).toBe('Poster 1');
		expect(sortedPosters[2].title).toBe('Poster 3');
	});

	it('selects a poster on click', async () => {
		const posterPreview = wrapper.find('.poster-preview');
		await posterPreview.trigger('click');
		expect(wrapper.vm.selectedPoster).toBe(posters[2]); // Since Poster 3 is the first in sorted order
	});

	it('displays selected poster details', async () => {
		wrapper.setData({ selectedPoster: posters[0] });
		await wrapper.vm.$nextTick();

		const selectedPosterDetails = wrapper.find('.selected-poster-details');
		expect(selectedPosterDetails.exists()).toBe(true);
		expect(selectedPosterDetails.html()).toContain('Poster 1');
		expect(selectedPosterDetails.html()).toContain('Author 1');
	});

	it('renders license text when no poster is selected', () => {
		const licenseText = wrapper.find('.license-text');
		expect(licenseText.exists()).toBe(true);
	});

	it('returns the correct poster path', () => {
		const posterPath = wrapper.vm.getPosterPath('poster1.pdf');
		expect(posterPath).toBe('/posters/poster_list/poster1.pdf');
	});
});
