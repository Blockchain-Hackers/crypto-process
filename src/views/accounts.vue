<template>
  <div class="">
    <div v-if="showNotice" class="tw-p-3">
      <SeedPhraseNotice
        class="tw-block tw-w-full"
        @showNotice="handleNoticeVisibility"
      />
    </div>

    <div class="tw-p-3">
      <button
        class="tw-bg-primary tw-text-white tw-py-4 tw-mt-10 tw-rounded-md tw-font-medium hover:tw-ring-4 tw-ring-primary/30 transition-all tw-duration-300"
        style="width: 300px"
        @click="createAccount"
      >
        Create Account
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SeedPhraseNotice from "@/components/SeedPhraseNotice.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const showNotice = ref(true);
const handleNoticeVisibility = (show: boolean) => {
  console.log("handleNoticeVisibility", show);
  showNotice.value = show;
};

const createAccount = () => {
  console.log("create account");
};
</script>
