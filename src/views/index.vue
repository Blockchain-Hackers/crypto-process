<template>
  <div class="">
    <div v-if="showNotice" class="tw-block tw-p-3">
      <SeedPhraseNotice
        class="tw-block tw-w-full"
        :is-dismissable="true"
        @showNotice="(show: boolean) => showNotice = show"
      />
    </div>
    
    <div class="tw-text-5xl">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fugit commodi delectus est cum iusto tenetur accusamus facilis beatae aut quas animi consequatur porro dignissimos aliquid, pariatur dolore saepe? Sed molestiae explicabo doloribus! Debitis suscipit velit nihil quia, et voluptate eligendi facere quibusdam! Quasi maxime alias temporibus cupiditate cumque, totam dolor sit soluta quis illo sed animi ipsum, eaque perferendis tempora unde vero architecto. Quis totam ea quo maiores? Doloribus vel dolorem magnam sunt impedit atque nihil quod sed aut autem delectus laudantium omnis, consectetur esse laboriosam quam corrupti optio earum nostrum rerum magni praesentium quas voluptates amet? Tempora, corporis!
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