<template>
  <div class="">
    <div
      class="tw-bg-gradient-to-r tw-from-primary/10 tw-to-transparent tw-p-5 tw-space-y-4"
    >
      <h1 class="tw-text-3xl">Create account <strong>to automate</strong></h1>
      <button
        class="tw-p-2 tw-px-3 tw-bg-primary tw-rounded-lg tw-text-white tw-ring-4 tw-ring-transparent hover:tw-ring-white tw-transition-all tw-duration-300"
      >
        Create account {{}}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

import SeedPhraseNotice from "@/components/SeedPhraseNotice.vue";
import WorkflowCreation from "@/components/WorkflowCreation.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const showNotice = ref(true);
const showWorkflowCreation = ref(false);
</script>
