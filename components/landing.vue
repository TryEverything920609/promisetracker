<template>
  <div
    class="relative justify-center max-w-7xl w-full landing-bg overflow-hidden"
  >
    <img
      class="absolute m-auto opacity-95 overflow-hidden max-w-none sm:max-w-full -top-16 sm:top-0"
      :src="`${$config.path.images}/background/landing_bg.png`"
      alt="landing_bg"
      style="z-index: 1; left: 50%; transform: translateX(-50%)"
    />
    <div
      class="flex flex-col relative z-10 items-center text-center pt-16 sm:pt-32 pb-20"
    >
      <StatusAnimation />
      <h3 class="wv-h8 wv-font-bold wv-font-kondolar py-4">PROMISE TRACKER</h3>
      <h1 class="wv-h4 wv-font-bold wv-font-kondolar pb-4">
        ที่ผ่านมารักษา<br class="block sm:hidden" />สัญญา<br
          class="hidden sm:block"
        />ได้แค่ไหน?
      </h1>
      <h4 class="wv-b5 wv-font-kondolar px-4">
        ประชาชนทั้งหลาย.. มาติดตามและทวงถามสัญญาที่พรรค
        และนักการเมืองให้ไว้ตอนหาเสียงกัน!
      </h4>
      <div class="flex flex-col items-center py-4 w-full px-4">
        <div class="p-2 wv-font-anuphan wv-u5 bg-gray bg-opacity-10 rounded-sm">
          อัปเดตล่าสุด {{ updatedDate }}
        </div>
        <NuxtLink class="mt-3 mb-6 mx-auto" to="explore">
          <Button
            theme="primary-white"
            class="h-10 w-full sm:w-max wv-font-anuphan wv-u4 flex justify-center"
          >
            <span>ดูคำสัญญา</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-2.26862e-07 6.74994L-2.92429e-07 5.24994L9 5.24994L4.875 1.12494L5.94 0.0599401L11.88 5.99994L5.94 11.9399L4.875 10.8749L9 6.74994L-2.26862e-07 6.74994Z"
              />
            </svg>
          </Button>
        </NuxtLink>
      </div>
      <div class="w-5xl w-full px-4">
        <div class="block w-full border-b border-white border-dashed h-1">
          {{ ` ` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatusAnimation from './status-animation.vue';
import Button from './button.vue';
import { lastUpdated } from '@/data/metadata.json';

export default Vue.extend({
  name: 'Landing',
  components: { StatusAnimation, Button },
  data() {
    return {
      updatedDate: new Date(lastUpdated).toLocaleDateString('th-TH', {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
      }),
    };
  },
});
</script>

<style scoped>
.landing-bg {
  height: 540px;
}

@media (min-width: 547px) {
  .landing-bg {
    height: 520px;
  }
}

@media (min-width: 640px) {
  .landing-bg {
    height: 580px;
  }
}

@media (min-width: 768px) {
  .landing-bg {
    height: 630px;
  }
}
</style>
