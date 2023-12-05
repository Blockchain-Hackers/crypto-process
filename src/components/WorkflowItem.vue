<template>
  <div
    class="!tw-ring tw-ring-primary/60 !tw-rounded-lg sm:tw-w-[600px]
    tw-relative">
    <h3 class="tw-font-mono tw-text-lg tw-p-3">trigger</h3>
    <hr>
    <div class="tw-text-3xl">
      <pre>{{ {isTrigger,isLastStep} }}</pre>
    </div>

    <div
      v-show="canAddStep || hasSteps"
      :class="[
        { 'after:tw-absolute after:tw-top-full after:tw-w-px after:tw-bg-black/50 after:tw-h-[72px]': !isLastStep },
      ]"
      class="tw-absolute tw-inset-x-0 tw-bottom-0
      tw-flex tw-justify-center">
      <button
        @click="emits('add-step', true)"
        :class="[
            { '!tw-flex': isLastStep },
          { 'before:tw-absolute before:tw-bottom-full before:tw-w-px before:tw-bg-black/50 before:tw-h-[20px]': canAddStep },
          { 'after:tw-absolute after:tw-top-full after:tw-w-px after:tw-bg-black/50 after:tw-h-[20px]': hasSteps },
        ]"
        class="tw-absolute tw-top-[20px] tw-bg-gray-200 hover:tw-bg-gray-300
        tw-rounded-lg tw-transition-colors tw-duration-300 tw-p-1
        tw-hidden tw-justify-center">
        <v-icon>mdi-plus</v-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  step: any
  isTrigger: boolean
  isLastStep: boolean
}>()
const emits = defineEmits<{
  (e: 'add-step', show: boolean): void
}>()

const canAddStep = ref(true)
const hasSteps = ref(true)
// first item in the array is the trigger
</script>