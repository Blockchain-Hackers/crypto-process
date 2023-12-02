<template>
  <div class="">
    <div class="tw-p-3">
      <SeedPhraseNotice />
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
</script>