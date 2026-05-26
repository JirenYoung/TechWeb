<template>
  <nav
    class="md:hidden fixed bottom-0 left-0 right-0 z-50"
    :style="{
      backgroundColor: 'var(--nav-bg)',
      backdropFilter: 'var(--nav-blur)',
      WebkitBackdropFilter: 'var(--nav-blur)',
      borderTop: '1px solid var(--border-color)',
      paddingBottom: 'env(safe-area-inset-bottom, 0)'
    }"
  >
    <div class="flex items-center justify-around h-14 px-2">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 py-1 transition-colors duration-300 rounded-lg tap-none"
        :class="$route.path === item.path ? 'text-primary-500' : ''"
        :style="{ color: $route.path === item.path ? '#4c6ef5' : 'var(--text-tertiary)' }"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-[10px] font-medium leading-none">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { h } from 'vue'

const svg = (d, attrs = {}) =>
  h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', ...attrs }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.75', d })
  ])

const navItems = [
  {
    label: '首页',
    path: '/',
    icon: { render: () => svg('M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1') }
  },
  {
    label: '文章',
    path: '/articles',
    icon: { render: () => svg('M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z') }
  },
  {
    label: '归档',
    path: '/archive',
    icon: { render: () => svg('M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4') }
  },
  {
    label: '标签',
    path: '/tags',
    icon: { render: () => svg('M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z') }
  },
  {
    label: '关于',
    path: '/about',
    icon: { render: () => svg('M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14v-4m0-4h.01') }
  },
]
</script>

<style scoped>
.tap-none {
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
}
</style>
