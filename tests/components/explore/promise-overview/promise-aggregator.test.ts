import {
  TrackingPromise,
  PromiseTopic,
  PromiseStatus,
  promiseTopicTextMap,
  promiseStatusTextMap,
} from '@/models/promise';
import {
  groupPromisesBy,
  Chart,
} from '@/components/explore/promise-overview/promises-aggregator';
import { FilterType } from '~/models/filter';

const promises: Partial<TrackingPromise>[] = [
  {
    party: 'พลังไทยรักไทย',
    topic: PromiseTopic.Economics,
    status: PromiseStatus.Done,
  },
  {
    party: 'พลังไทยรักไทย',
    topic: PromiseTopic.Environmental,
    status: PromiseStatus.Done,
  },
  {
    party: 'เพื่อไทย',
    topic: PromiseTopic.Culture,
    status: PromiseStatus.Done,
  },
  {
    party: 'อนาคตใหม่',
    topic: PromiseTopic.Economics,
    status: PromiseStatus.NoData,
  },
  {
    party: 'อนาคตใหม่',
    topic: PromiseTopic.Environmental,
    status: PromiseStatus.Paused,
  },
  {
    party: 'ประชาธิปัติ',
    topic: PromiseTopic.Culture,
    status: PromiseStatus.Working,
  },
  {
    party: 'พลังประชารัฐ',
    topic: PromiseTopic.Equality,
    status: PromiseStatus.Proposed,
  },
  {
    party: 'ชาติไทยพัฒนา',
    topic: PromiseTopic.Security,
    status: PromiseStatus.NoData,
  },
];

test('should be able to group by party', () => {
  const { max, total, charts } = groupPromisesBy(
    FilterType.Party,
    promises as TrackingPromise[]
  );

  const expectedCharts: Chart[] = [
    {
      label: 'พลังไทยรักไทย',
      icon: `party/พลังไทยรักไทย.jpg`,
      data: [{ status: PromiseStatus.Done, count: 2 }],
    },
    {
      label: 'อนาคตใหม่',
      icon: `party/อนาคตใหม่.jpg`,
      data: [
        { status: PromiseStatus.NoData, count: 1 },
        { status: PromiseStatus.Paused, count: 1 },
      ],
    },
    {
      label: 'เพื่อไทย',
      icon: `party/เพื่อไทย.jpg`,
      data: [{ status: PromiseStatus.Done, count: 1 }],
    },
    {
      label: 'ประชาธิปัติ',
      icon: `party/ประชาธิปัติ.jpg`,
      data: [{ status: PromiseStatus.Working, count: 1 }],
    },
    {
      label: 'พลังประชารัฐ',
      icon: `party/พลังประชารัฐ.jpg`,
      data: [{ status: PromiseStatus.Proposed, count: 1 }],
    },
    {
      label: 'ชาติไทยพัฒนา',
      icon: `party/ชาติไทยพัฒนา.jpg`,
      data: [{ status: PromiseStatus.NoData, count: 1 }],
    },
  ];

  expect(max).toBe(2);
  expect(total).toBe(8);
  expect(charts.length).toBe(expectedCharts.length);
  expect(charts).toEqual(expectedCharts);
});

test('should be able to group by topic', () => {
  const { max, total, charts } = groupPromisesBy(
    FilterType.Topic,
    promises as TrackingPromise[]
  );

  const expectedCharts: Chart[] = [
    {
      label: promiseTopicTextMap.get(PromiseTopic.Equality)?.short as string,
      icon: `topic/${PromiseTopic.Equality}_small.png`,
      data: [{ status: PromiseStatus.Proposed, count: 1 }],
    },
    {
      label: promiseTopicTextMap.get(PromiseTopic.Security)?.short as string,
      icon: `topic/${PromiseTopic.Security}_small.png`,
      data: [{ status: PromiseStatus.NoData, count: 1 }],
    },
    {
      label: promiseTopicTextMap.get(PromiseTopic.Foreign)?.short as string,
      icon: `topic/${PromiseTopic.Foreign}_small.png`,
      data: [],
    },
    {
      label: promiseTopicTextMap.get(PromiseTopic.Administration)
        ?.short as string,
      icon: `topic/${PromiseTopic.Administration}_small.png`,
      data: [],
    },
    {
      label: promiseTopicTextMap.get(PromiseTopic.Culture)?.short as string,
      icon: `topic/${PromiseTopic.Culture}_small.png`,
      data: [
        { status: PromiseStatus.Working, count: 1 },
        { status: PromiseStatus.Done, count: 1 },
      ],
    },
    {
      label: promiseTopicTextMap.get(PromiseTopic.Economics)?.short as string,
      icon: `topic/${PromiseTopic.Economics}_small.png`,
      data: [
        { status: PromiseStatus.NoData, count: 1 },
        { status: PromiseStatus.Done, count: 1 },
      ],
    },
    {
      label: promiseTopicTextMap.get(PromiseTopic.Environmental)
        ?.short as string,
      icon: `topic/${PromiseTopic.Environmental}_small.png`,
      data: [
        { status: PromiseStatus.Paused, count: 1 },
        { status: PromiseStatus.Done, count: 1 },
      ],
    },
  ];

  expect(max).toBe(2);
  expect(total).toBe(8);
  expect(charts.length).toBe(expectedCharts.length);
  expect(charts).toEqual(expect.arrayContaining(expectedCharts));
});

test('should be able to group by status', () => {
  const { max, total, charts } = groupPromisesBy(
    FilterType.Status,
    promises as TrackingPromise[]
  );

  const expectedCharts: Chart[] = [
    {
      label: promiseStatusTextMap.get(PromiseStatus.NoData) as string,
      icon: `status/${PromiseStatus.NoData}_small.png`,
      data: [{ status: PromiseStatus.NoData, count: 2 }],
    },
    {
      label: promiseStatusTextMap.get(PromiseStatus.Proposed) as string,
      icon: `status/${PromiseStatus.Proposed}_small.png`,
      data: [{ status: PromiseStatus.Proposed, count: 1 }],
    },
    {
      label: promiseStatusTextMap.get(PromiseStatus.Paused) as string,
      icon: `status/${PromiseStatus.Paused}_small.png`,
      data: [{ status: PromiseStatus.Paused, count: 1 }],
    },
    {
      label: promiseStatusTextMap.get(PromiseStatus.Working) as string,
      icon: `status/${PromiseStatus.Working}_small.png`,
      data: [{ status: PromiseStatus.Working, count: 1 }],
    },
    {
      label: promiseStatusTextMap.get(PromiseStatus.Done) as string,
      icon: `status/${PromiseStatus.Done}_small.png`,
      data: [{ status: PromiseStatus.Done, count: 3 }],
    },
  ];

  expect(max).toBe(3);
  expect(total).toBe(8);
  expect(charts.length).toBe(expectedCharts.length);
  expect(charts).toEqual(expect.arrayContaining(expectedCharts));
});
