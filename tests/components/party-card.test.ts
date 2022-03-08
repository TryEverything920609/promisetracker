import { mount, config } from '@vue/test-utils';
import PartyCard from '../../components/party-card.vue';
import { PromiseStatus } from '@/models/promise';

const data = [
  { status: PromiseStatus.NoData, count: 10 },
  { status: PromiseStatus.Proposed, count: 5 },
  { status: PromiseStatus.Paused, count: 4 },
  { status: PromiseStatus.Working, count: 1 },
  { status: PromiseStatus.Done, count: 8 },
];

describe('party card', () => {
  let wrapper = mount(PartyCard, {
    stubs: {
      NuxtLink: true,
    },
  });
  beforeEach(() => {
    wrapper = mount(PartyCard, {
      stubs: {
        NuxtLink: true,
      },
    });
  });

  test('should render given party logo', async () => {
    const LOGO = 'test.png';
    await wrapper.setProps({ partyLogo: LOGO });

    expect(wrapper.find('img').attributes('src')).toBe(
      `${config.mocks.$config.path.images}/${LOGO}`
    );
  });

  test('should render dummy party logo when src is not given', async () => {
    const LOGO = '';
    await wrapper.setProps({ partyLogo: LOGO });

    expect(wrapper.find('img').attributes('src')).toBe(
      `${config.mocks.$config.path.images}/dummy.jpg`
    );
  });

  test('should render party name', async () => {
    const PARTY_NAME = 'รวมพลังประชาชาติไทย';
    await wrapper.setProps({ partyName: PARTY_NAME });

    const partyCard = wrapper.get('.h11');

    expect(partyCard.text()).toBe(PARTY_NAME);
  });

  test('should link to the given url', async () => {
    const URL_TEXT = '/explore?party-name=รวมพลังประชาชาติไทย';
    await wrapper.setProps({ buttonUrl: URL_TEXT });

    const routerLink = wrapper.get('nuxtlink-stub');

    expect(routerLink.attributes().to).toBe(URL_TEXT);
  });

  test('should render correct total sum of promises', async () => {
    const PROMISES_COUNT = '28';
    await wrapper.setProps({ partyPromises: data });
    const partyCard = wrapper.get('#promise-sum');

    expect(partyCard.text()).toBe(PROMISES_COUNT);
  });
});
