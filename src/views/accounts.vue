<template>
  <div class="">
    <div v-if="showNotice" class="tw-block tw-p-3">
      <SeedPhraseNotice
        v-model="noticeModel"
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
            v-for="(item, index) in accountTypes"
            :key="index"
            :value="index"
            @click="handleSelectAccountType(item.slug)"
            class="tw-p-2 tw-py-1 hover:tw-bg-primary/10 tw-rounded-md tw-cursor-pointer">
            {{ item.title }}
          </li>
        </ul>
      </v-menu>
    </div>

    <div class="tw-p-5">
      <div class="">
        <h2 class="tw-font-medium tw-text-lg tw-mb-2">All your accounts would be listed below</h2>
        <div
          v-for="(account,i) in authStore.getAccounts" :key="i"
          class="tw-border-b tw-border-gray-300 last-of-type:tw-border-b-0 tw-bg-white tw-p-1">
          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-flex tw-flex-wrap">
              <v-icon class="!tw-text-4xl !tw-text-orange-500">mdi-text-account</v-icon>
              <div class="tw-text-lg tw-ml-3 sm:tw-flex tw-gap-4">
                <div>
                  <h2 class="tw-font-medium">{{ account.name }}</h2>
                  <p class="tw-text-gray-500 tw-text-sm">{{ account.type }}</p>
                </div>
                <!-- <p>gismozfexie@yahoo.com</p> -->
              </div>
            </div>
            <div class="tw-flex tw-items-center">
              <v-icon
                @click="handleDeleteAccount(account)"
                class="tw-cursor-pointer !tw-text-primary/50 hover:!tw-text-black">
                mdi-delete
              </v-icon>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!hasAccounts"
        class="tw-border-4 tw-border-dashed tw-rounded-xl tw-h-60
        tw-flex tw-flex-col tw-items-center tw-justify-center">
        <v-icon class="!tw-text-7xl tw-text-gray-400">mdi-bat</v-icon>
        <p class="tw-text-gray-600 tw-font-medium">No accounts created yet</p>
      </div>
    </div>

    <v-dialog
      v-model="showCreationForm" width="500" persistent>
      <v-card>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt suscipit unde tempore culpa molestias, quisquam corrupti ex tempora consequatur totam accusantium. Maiores eveniet cumque laudantium, facere rem repudiandae reprehenderit exercitationem sint magni animi quos ipsam a quas itaque. Repudiandae dolor minus rerum ipsum sed incidunt. Laudantium culpa exercitationem aspernatur!
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SeedPhraseNotice from "@/components/SeedPhraseNotice.vue";
import { useAuthStore } from "@/stores/auth";
import type { Account } from "@/types/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const showNotice = ref(true);
const noticeModel = ref<boolean>();

// const navigateToMail = () => {
//   switch (selectedAccount.value) {
//     case "mailgun":
//       router.push("/mailgun");
//       break;
//   }
// };

const selectedAccountType = ref();
const accountTypes = [
  { title: 'Mailgun', slug: 'mailgun' },
  { title: 'Private key', slug: 'private-key' }
]

const hasAccounts = computed(()=>authStore.getAccounts.length > 0)
const handleDeleteAccount = (account: Account) => {
  authStore.deleteAccount({ accountId: account._id })
}

const handleSelectAccountType = (slug: string) => {
  selectedAccountType.value = slug
  if(slug === accountTypes[1].slug) return noticeModel.value = true
  showCreationForm.value = true
}
const showCreationForm = ref(false)
</script>
