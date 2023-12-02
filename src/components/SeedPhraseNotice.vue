<template>
  <div class="tw-block">
    <div
      class="tw-bg-black-1 tw-text-white tw-flex sm:tw-items-center
      tw-p-3 tw-rounded-lg tw-gap-2">
      <div
        class="tw-flex-grow tw-flex tw-justify-between sm:tw-items-center
        tw-flex-col sm:tw-flex-row tw-items-start tw-gap-4">
        <p class="tw-text-sm">
          Hi, <em class="tw-not-italic tw-font-semibold">Sire</em> a lot of what you'll be doing here requires a private key.
          Lets help you get one.
        </p>
        <button
          @click="seedPhraseDialog=true"
          class="tw-ring-2 tw-ring-white tw-bg-primary tw-text-sm
          tw-p-1.5 tw-px-3 tw-rounded-md">
          get me a private key
        </button>
      </div>
      <v-icon v-if="isDismissable" class="">mdi-close</v-icon>
    </div>

    <v-dialog
      v-model="seedPhraseDialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition">
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
import SeedPhraseGen from '@/components/SeedPhraseGen.vue';
import { ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies'

const props = defineProps<{
  isDismissable?: boolean
}>()

const seedPhraseDialog = ref(false)
const onConfirm = ({wallet}:{wallet:object}) => {
  console.log(wallet)
  seedPhraseDialog.value = false
}
const onBack = () => {
  seedPhraseDialog.value = false
}

const cookies = useCookies(['seedPhraseNotice'])
// fields
// noticeVisibility: boolean
// hasWallet: boolean

// handle notice dismissability

// store dismiss state in cookie

// if cookie is set, don't show notice, but only if dismissable is true
// or if user has created a wallet|private key
</script>