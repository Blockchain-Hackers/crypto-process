<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      @update:modelValue="(value: boolean)=>emits('update:modelValue', value)"
      fullscreen :scrim="false">
      <v-card class="!tw-bg-white !tw-py-10 !tw-px-4">
        <div class="tw-mx-auto tw-flex tw-flex-col tw-gap-[72px]">
          <WorkflowItem
            v-for="(step,i) in steps" :key="i"
            :step="step"
            :isTrigger="i === 0"
            :isLastStep="i+1 === steps.length"
            @add-step="addStep"
            class=""
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import WorkflowItem from '@/components/WorkflowItem.vue';

const props = defineProps<{
  modelValue?: boolean
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
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

const stepCount = ref(1)
const steps = computed(()=>Array.from({length: stepCount.value}, (_,i)=>i+1))
const addStep = (show: boolean) => stepCount.value++
</script>