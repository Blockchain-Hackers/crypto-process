<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      @update:modelValue="(value: boolean)=>emits('update:modelValue', value)"
      fullscreen :scrim="false">
      <div class="tw-bg-gray-50 tw-px-3 tw-py-2">
        <div class="tw-text-primary tw-max-w-[600px] tw-mx-auto tw-text-xl tw-flex tw-justify-between">
          <h2 class="tw-font-bold">Create a Workflow</h2>
          <v-icon
            class="tw-cursor-pointer"
            @click="closeDialog" >
            mdi-close
          </v-icon>
        </div>
      </div>

      <v-card
        class="!tw-bg-gray-50 !tw-pt-10 !tw-px-4
        !tw-flex !tw-flex-col sm:!tw-items-center !tw-gap-[72px]">
        <WorkflowItem
          :step="trigger"
          :isTrigger="true"
          :isLastStep="steps.length === 0"
          @add-step="addStep"
        />
        <WorkflowItem
          v-for="(step,i) in steps" :key="i"
          :step="step"
          :isTrigger="false"
          :isLastStep="i+1 === steps.length"
          @add-step="addStep"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import WorkflowItem from '@/components/WorkflowItem.vue';
import { useTriggerStore } from '@/stores/triggers';
import { useFunctionsStore } from '@/stores/functions';
import { useWorkflowStore } from '@/stores/workflow';

const props = defineProps<{
  modelValue?: boolean
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const triggerStore = useTriggerStore()
// prevent fetching triggers repeatedly
if(!triggerStore.hasTriggers) triggerStore.fetchTriggers()
const functionsStore = useFunctionsStore()
if(!functionsStore.hasFunctions) functionsStore.fetchFunctions()


const dialog = ref(props.modelValue)
const modelValueRef = computed(()=>props.modelValue)
watch(modelValueRef, value => {
  dialog.value = value
  emits('update:modelValue', value)
})
const closeDialog = () => {
  dialog.value = false
  emits('update:modelValue', false)
}

const workflowStore = useWorkflowStore()
const trigger = computed(()=>workflowStore.workflows.trigger)
const steps = computed(()=>workflowStore.workflows.steps)
const addStep = () => workflowStore.createNextStep()
</script>