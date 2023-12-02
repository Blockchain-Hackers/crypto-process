<template>
  <nav class="tw-bg-[#212121] tw-p-2 tw-text-sm">
    <ul>
      <li v-for="item in navItems" :key="item.name">
        <router-link
          :to="item.path"
          class="tw-flex tw-items-center tw-justify-between tw-gap-2
          tw-p-2 tw-rounded-md tw-bg-transparent
          hover:tw-bg-white/5 tw-transition-colors tw-duration-200"
          :class="{'!tw-bg-white/10': isActive(item.path)}">
          <v-icon
            class="tw-text-white/30"
            :class="{'!tw-text-white': isActive(item.path)}">
            {{ item.icon }}
          </v-icon>
          <span
            class="tw-flex-grow tw-text-white/80"
            :class="{'!tw-text-white': isActive(item.path)}">
            {{ item.name }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  navItems: {
    name: string
    path: string
    icon: string
  }[]
}>()

const route = useRoute()
const router = useRouter()

const isActive = computed(()=>(path:string)=>route.path === path)
</script>