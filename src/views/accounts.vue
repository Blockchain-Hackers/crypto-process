<template>
  <div class="">
    <div v-if="showNotice" class="tw-block tw-p-3">
      <SeedPhraseNotice
        class="tw-block tw-w-full"
        :is-dismissable="false"
        @showNotice="(show: boolean) => showNotice = show"
      />
    </div>

    <div class="tw-bg-gradient-to-r tw-from-orange-500/10 tw-to-transparent tw-p-5 tw-space-y-4">
      <h1 class="tw-text-3xl">Lets <strong>create the accounts</strong> you need to automate your tasks</h1>
      <button
        id="account-type"
        class="tw-p-2 tw-px-3 tw-bg-primary tw-rounded-lg tw-text-white tw-ring-4
        tw-ring-transparent hover:tw-ring-white tw-transition-all tw-duration-300">
        Create account
      </button>

      <v-menu activator="#account-type" transition="slide-y-transition">
        <ul class="tw-bg-white tw-p-1 tw-mt-2 tw-rounded-lg tw-flex tw-flex-col tw-gap-1">
          <li
            v-for="(item, index) in items"
            :key="index"
            :value="index"
            @click="selectedAccountType = item.slug"
            class="tw-p-2 tw-py-1 hover:tw-bg-primary/10 tw-rounded-md tw-cursor-pointer">
            {{ item.title }}
          </li>
        </ul>
      </v-menu>
    </div>

    <div class="tw-p-5">
      <div
        class="tw-border-4 tw-border-dashed tw-rounded-xl tw-h-60
        tw-flex tw-flex-col tw-items-center tw-justify-center">
        <v-icon class="!tw-text-7xl tw-text-gray-400">mdi-bat</v-icon>
        <p class="tw-text-gray-600 tw-font-medium">No accounts created yet</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SeedPhraseNotice from "@/components/SeedPhraseNotice.vue";

const route = useRoute();
const router = useRouter();

const showNotice = ref(true);

const accountsType = ref(["mailgun"]);
const selectedAccount = ref("mailgun");

// const navigateToMail = () => {
//   switch (selectedAccount.value) {
//     case "mailgun":
//       router.push("/mailgun");
//       break;
//     case "private key":
//       router.push("/privatekey");
//       break;

//     default:
//       break;
//   }
// };

const selectedAccountType = ref();
const items = [
  { title: 'Mailgun', slug: 'mailgun' },
  { title: 'Private key', slug: 'private-key' }
]
</script>
