<template>
  <div
    class="!tw-ring tw-ring-primary/60 !tw-rounded-lg sm:tw-w-[600px]
    tw-relative tw-bg-white">
    <h3 class="tw-font-mono tw-text-lg tw-p-3">
      {{ isTrigger ? 'Trigger' : `Step ${step}`  }}
    </h3>
    <hr>
    <div class="tw-text-3xl tw-p-3">
      <!-- this is not rendered anywhere, just the state it generates is needed -->
      <Tabs
        :tab_list="fantomTabsForStepCreationStage"
        :value="activeStepStage"
        :query_name="'step_stage_'+localId"
        @model-value="($event:any) => activeStepStage = $event"
      />
      <div v-if="activeStepStage==='step_selection'">
        <TriggerList v-if="isTrigger" :actions="{ onSelect: handleStoreTriggerStep }" />
        <div v-else>
          <FunctionList :actions="{ onSelect: handleStoreFunctionStep }" />
        </div>
      </div>

      <div v-else-if="activeStepStage==='step_form'">
        <button
          @click="onBack"
          class="tw-text-sm tw-px-2 tw-py-1 tw-bg-gray-200 hover:tw-bg-gray-300
          tw-rounded-md tw-flex tw-gap-2 tw-items-center">
          <v-icon>mdi-arrow-left</v-icon>
          <span>back</span>
        </button>

        <div class="tw-mt-3">
          <ReturnsForm
            :fields="formToReturn?.parameters!"
            :on-submit="(data:any)=>{console.log(data);}"
          />
        </div>
      </div>
    </div>

    <div
      v-show="canAddStep || hasSteps"
      :class="[
        { 'after:tw-absolute after:tw-top-full after:tw-w-px after:tw-bg-black/50 after:tw-h-[72px]': !isLastStep },
      ]"
      class="tw-absolute tw-inset-x-0 tw-bottom-0
      tw-flex tw-justify-center">
      <button
        @click="emits('add-step')"
        :class="[
            { '!tw-flex': isLastStep && canAddStep },
          { 'before:tw-absolute before:tw-bottom-full before:tw-w-px before:tw-bg-black/50 before:tw-h-[20px]': canAddStep },
          { 'after:tw-absolute after:tw-top-full after:tw-w-px after:tw-bg-black/50 after:tw-h-[20px]': !isLastStep },
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
import { computed, ref } from 'vue';
import TriggerList from '@/components/molecules/TriggerList.vue';
import FunctionList from '@/components/molecules/FunctionList.vue';
import Tabs from '@/components/Tabs.vue';
import ReturnsForm from '@/components/molecules/ReturnsForm.vue';
import type {
  Trigger,
  Function,
  WorkflowTriggerData,
  WorkflowFunctionData
} from '@/types/workflow';
import { useWorkflowStore } from '@/stores/workflow';

const props = defineProps<{
  step: WorkflowTriggerData | WorkflowFunctionData | undefined
  isTrigger: boolean
  isLastStep: boolean
}>()
const emits = defineEmits<{
  (e: 'add-step'): void
}>()

const localId = ref(props?.step?.localId ?? new Date().toJSON())
const canAddStep = ref(!!props?.step?.canAddNextStep || props.isTrigger) // if it's a trigger, it can always add a step
const hasSteps = ref(!props.isLastStep)

const activeStepStage = ref()
const fantomTabsForStepCreationStage = [
  {
    name: 'step selection',
    slug: 'step_selection',
  },
  {
    name: 'step form',
    slug: 'step_form',
  },
  {
    name: 'created',
    slug: 'created',
  },
]

const workflowStore = useWorkflowStore()
const handleStoreTriggerStep = (trigger: Trigger) => {
  console.log({trigger})
  workflowStore.setSelectedTriggerStep({trigger, localId: localId.value})
  activeStepStage.value = fantomTabsForStepCreationStage[1]
}

const handleStoreFunctionStep = (function_: Function) => {
  console.log({function_})
  workflowStore.setSelectedFunctionStep({function_, localId: localId.value})
  activeStepStage.value = fantomTabsForStepCreationStage[1]
}

const formToReturn = computed(()=>{
  const stepInfo = props.isTrigger ? workflowStore.getTrigger : workflowStore.getStep(localId.value)
  return workflowStore.getTriggerOrFunctionById({_id: stepInfo?._id ?? '', isTrigger: props.isTrigger})
})
const onBack = () => {
  activeStepStage.value=fantomTabsForStepCreationStage[0]
}
</script>