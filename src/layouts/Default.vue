<template>
  <div class="tw-min-h-[100svh]">
    <div class="tw-flex tw-h-full tw-overflow-x-hidden">
      <Nav
        :navItems="navItems"
        :class="{ 'tw-w-[220px] tw-min-w-[220px] tw-p-2':openMobileNav }"
        class="tw-w-0 tw-overflow-clip sm:tw-w-[220px] sm:tw-min-w-[220px]
        tw-transition-all tw-duration-300 sm:tw-p-2"
      />
      <main
        :class="{ 'tw-flex-none sm:tw-flex-auto':openMobileNav }"
        class="tw-min-h-[100svh]
        tw-flex-grow tw-transition-all tw-duration-300 tw-overflow-y-auto">
        <div
          class="sm:tw-hidden tw-flex tw-p-3
          tw-bg-primary/10 tw-text-xl tw-text-primary">
          <v-icon @click="openMobileNav=!openMobileNav">mdi-menu</v-icon>
        </div>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from '@/components/Nav.vue'
import { ref } from 'vue';
import { RouterView } from 'vue-router'

const openMobileNav = ref(false)
const navItems = [
  {
    name: 'Projects',
    path: '/',
    icon: 'mdi-package-variant-closed',
  },
  {
    name: 'Accounts',
    path: '/accounts',
    icon: 'mdi-key-variant',
  },
]
</script>