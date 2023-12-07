<template>
  <form @submit.prevent="handleForm">
    <button>save and continue</button>
  </form>
</template>

<script setup lang="ts">

const props = defineProps<{
  fields: any[]
  onSubmit: (data: any) => void
}>()

const handleForm = () => {
  console.log('form submitted')
  props.onSubmit({})
}
</script>