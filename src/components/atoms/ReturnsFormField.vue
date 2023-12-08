<template>
  <label class="tw-text-base">
    <span class="tw-block">{{ field?.hint ?? field.name }}</span>
    <template v-if="field.formElement === 'object'">
      <div class="tw-flex tw-gap-2">
        <input
          v-model="value.key"
          type="text"
          placeholder="key"
          :class="elementClass"
          class="tw-flex-1"
        />
        <input
          v-model="value.value"
          :type="field.formType"
          placeholder="value"
          :class="elementClass"
          class="tw-flex-1"
        />
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

</script>