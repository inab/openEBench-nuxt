import { mount } from '@vue/test-utils';
import BreadcrumbsBar from './BreadcrumbsBar.vue';

// `items` is consumed via `$attrs` (forwarded to v-breadcrumbs), so it must be
// supplied as an attribute rather than a declared prop. We use `mount` (not
// `shallowMount`) so the real v-breadcrumbs renders the `#item` scoped slot with
// proper item data.
const items = [
	{ text: 'Home', to: '/', disabled: false },
	{ text: 'Current', to: '/current', disabled: true },
];

const factory = () => {
	return mount(BreadcrumbsBar, {
		...createComponentMocks({ router: true }),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		attrs: { items },
	});
};

describe('BreadcrumbsBar', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('renders the provided breadcrumb items', () => {
		const wrapper = factory();
		expect(wrapper.text()).toContain('Home');
		expect(wrapper.text()).toContain('Current');
	});
});
