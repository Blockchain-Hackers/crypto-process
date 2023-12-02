<template>
  <div class="tw-min-h-[100svh]">
    <div class="tw-p-6">
      
      <button
        @click="seedPhraseDialog=true"
        class="tw-ring tw-ring-black tw-p-1">
        get seed phrase
      </button>
    </div>
    
    
    
    <v-row justify="center">
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
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SeedPhraseGen from '@/components/SeedPhraseGen.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()


const onConfirm = ({wallet}:{wallet:object}) => {
  console.log(wallet)
  seedPhraseDialog.value = false
}
const onBack = () => {
  seedPhraseDialog.value = false
}

const seedPhraseDialog = ref(false)
</script>