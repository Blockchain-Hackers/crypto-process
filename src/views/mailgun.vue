<template>
  <div class="tw-relative">
    <div
      class="tw-min-h-[100dvh] tw-flex tw-items-center tw-justify-center tw-max-w-2xl tw-mx-auto tw-p-6 sm:tw-p-10"
    >
      <div class="tw-space-y-10">
        <div class="tw-text-center">
          <h1 class="tw-text-5xl sm:tw-text-6xl tw-font-bold">
            <span class="tw-relative tw-z-10">Use MailGun</span>
            <span
              class="before:tw-block before:tw-absolute before:-tw-inset-1 before:-tw-skew-y-3 before:tw-bg-white tw-border-2 tw-border-black tw-relative tw-inline-block"
            >
              <span class="tw-relative tw-text-primary">Crypto Process.</span>
            </span>
          </h1>
        </div>

        <div class="tw-bg-white tw-p-3 sm:tw-p-6 tw-border">
          <div>
            <h2 class="tw-text-3xl tw-font-bold">Welcome back!</h2>
            <form @submit.prevent="handleMailGun" class="tw-mt-4 tw-text-xl">
              <label class="tw-relative tw-block">
                <span class="tw-absolute tw-text-base tw-pl-3 tw-pt-1"
                  >Enter your domain name</span
                >
                <input
                  v-model="form.domainname"
                  type=""
                  name="domainname"
                  placeholder="www.example.com"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black"
                />
              </label>

              <label class="tw-relative tw-block tw-mt-4">
                <span class="tw-absolute tw-text-base tw-pl-3 tw-pt-1"
                  >Enter your api key</span
                >
                <input
                  v-model="form.apikey"
                  type=""
                  name="apikey"
                  placeholder="XXXXXXXXXXXXXXX"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black"
                />
              </label>

              <label class="tw-relative tw-block tw-mt-4">
                <span class="tw-absolute tw-text-base tw-pl-3 tw-pt-1"
                  >Enter a username</span
                >
                <input
                  v-model="form.username"
                  type=""
                  name="username"
                  placeholder="user1"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black"
                />
              </label>

              <button
                class="tw-w-full tw-bg-primary tw-text-white tw-py-4 tw-mt-10 tw-rounded-md tw-font-medium hover:tw-ring-4 tw-ring-primary/30 transition-all tw-duration-300"
                :disabled="isLoading"
              >
                <template v-if="!isLoading"> Save </template>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="white"
                  size="20"
                  width="2"
                >
                </v-progress-circular>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <v-snackbar v-model="snackbar.show">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
// useHead({
//   title: 'Process - Login',
// })

const form = ref({
  domainname: "",
  apikey: "",
  username: "",
});
const showPassword = ref(false);

const snackbar = ref({
  show: false,
  text: "",
});

const router = useRouter();
const isLoading = ref(false);
const authStore = useAuthStore();
const handleMailGun = async () => {
  isLoading.value = true;

  axios
    .post("/v1/auth/mailgun", form.value)
    .then((res) => {
      authStore.login(res.data.data.access_token);
      snackbar.value.show = true;
      snackbar.value.text = res.data.message;
      isLoading.value = false;
      router.push("/");
    })
    .catch((err) => {
      isLoading.value = false;
      snackbar.value.show = true;
      snackbar.value.text = err.message;
    });

  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};
</script>
