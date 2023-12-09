<template>
  <div class="">
    <div v-if="showNotice" class="tw-block tw-p-3">
      <SeedPhraseNotice
        class="tw-block tw-w-full"
        :is-dismissable="false"
        @showNotice="(show: boolean) => showNotice = show"
      />
    </div>

    <div
      class="tw-bg-gradient-to-r tw-from-primary/10 tw-to-transparent tw-p-5 tw-space-y-4"
    >
      <h1 class="tw-text-3xl">Create account <strong>to automate</strong></h1>
      <button
        class="tw-p-2 tw-px-3 tw-bg-primary tw-rounded-lg tw-text-white tw-ring-4 tw-ring-transparent hover:tw-ring-white tw-transition-all tw-duration-300"
      >
        Create account {{}}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SeedPhraseNotice from '@/components/SeedPhraseNotice.vue';

const route = useRoute();
const router = useRouter();

const showNotice = ref(true)
const showWorkflowCreation = ref(false)
</script>
