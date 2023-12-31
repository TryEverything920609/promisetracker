<template>
  <div
    class="flex flex-row justify-center bg-black min-h-screen px-3 py-6 md:py-12"
  >
    <div class="relative flex flex-row w-full max-w-7xl">
      <FilterPanel v-model="filters" />

      <div class="w-full flex-1 flex flex-col items-center space-y-8">
        <PromiseOverview
          :promises="filteredPromises"
          :filters="filters"
          class="max-w-screen-lg mx-auto"
          @removefilter="removeFilter($event)"
        />

        <div class="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
          <div class="flex flex-row space-x-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4.5 9H13.5" />
              <path d="M1.6875 5.625H16.3125" />
              <path d="M7.3125 12.375H10.6875" />
            </svg>
            <p class="wv-font-condolar wv-h11 text-white">เรียงคำสัญญาตาม</p>
          </div>

          <ToggleList
            v-model="groupBy"
            :options="groupByOptions"
            align="horizontal"
          />
        </div>

        <div class="w-full flex flex-col md:px-6">
          <TopicGroup
            v-for="group in groupBy === 'topic' ? topics : statuses"
            :key="`${groupBy}-${group}`"
            class=""
            :topic="groupBy === 'topic' ? group : undefined"
            :status="groupBy === 'status' ? group : undefined"
            :promises="filteredPromises"
            :promise-per-page="
              filters.find(({ type }) => type === groupBy) ? 0 : 3
            "
            @viewGroup="setGroupFilter(groupBy, group)"
          />
        </div>

        <div class="block w-full border-b border-white border-dashed h-0" />

        <div class="flex flex-col space-y-6 px-1">
          <LinkBanner
            theme="transparent-gray"
            icon-image="article/article.png"
            title-text="วิธีตรวจสอบคำสัญญา"
            body-text="หากนัก/พรรคการเมืองที่ได้เข้าไปเป็น รัฐบาล แล้วไม่ทำตามสัญญา มีกระบวนการตรวจ สอบอย่างไรบ้าง"
            button-text="อ่านเพิ่มเติม"
            button-url="guide"
          />
          <FormLink />
        </div>
      </div>

      <Button
        class="fixed lg:sticky self-end top-3 lg:bottom-4 right-3"
        @click="scrollToTop"
      >
        <div class="flex flex-row -mx-2 -my-1 lg:m-0">
          <span class="hidden xl:block mr-1">กลับด้านบน</span
          ><svg width="18" height="18" viewBox="0 0 18 18" class="fill-current">
            <path
              d="M9.74994 15L8.24994 15L8.24994 6L4.12494 10.125L3.05994 9.06L8.99994 3.12L14.9399 9.06L13.8749 10.125L9.74994 6L9.74994 15Z"
            />
          </svg>
        </div>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PromiseOverview from '@/components/explore/promise-overview/promise-overview.vue';
import promises from '@/data/promises.json';
import TopicGroup from '@/components/explore/topic-group/topic-group.vue';
import FilterPanel from '@/components/explore/filter-panel/filter-panel.vue';
import ToggleList, { ListOption } from '@/components/toggle/toggle-list.vue';
import Button from '@/components/button.vue';
import LinkBanner from '@/components/link-banner.vue';
import FormLink from '@/components/form-link.vue';
import { PromiseTopic, PromiseStatus, TrackingPromise } from '@/models/promise';
import { Filter, FilterType } from '~/models/filter';
import { createMetadata } from '~/utils/metadata';

enum GroupBy {
  Topic = 'topic',
  Status = 'status',
}

const checkFilterOnPromise = (
  { type, value }: Filter,
  promise: TrackingPromise
): boolean => {
  switch (type) {
    case FilterType.Party:
      return promise.party === value;
    case FilterType.Status:
      return promise.status === value;
    case FilterType.Topic:
      return promise.topic === value;
    case FilterType.Keyword:
      return promise.title.includes(value);
    default:
      return false;
  }
};

export default Vue.extend({
  name: 'ExplorePage',
  components: {
    PromiseOverview,
    TopicGroup,
    FilterPanel,
    ToggleList,
    Button,
    LinkBanner,
    FormLink,
  },
  data() {
    return {
      topics: [
        PromiseTopic.Equality,
        PromiseTopic.Security,
        PromiseTopic.Foreign,
        PromiseTopic.Administration,
        PromiseTopic.Culture,
        PromiseTopic.Economics,
        PromiseTopic.Environmental,
      ],
      statuses: [
        PromiseStatus.NoData,
        PromiseStatus.Proposed,
        PromiseStatus.Paused,
        PromiseStatus.Working,
        PromiseStatus.Done,
      ],
      filters: [] as Filter[],
      groupBy: GroupBy.Topic as GroupBy,
      groupByOptions: [
        {
          label: 'ตามประเด็น',
          value: GroupBy.Topic,
        },
        {
          label: 'ตามสถานะ',
          value: GroupBy.Status,
        },
      ] as ListOption[],
    };
  },
  head: createMetadata({ pageName: 'ดูคำสัญญา' }),
  computed: {
    filteredPromises(): TrackingPromise[] {
      return this.filters.length > 0
        ? (promises as TrackingPromise[]).filter((promise) =>
            this.filters.every((filter: Filter) =>
              checkFilterOnPromise(filter, promise)
            )
          )
        : (promises as TrackingPromise[]);
    },
  },
  watch: {
    filters(filters: Filter[]) {
      const query = filters.reduce(
        (q, { type, value }) => ({ ...q, [type]: value }),
        {}
      );

      this.$router.push({ query });
      this.scrollToTop();
    },
  },
  mounted() {
    this.filters = Object.entries(this.$router.currentRoute.query).map(
      ([type, value]) => ({ type, value } as Filter)
    );
  },
  methods: {
    removeFilter(filter: Filter) {
      this.filters = this.filters.filter(({ type }) => filter.type !== type);
    },
    setGroupFilter(
      type: FilterType.Status | FilterType.Topic,
      value: PromiseStatus | PromiseTopic
    ) {
      const existingFilter = this.filters.find(
        (filter) => filter.type === type
      );

      if (existingFilter?.value === value) return;

      this.filters = existingFilter
        ? this.filters.map((filter) =>
            filter.value === value ? ({ type, value } as Filter) : filter
          )
        : [...this.filters, { type, value } as Filter];
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
});
</script>
