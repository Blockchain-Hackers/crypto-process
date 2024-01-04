<template>
  <div
    class="tw-border tw-border-black tw-rounded-lg tw-overflow-hidden tw-relative">
    <div class="tw-flex tw-gap-2 tw-bg-black text-white tw-p-2 tw-justify-start tw-items-center">
      <span
        class="tw-min-h-full tw-self-stretch tw-flex-1 tw-aspect-square tw-bg-white tw-text-primary
        tw-rounded-sm tw-flex tw-items-center tw-justify-center tw-text-3xl tw-font-bold">
        {{ triggerInitials }}
      </span>
      <div class="tw-min-w-[84%] sm:tw-min-w-[88%]">
        <h2 class="tw-font-medium tw-truncate">{{ workflow.name }}</h2>
        <p class="tw-text-gray-400 tw-text-sm tw-truncate">{{ useUserFriendlyDate(workflow.created_at) }}</p>
      </div>
    </div>

    <div
      class="tw-ring tw-ring-orange-500/30 tw-rounded-md">
      <div>
        <hr class="tw-border-orange-500/30">
        <div class="tw-flex tw-justify-between tw-p-2 tw-bg-orange-200/5">
          <h3 class="tw-text-lg">More info</h3>
        </div>
        <hr class="tw-border-orange-500/30">
        <div class="tw-p-3 tw-text-center">
          <div v-for="step in workflow.steps" class="tw-text-start tw-truncate tw-space-y-1">
            <h4>Step name: <span class="tw-bg-primary tw-p-1 tw-px-2 tw-text-white tw-rounded-xl">{{ step.name }}</span></h4>
            <h4>Function: <span class="tw-bg-primary tw-p-1 tw-px-2 tw-text-white tw-rounded-xl">{{ step.function }}</span></h4>
            <h4>Function_id: <span class="tw-bg-primary tw-p-1 tw-px-2 tw-text-white tw-rounded-xl">{{ step.function_id }}</span></h4>
          </div>
        </div>
      </div>
    </div>
    <router-link class="tw-absolute tw-inset-0" :to="`/history/${workflow._id}`"></router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import useUserFriendlyDate from '@/composables/useUserFriendlyDate';

const props = defineProps<{
  workflow: any;
}>();

const foldTrigger = ref(true)
const foldSteps = ref(true)

const triggerInitials = computed(() => (props.workflow.trigger.name.split('')[0] ?? '').toUpperCase())
</script>