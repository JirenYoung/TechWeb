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
    <div class="max-w-5xl mx-auto px-6 flex items-center justify-between">
      <router-link
        to="/"
        class="text-xl font-bold tracking-tight transition-opacity duration-300 hover:opacity-70"
        :style="{ color: 'var(--text-primary)' }"
      >
        <span class="font-mono text-primary-500">&lt;</span>
        TechLog
        <span class="font-mono text-primary-500">/&gt;</span>
      </router-link>

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

      <div class="flex items-center gap-4">
        <ThemeToggle />
        <button
          class="md:hidden p-2 -mr-2 transition-colors duration-300 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
          :style="{ color: 'var(--text-primary)' }"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="!mobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileMenuOpen"
        class="md:hidden overflow-hidden"
        :style="{ borderTop: '1px solid var(--border-color)' }"
      >
        <div class="px-6 py-4 space-y-3">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block py-2 text-sm font-medium transition-colors duration-300 opacity-0-start animate-fade-in-up"
            :class="staggerClasses[item.path]"
            :style="{ color: $route.path === item.path ? 'var(--selection-bg)' : 'var(--text-secondary)' }"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll } from '@/composables/useScroll'
import ThemeToggle from '@/components/ThemeToggle.vue'

const { isScrolled, direction } = useScroll()
const mobileMenuOpen = ref(false)

const navItems = [
  { label: '首页', path: '/' },
  { label: '文章', path: '/articles' },
  { label: '归档', path: '/archive' },
  { label: '标签', path: '/tags' },
  { label: '关于', path: '/about' },
]

const staggerClasses = {
  '/': 'stagger-1',
  '/articles': 'stagger-2',
  '/archive': 'stagger-3',
  '/tags': 'stagger-4',
  '/about': 'stagger-5',
}
</script>

<style scoped>
.nav-link:hover {
  color: var(--selection-bg) !important;
}
.nav-link:hover span {
  transform: scaleX(1);
}

.mobile-menu-enter-active {
  animation: mobileMenuIn 0.3s ease-out;
}
.mobile-menu-leave-active {
  animation: mobileMenuOut 0.2s ease-in;
}

@keyframes mobileMenuIn {
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 300px; }
}
@keyframes mobileMenuOut {
  from { opacity: 1; max-height: 300px; }
  to { opacity: 0; max-height: 0; }
}
</style>
