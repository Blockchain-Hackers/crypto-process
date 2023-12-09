<template>
  <div class="">
    <div v-if="showNotice" class="tw-block tw-p-3">
      <SeedPhraseNotice
        class="tw-block tw-w-full"
        :is-dismissable="true"
        @showNotice="(show: boolean) => showNotice = show"
      />
    </div>

    <div
      class="tw-bg-gradient-to-r tw-from-primary/10 tw-to-transparent tw-p-5 tw-space-y-4"
    >
      <h1 class="tw-text-3xl">View History of your workflow Runs</h1>

      <section class="tw-py-1 tw-bg-blueGray-50">
        <div
          class="tw-w-full tw-xl:w-8/12 tw-mb-12 tw-xl:mb-0 tw-px-4 tw-mx-auto"
        >
          <div
            class="tw-relative tw-flex tw-flex-col tw-min-w-0 tw-break-words tw-w-full tw-mb-6 tw-shadow-lg tw-rounded"
          >
            <div class="tw-rounded-t tw-mb-0 tw-px-4 tw-py-3 tw-border-0">
              <div class="tw-flex tw-flex-wrap tw-items-center">
                <div
                  class="tw-relative tw-w-full tw-px-4 tw-max-w-full tw-flex-grow tw-flex-1"
                >
                  <h3
                    class="tw-font-semibold tw-text-base tw-text-blueGray-700"
                  >
                    Workflow Runs
                  </h3>
                </div>
                <div
                  class="tw-relative tw-w-full tw-px-4 tw-max-w-full tw-flex-grow tw-flex-1 tw-text-right"
                >
                  <!-- <button
                    class="tw-bg-indigo-500 tw-text-white tw-active:bg-indigo-600 tw-text-xs tw-font-bold tw-uppercase tw-px-3 tw-py-1 tw-rounded tw-outline-none tw-focus:outline-none tw-mr-1 tw-mb-1 tw-ease-linear tw-transition-all tw-duration-150"
                    type="button"
                  >
                    See all
                  </button> -->
                </div>
              </div>
            </div>

            <div class="tw-block tw-w-full tw-overflow-x-auto">
              <table
                class="tw-items-center tw-bg-transparent tw-w-full tw-border-collapse"
              >
                <thead>
                  <tr>
                    <th
                      class="tw-px-6 tw-bg-blueGray-50 tw-text-blueGray-500 tw-align-middle tw-border tw-border-solid tw-border-blueGray-100 tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left"
                    >
                      Workflow name
                    </th>
                    <th
                      class="tw-px-6 tw-bg-blueGray-50 tw-text-blueGray-500 tw-align-middle tw-border tw-border-solid tw-border-blueGray-100 tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left"
                    >
                      Steps
                    </th>
                    <th
                      class="tw-px-6 tw-bg-blueGray-50 tw-text-blueGray-500 tw-align-middle tw-border tw-border-solid tw-border-blueGray-100 tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left"
                    >
                      Status
                    </th>
                    <th
                      class="tw-px-6 tw-bg-blueGray-50 tw-text-blueGray-500 tw-align-middle tw-border tw-border-solid tw-border-blueGray-100 tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left"
                    >
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="run in runs" :key="run._id">
                    <th
                      class="tw-border-t-0 tw-px-6 tw-align-middle tw-border-l-0 tw-border-r-0 tw-text-xs tw-whitespace-nowrap tw-p-4 tw-text-left tw-text-blueGray-700"
                    >
                      <router-link :to="`/history/${run._id}`">
                        {{ run.flow_name }}
                      </router-link>
                    </th>
                    <td
                      class="tw-border-t-0 tw-px-6 tw-align-middle tw-border-l-0 tw-border-r-0 tw-text-xs tw-whitespace-nowrap tw-p-4"
                    >
                      {{ run.steps.length }}
                    </td>
                    <td
                      class="tw-border-t-0 tw-px-6 tw-align-center tw-border-l-0 tw-border-r-0 tw-text-xs tw-whitespace-nowrap tw-p-4"
                    >
                      {{
                        run.steps.every((x) => x.success) ? "Success" : "Failed"
                      }}
                    </td>
                    <td
                      class="tw-border-t-0 tw-px-6 tw-align-middle tw-border-l-0 tw-border-r-0 tw-text-xs tw-whitespace-nowrap tw-p-4"
                    >
                      <i
                        class="tw-fas tw-fa-arrow-up tw-text-emerald-500 tw-mr-4"
                      ></i>
                      {{ run.created_at }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import SeedPhraseNotice from "@/components/SeedPhraseNotice.vue";
import WorkflowCreation from "@/components/WorkflowCreation.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import Cookies from "universal-cookie";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const showNotice = ref(true);
const showWorkflowCreation = ref(false);

// get all runs on mounted
const runs = ref<
  {
    _id: string;
    steps: { success: boolean }[];
    flow_name: string;
    created_at: string;
  }[]
>([]);

onMounted(() => {
  const token = authStore.token;
  axios
    .get("/v1/flows/runs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      runs.value = res.data.data;
    });
});
</script>
