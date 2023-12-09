<template>
  <label class="tw-text-base">
    <span class="tw-inline-block">{{ field?.hint ?? field.name }}</span>
    <template v-if="field.formElement === 'object'">
      <span
        @click="addKeyValue"
        type="button"
        class="tw-h-6 tw-w-6 tw-rounded-full
        tw-ml-3 tw-mb-2 tw-cursor-pointer">
        <v-icon>mdi-plus</v-icon>
      </span>
      <div class="tw-flex tw-flex-col tw-gap-2">
        <div v-for="(each,i) in value" class="tw-flex tw-gap-2 tw-items-center">
          <div class="tw-flex tw-w-full tw-gap-2">
            <input
              v-model="each.key"
              type="text"
              placeholder="key"
              :class="elementClass"
              class="tw-w-full"
            />
            <input
              v-model="each.value"
              :type="field.formType"
              placeholder="value"
              :class="elementClass"
              class="tw-w-full"
            />
          </div>
          <span
            @click="removeKeyValue(i)"
            v-if="value.length > 1"
            class="tw-h-6 tw-w-6 tw-rounded-full tw-cursor-pointer">
            <v-icon>mdi-minus</v-icon>
          </span>
        </div>
      </div>
    </template>

    <template v-else-if="field.formElement === 'textarea'">
      <textarea
        v-model="value"
        :placeholder="field?.hint ?? field.name"
        :class="elementClass"
        class="tw-w-full tw-max-h-40 tw-min-h-[60px]"
      ></textarea>
    </template>

    <template v-else-if="field.formElement === 'select'">
      <select
        v-model="value"
        :placeholder="field?.hint ?? field.name"
        :class="elementClass"
        class="tw-w-full">
        <option value="" disabled selected>Select {{ field.name }}</option>
        <option
          v-for="option in field.options" :key="option.name">
          {{ option.name }}
        </option>
      </select>
    </template>

    <template v-else-if="field.formType === 'checkbox'">
      <span :class="elementClass" class="tw-flex tw-gap-2 tw-items-center">
        <input
          v-model="value"
          :type="field.formType"
          :placeholder="field?.hint ?? field.name"
        />
        {{ field.name }}
      </span>
    </template>

    <template v-else-if="field.formType === 'radio'">
      <span :class="elementClass" class="tw-flex tw-gap-2 tw-items-center">
        <input
          v-model="value"
          :type="field.formType"
          :placeholder="field?.hint ?? field.name"
        />
        {{ field.name }}
      </span>
    </template>

    <template v-else>
      <input
        v-model="value"
        :type="field.formType"
        :placeholder="field?.hint ?? field.name"
        :class="elementClass"
        class="tw-w-full"
      />
    </template>
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

const elementClass = 'tw-ring-1 tw-ring-gray-300 tw-px-2 tw-py-1 tw-rounded-md tw-outline-none'

const value = ref(props.modelValue)
watch(value, (newValue) => {
  if(!newValue && props.field.formType !== 'checkbox') return // checkboxes would need to be able to be unchecked, thus newValue would be false
  emits('update:modelValue', newValue)
}, { immediate: true, deep: true })

const addKeyValue = () => {
  value.value.push({key:'',value:''})
}
const removeKeyValue = (index: number) => {
  value.value.splice(index, 1)
}
</script>