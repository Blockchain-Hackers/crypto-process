<template>
  <div class="">
    <div v-if="showNotice" class="tw-p-3">
      <SeedPhraseNotice
        class="tw-block tw-w-full"
        :showNotice="(show: boolean) => showNotice = show"
      />
    </div>

    <div>
      something
    </div>
    
  </div>
</template>

<script setup lang="ts">
import SeedPhraseNotice from '@/components/SeedPhraseNotice.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const showNotice = ref(true)
</script>