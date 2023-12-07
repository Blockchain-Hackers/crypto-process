<template>
  <label class="tw-text-base">
    <span class="">{{ field.name }}</span>
    <input
      v-model="value"
      :type="field.type"
      :placeholder="field.name"
      class="tw-w-full tw-ring-1 tw-ring-gray-300 tw-px-2 tw-py-1
      tw-rounded-md tw-outline-none"
    />
  </label>
</template>

<script setup lang="ts">
import type { TriggerParameter, FunctionParameter } from '@/types/workflow'
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: any
  field: TriggerParameter | FunctionParameter
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const value = ref(props.modelValue)
watch(value, (newValue) => {
  if(!newValue) return
  emits('update:modelValue', newValue)
}, { immediate: true })
</script>