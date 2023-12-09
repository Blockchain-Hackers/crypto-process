<template>
  <div class="">
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
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card class="!tw-bg-primary">
        Hello

        <div class="text-center">
          <v-select
            v-model="location"
            :items="locations"
            label="Location"
          ></v-select>
          <v-menu :location="location">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark v-bind="props"> Dropdown </v-btn>
            </template>

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
const showDialog = ref(false);
const showWorkflowCreation = ref(false);
const items = ref([
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me 2" },
]);

const locations = ref(["top", "bottom", "start", "end", "center"]);
const location = ref("end");
</script>
