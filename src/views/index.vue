<template>
  <div class="">
    <div class="tw-block tw-p-3">
      <SeedPhraseNotice
        class="tw-block tw-w-full"
        :is-dismissable="true"
      />
    </div>
    
    <div>
      home
    </div>
  </div>
</template>

<script setup lang="ts">
import SeedPhraseNotice from '@/components/SeedPhraseNotice.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
</script>