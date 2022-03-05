import { mount } from '@vue/test-utils';
import StatusLegend from '@/components/explanation/status-legend.vue';

describe('Inline handling', () => {
  test('renders column wise', () => {
    const wrapper = mount(StatusLegend, {
      propsData: { showInline: false },
    });
    const container = wrapper.find('[data-testid="status-legend-container"]');
    expect(container.classes()).toEqual([]);
  });
  test('renders inline', () => {
    const wrapper = mount(StatusLegend, {
      propsData: { showInline: true },
    });
    const container = wrapper.find('[data-testid="status-legend-container"]');
    expect(container.classes()).toEqual(['flex']);
  });
});

describe('Details handling', () => {
  test('renders details', () => {
    const wrapper = mount(StatusLegend, {
      propsData: { showDetail: true },
    });
    const detail = wrapper.find('p');
    expect(detail.exists()).toBe(true);
  });
  test('does not render details', () => {
    const wrapper = mount(StatusLegend, {
      propsData: { showDetail: false },
    });
    const detail = wrapper.find('p');
    expect(detail.exists()).toBe(false);
  });
});

describe('Style handling', () => {
  test('showDetail is true', () => {
    const expectedClasses = ['mr-2', 'w-24', 'mb-2'];
    const wrapper = mount(StatusLegend, {
      propsData: { showDetail: true },
    });
    const text = wrapper.find('[data-testid="status-legend-text"]');
    expect(text.classes()).toEqual(expect.arrayContaining(expectedClasses));
  });
  test('showDetail is false', () => {
    const expectedClasses = ['mr-2', 'w-24'];
    const wrapper = mount(StatusLegend, {
      propsData: { showDetail: false },
    });
    const text = wrapper.find('[data-testid="status-legend-text"]');
    expect(text.classes()).toEqual(expect.arrayContaining(expectedClasses));
  });
  test('showInline is true', () => {
    const expectedClasses = ['mr-2'];
    const wrapper = mount(StatusLegend, {
      propsData: { showInline: true },
    });
    const text = wrapper.find('[data-testid="status-legend-text"]');
    expect(text.classes()).toEqual(expect.arrayContaining(expectedClasses));
  });
  test('showInline is false', () => {
    const expectedClasses = ['mr-2', 'w-24'];
    const wrapper = mount(StatusLegend, {
      propsData: { showInline: false },
    });
    const text = wrapper.find('[data-testid="status-legend-text"]');
    expect(text.classes()).toEqual(expect.arrayContaining(expectedClasses));
  });
});
