<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out"
    :class="[
      isScrolled ? 'py-2 shadow-sm' : 'py-4',
      isScrolled && direction === 'down' ? '-translate-y-full' : 'translate-y-0'
    ]"
    :style="{
      backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: isScrolled ? 'var(--nav-blur)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'var(--nav-blur)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent'
    }"
  >
    <div class="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
      <router-link
        to="/"
        class="text-lg sm:text-xl font-bold tracking-tight transition-opacity duration-300 hover:opacity-70"
        :style="{ color: 'var(--text-primary)' }"
      >
        <span class="font-mono text-primary-500">&lt;</span>
        TechLog
        <span class="font-mono text-primary-500">/&gt;</span>
      </router-link>

      <!-- 桌面端导航 -->
      <div class="hidden md:flex items-center gap-8 text-sm font-medium">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link relative py-1 transition-colors duration-300"
          :style="{ color: 'var(--text-secondary)' }"
          active-class="!text-primary-500"
        >
          {{ item.label }}
          <span
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full transform scale-x-0 transition-transform duration-300 origin-left"
            :class="{ 'scale-x-100': $route.path === item.path }"
          ></span>
        </router-link>
      </div>

      <div class="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useScroll } from '@/composables/useScroll'
import ThemeToggle from '@/components/ThemeToggle.vue'

const { isScrolled, direction } = useScroll()

const navItems = [
  { label: '首页', path: '/' },
  { label: '文章', path: '/articles' },
  { label: '归档', path: '/archive' },
  { label: '标签', path: '/tags' },
  { label: '关于', path: '/about' },
]
</script>

<style scoped>
.nav-link:hover {
  color: var(--selection-bg) !important;
}
.nav-link:hover span {
  transform: scaleX(1);
}
</style>
