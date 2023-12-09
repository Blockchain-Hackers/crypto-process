<template>
  <form
    @submit.prevent="handleForm"
    class="tw-flex tw-flex-col tw-gap-4">
    <ReturnsFormField
      v-for="field in fieldsWithValueRef" :key="field.name"
      v-model="field.valueRef"
      :field="field"
      class="tw-w-full"
    />
    <div
      class="tw-flex tw-gap-3 tw-text-base tw-mt-3 [&>*]:tw-flex-grow
      [&>*]:tw-px-2 [&>*]:tw-py-1 [&>*]:tw-rounded-md">
      <button type="button" class="">cancel</button>
      <button class="tw-bg-primary tw-text-white">save and continue</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import ReturnsFormField from '@/components/atoms/ReturnsFormField.vue';
import type { TriggerParameter, FunctionParameter } from '@/types/workflow'
import { ref } from 'vue';

const props = defineProps<{
  fields: TriggerParameter[] | FunctionParameter[]
  onSubmit: (data: any) => void
}>()

const handleForm = () => {
  console.log('form submitted')
  props.onSubmit({fieldsWithValueRef:fieldsWithValueRef.value})
}

const fieldsWithValueRef = ref(props.fields.map((field) => {
  return {
    ...field,
    valueRef: field.formElement === 'object' ? [{key:'',value:''}] : ''
  }
}))
</script>