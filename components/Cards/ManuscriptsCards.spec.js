import { mount } from '@vue/test-utils';
import Manuscripts from './ManuscriptsCards.vue';

// Factory function to create a mounted instance of Manuscripts component with props
const factory = (propsData) => {
	return mount(Manuscripts, {
		propsData: {
			...propsData,
		},
	});
};

describe('Manuscripts', () => {
	// Test to check if Manuscripts component renders correctly when papers are provided
	it('renders correctly when papers are provided', () => {
		// Mock papers data
		const papers = [
			{
				doi: 'doi-1',
				title: 'Title 1',
				authors: 'Author 1, Author 2',
				publicationDate: '2024-06-07',
			},
			{
				doi: 'doi-2',
				title: 'Title 2',
				authors: 'Author 3, Author 4',
				publicationDate: '2024-06-08',
			},
		];
		const wrapper = factory({ papers });
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.findAll('.paper')).toHaveLength(papers.length);
	});

	test.todo('should be implemented');
});
