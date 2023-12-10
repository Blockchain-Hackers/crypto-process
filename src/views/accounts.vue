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


    <v-dialog v-model="showCreationForm" width="500" persistent class="">
      <button>
        <v-icon
          @click="showCreationForm = false"
          class="tw-cursor-pointer tw-absolute -tw-top-4 tw-z-10
          tw-rounded-full tw-bg-white !tw-h-10 !tw-w-10">
          mdi-close
        </v-icon>
      </button>
      <v-card class="!tw-rounded-lg">
        <div class="tw-bg-white tw-p-3 sm:tw-p-6">
          <div>
            <h2 class="tw-text-xl tw-font-bold">Create a mailgun account with us</h2>
            <form @submit.prevent="createMailgunAccount" class="tw-mt-4 tw-text-base">
              <label class="tw-relative tw-block">
                <span class="tw-absolute tw-text-base tw-pl-3 tw-pt-1">
                  Enter your domain name
                </span>
                <input
                  v-model="mailgunForm.domainname"
                  type="url"
                  name="domainname"
                  placeholder="www.example.com"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black"
                />
              </label>

              <label class="tw-relative tw-block tw-mt-4">
                <span class="tw-absolute tw-text-base tw-pl-3 tw-pt-1">
                  Enter your api key
                </span>
                <input
                  v-model="mailgunForm.apikey"
                  type="text"
                  name="apikey"
                  placeholder="XXXXXXXXXXXXXXX"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black"
                />
              </label>

              <label class="tw-relative tw-block tw-mt-4">
                <span class="tw-absolute tw-text-base tw-pl-3 tw-pt-1">
                  Enter a username
                </span>
                <input
                  v-model="mailgunForm.username"
                  type="text"
                  name="username"
                  placeholder="user1"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black"
                />
              </label>

              <button
                class="tw-w-full tw-bg-primary tw-text-white tw-py-4 tw-mt-10 tw-rounded-md
                tw-font-medium hover:tw-ring-4 tw-ring-primary/30 transition-all tw-duration-300"
                :disabled="creatingAccount">
                <template v-if="!creatingAccount">Create</template>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="white"
                  size="20"
                  width="2">
                </v-progress-circular>
              </button>
            </form>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import SeedPhraseNotice from "@/components/SeedPhraseNotice.vue";
import { useAuthStore } from "@/stores/auth";
import type { Account } from "@/types/auth";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();

const showNotice = ref(true);
const noticeModel = ref<boolean>();
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

const mailgunForm = ref({
  domainname: "",
  apikey: "",
  username: "",
});
const creatingAccount = ref(false);
const createMailgunAccount = async () => {
  creatingAccount.value = true;
  const id = toast.loading("creating your mailgun account...", {
    position: toast.POSITION.TOP_RIGHT,
  });

  authStore.createMailgunAccount({
    domain: mailgunForm.value.domainname,
    apiKey: mailgunForm.value.apikey,
    username: mailgunForm.value.username,
  }).then((res) => {
    toast.update(id, {
      render: "mailgun account created",
      type: "success",
      isLoading: false,
    });
    showCreationForm.value = false;
    // clear form
    mailgunForm.value = {
      domainname: "",
      apikey: "",
      username: "",
    };
  }).catch((err) => {
    toast.update(id, {
      render: "mailgun account creation failed",
      type: "error",
      isLoading: false,
    });
    console.log(err);
  }).finally(() => {
    creatingAccount.value = false;
    setTimeout(() => toast.remove(id), 1000);
  });
};
</script>
