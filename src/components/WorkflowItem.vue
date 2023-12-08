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
        :query_name="'step_stage_'+id"
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
            :fields="formToReturn?.parameters"
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
        @click="emits('add-step', true)"
        :class="[
            { '!tw-flex': isLastStep },
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
import type { Trigger, Function } from '@/types/workflow';
import { useCookies } from '@vueuse/integrations/useCookies'

const props = defineProps<{
  step: any
  isTrigger: boolean
  isLastStep: boolean
}>()
const emits = defineEmits<{
  (e: 'add-step', show: boolean): void
}>()

const id = new Date().getTime().toString()

const canAddStep = ref(true)
const hasSteps = ref(true)
// first item in the array is the trigger

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

type CookieData = {
  trigger: Trigger,
  steps: any[]
}
const cookies = useCookies(['workflow'])
const handleStoreTriggerStep = (trigger: Trigger) => {
  console.log({trigger})
  cookies.set('workflow', {trigger})
  activeStepStage.value = fantomTabsForStepCreationStage[1]
}
const getTriggerStep = () => {
  return cookies.get<CookieData>('workflow')?.trigger
}

const onBack = () => {
  activeStepStage.value=fantomTabsForStepCreationStage[0]
  cookies.remove('workflow') // TODO: should remove the one with the id
}

const handleStoreFunctionStep = (function_: Function) => {
  console.log({function_})
  const stepsCookie = cookies.get<CookieData>('workflow')?.steps
  console.log({stepsCookie})
  cookies.set('workflow', {steps: [...(stepsCookie ?? []), function_]})
  activeStepStage.value = fantomTabsForStepCreationStage[1]
}
const getFunctionStep = () => {
  // TODO: should search for the one with the id
  return cookies.get<CookieData>('workflow')?.steps[0]
}

const formToReturn = computed(()=>props.isTrigger ? getTriggerStep() : getFunctionStep())
</script>