<template>
  <div class="tw-block">
    <div
      class="tw-bg-black-1 tw-text-white tw-flex sm:tw-items-center
      tw-p-3 tw-rounded-lg tw-gap-2">
      <div
        class="tw-flex-grow tw-flex tw-justify-between sm:tw-items-center
        tw-flex-col sm:tw-flex-row tw-items-start tw-gap-4">
        <p class="tw-text-sm">
          Hi, <em class="tw-not-italic tw-font-semibold">Sire</em> a lot of what
          you'll be doing here requires a private key. Lets help you get one.
        </p>
        <button
          @click="seedPhraseDialog = true"
          class="tw-ring-2 tw-ring-white hover:tw-ring-4 tw-bg-primary
          tw-text-sm tw-p-1.5 tw-px-3 tw-rounded-md tw-transition-all tw-duration-300">
          get me a private key
        </button>
      </div>
      <v-icon
        v-if="isDismissable"
        @click="handleNoticeDismiss"
        class="tw-cursor-pointer">
        mdi-close
      </v-icon>
    </div>

    <v-dialog
      v-model="seedPhraseDialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      @update:modelValue="(value: boolean) => {seedPhraseDialog = value; emits('update:modelValue', value)}">
      <v-card class="!tw-bg-primary">
        <SeedPhraseGen
          class="tw-mx-auto tw-text-white tw-py-10 px-6 sm:px-10"
          :onConfirm="onConfirm"
          :onBack="onBack"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import SeedPhraseGen from "@/components/SeedPhraseGen.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";

const props = defineProps<{
  modelValue?: boolean | undefined;
  isDismissable?: boolean;
}>();
const emits = defineEmits<{
  (e: "show-notice", show: boolean): void;
  (e: "update:modelValue", value: boolean): void;
}>();

const seedPhraseDialog = ref(false);
const modelRef = computed(()=>props.modelValue);
watch(modelRef, (value) => {
  seedPhraseDialog.value = value;
  emits("update:modelValue", value);
});
const onConfirm = ({ wallet }: { wallet: object }) => {
  console.log(wallet);
  seedPhraseDialog.value = false;
  emits("update:modelValue", false);
};
const onBack = () => {
  seedPhraseDialog.value = false;
  emits("update:modelValue", false);
};

type CookieData = {
  hasWallet: boolean;
  hasBeenDismissed: boolean;
};
const cookies = useCookies(["seedPhraseNotice"]);
const handleNoticeVisibility = async () => {
  emits("show-notice", false); // start with notice hidden

  const noticeCookie = cookies.get<CookieData>("seedPhraseNotice");
  // first check cookie to know if we locally know if user has wallet
  if (noticeCookie?.hasWallet) return;

  // make request to check if user has wallet
  const hasWalletBackend = false;
  if (hasWalletBackend) return;

  // if user doesn't have wallet, check if notice has been dismissed
  if (!props.isDismissable && !hasWalletBackend) {
    emits("show-notice", true);
    return;
  }

  if (
    props.isDismissable &&
    !noticeCookie?.hasBeenDismissed &&
    !hasWalletBackend
  ) {
    emits("show-notice", true);
    return;
  }
};
onMounted(handleNoticeVisibility);

const handleNoticeDismiss = () => {
  emits("show-notice", false);
  cookies.set("seedPhraseNotice", {
    hasWallet: false,
    hasBeenDismissed: true,
  });
};
</script>
