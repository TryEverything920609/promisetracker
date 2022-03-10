import { mount } from '@vue/test-utils';
import Link from '@/components/promise-card/link.vue';
import BoxContainer from '@/components/promise-card/box-container.vue';

describe('Link Component', () => {
  const link = {
    name: 'ตรวจสอบสิทธิ์สวัสดิการแห่งรัฐ',
    url: 'https://govwelfare.cgd.go.th/welfare/check',
  };

  test('should have border container', () => {
    const EXPECTED_CLASSES = ['border-black', 'border-2', 'wv-font-anuphan'];
    const wrapper = mount(Link, {
      propsData: {
        link,
      },
    });

    const box = wrapper.findComponent(BoxContainer);

    expect(box.classes()).toEqual(expect.arrayContaining(EXPECTED_CLASSES));
  });

  test('should have default props', () => {
    const wrapper = mount(Link);

    expect(wrapper.props().link.name).toBe('');
    expect(wrapper.props().link.url).toBe('');
  });

  test('should render link name', () => {
    const wrapper = mount(Link, {
      propsData: {
        link,
      },
    });

    const atag = wrapper.find('a');

    expect(atag.text()).toEqual(link.name);
  });

  test('should contain link url', () => {
    const wrapper = mount(Link, {
      propsData: {
        link,
      },
    });

    const atag = wrapper.find('a');

    expect(atag.attributes('href')).toEqual(link.url);
  });

  test('should not render link name and url', () => {
    const wrapper = mount(Link, {
      propsData: {
        link: {},
      },
    });

    const atag = wrapper.find('a');

    expect(atag.text()).toEqual('');
    expect(atag.attributes('href')).toEqual(undefined);
  });
});
