<template>
  <div class="tw-h-[100svh]">
    <div class="tw-flex tw-h-full">
      <Nav
        :navItems="navItems"
        class="tw-w-[220px] sm:tw-min-w-[220px]"
      />
      <main class="tw-flex-grow">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'

const navItems = [
  {
    name: 'Projects',
    path: '/',
    icon: 'mdi-package-variant-closed',
  },
  {
    name: 'Accounts',
    path: '/accounts',
    icon: 'mdi-key',
  },
]
</script>