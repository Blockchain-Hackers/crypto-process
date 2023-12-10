<template>
  <div class="">
    <div v-if="showNotice" class="tw-block tw-p-3">
      <SeedPhraseNotice
        class="tw-block tw-w-full"
        :is-dismissable="true"
        @showNotice="(show: boolean) => showNotice = show"
      />
    </div>

    <div
      class="tw-bg-gradient-to-r tw-from-primary/10 tw-to-transparent
      tw-p-5 tw-space-y-4">
      <h1 class="tw-text-3xl">Automate your tasks by <strong>creating a workflow</strong></h1>
      <button
        @click="showWorkflowCreation=true"
        class="tw-p-2 tw-px-3 tw-bg-primary tw-rounded-lg tw-text-white
        tw-ring-4 tw-ring-transparent hover:tw-ring-white tw-transition-all tw-duration-300">
        Create workflow
      </button>
    </div>

    <WorkflowCreation v-model="showWorkflowCreation" />
  </div>
</template>

<script setup lang="ts">
import SeedPhraseNotice from '@/components/SeedPhraseNotice.vue';
import WorkflowCreation from '@/components/WorkflowCreation.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const showNotice = ref(true)
const showWorkflowCreation = ref(false)

onMounted(() => {
  // if query is found then user probably refreshed the page
  const workflowQuery = route?.query || {}
  Object.entries(workflowQuery).forEach(([key]) => {
    if(key.includes('step')) setTimeout(()=>showWorkflowCreation.value = true, 1000)
  })
})
</script>