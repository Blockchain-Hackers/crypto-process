<template>
  <div class="">
    <div v-if="showNotice" class="tw-block tw-p-3">
      <SeedPhraseNotice
        class="tw-block tw-w-full"
        :is-dismissable="false"
        @showNotice="(show: boolean) => showNotice = show"
      />
    </div>

    <div
      class="tw-bg-gradient-to-r tw-from-primary/10 tw-to-transparent tw-p-5 tw-space-y-4"
    >
      <h1 class="tw-text-3xl">Create account <strong>to automate</strong></h1>
      <button
        @click="showDialog = true"
        class="tw-p-2 tw-px-3 tw-bg-primary tw-rounded-lg tw-text-white tw-ring-4 tw-ring-transparent hover:tw-ring-white tw-transition-all tw-duration-300"
      >
        Create account {{}}
      </button>
    </div>
    <v-dialog
      v-model="showDialog"
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card class="!tw-bg-primary tw-px-8">
        <div class="text-center">
          <v-select
            v-model="selectedAccount"
            :items="accountsType"
            label="Account Type"
            style="color: white"
          ></v-select>
          <v-menu :selectedAccount="selectedAccount">
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card>
      <!-- <v-card class="!tw-bg-primary"> Hello </v-card> -->
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SeedPhraseNotice from '@/components/SeedPhraseNotice.vue';

const route = useRoute();
const router = useRouter();

const showNotice = ref(true);
const showDialog = ref(false);
const showWorkflowCreation = ref(false);
const items = ref([
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me 2" },
]);

const accountsType = ref(["mailgun", "private key"]);
const selectedAccount = ref("mailgun");
</script>
