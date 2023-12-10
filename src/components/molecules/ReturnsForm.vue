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
      <button
        class="tw-bg-primary tw-text-white disabled:tw-bg-primary/40
        disabled:tw-text-black disabled:tw-cursor-not-allowed"
        :disabled="!formIsFilled">
        save and continue
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import ReturnsFormField from '@/components/atoms/ReturnsFormField.vue';
import type { TriggerParameter, FunctionParameter } from '@/types/workflow'
import { computed, ref } from 'vue';

const props = defineProps<{
  fields: (TriggerParameter | FunctionParameter)[]
  onSubmit: (data: any) => void
}>()

const handleForm = () => {
  props.onSubmit({formData:fieldsWithValueRef.value})
}

const fieldsWithValueRef = ref(props.fields.map((field) => {
  return {
    ...field,
    valueRef: field.formElement === 'object' ?
      field?.valueRef ?? [{key:'',value:''}] :
      field?.valueRef ?? ''
  }
}))

const check = (field:string|number|boolean)=>{
  return field !== '' && field !== undefined && field !== null
}
const formIsFilled = computed(() => {
  return fieldsWithValueRef.value.every((field) => {
    if(field.formElement === 'object') {
      return field.valueRef.every((obj:{key:string,value:any}) => check(obj.key) && check(obj.value))
    }
    return check(field.valueRef)
  })
})
</script>