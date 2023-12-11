<template>
  <div
    class="tw-ring tw-ring-orange-500/30 tw-rounded-md">
    <div>
      <div class="tw-flex tw-justify-between tw-p-2 tw-bg-orange-200/5">
        <h3 class="tw-text-lg">Trigger: <strong>{{ workflow.name }}</strong></h3>
        <v-icon
          @click="foldTrigger = !foldTrigger"
          class="tw-cursor-pointer tw-text-black">
          {{ !foldTrigger ? "mdi-unfold-less-horizontal" : "mdi-unfold-more-horizontal"  }}
        </v-icon>
      </div>
      <hr class="tw-border-orange-500/30">
      <div class="tw-p-3 tw-text-center">
        <template v-if="!foldTrigger">
          {{workflow.trigger}}
        </template>
        <template v-else>
          <v-icon class="!tw-text-5xl tw-text-gray-300">mdi-dots-horizontal</v-icon>
        </template>
      </div>
    </div>
    <div>
      <hr class="tw-border-orange-500/30">
      <div class="tw-flex tw-justify-between tw-p-2 tw-bg-orange-200/5">
        <h3 class="tw-text-lg">Steps</h3>
        <v-icon
          @click="foldSteps = !foldSteps"
          class="tw-cursor-pointer tw-text-black">
          {{ !foldSteps ? "mdi-unfold-less-horizontal" : "mdi-unfold-more-horizontal"  }}
        </v-icon>
      </div>
      <hr class="tw-border-orange-500/30">
      <div class="tw-p-3 tw-text-center">
        <template v-if="!foldSteps">
          {{workflow.steps}}
        </template>
        <template v-else>
          <v-icon class="!tw-text-5xl tw-text-gray-300">mdi-dots-horizontal</v-icon>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  workflow: any;
}>();

const foldTrigger = ref(true)
const foldSteps = ref(true)
</script>