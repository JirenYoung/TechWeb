<template>
  <button
    @click="toggleTheme"
    class="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400 hover:bg-black/5 dark:hover:bg-white/10"
    :style="{ color: 'var(--text-secondary)' }"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <Transition name="theme-icon" mode="out-in">
      <svg v-if="isDark" key="moon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
      <svg v-else key="sun" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" stroke-width="1.5"/>
        <path stroke-linecap="round" stroke-width="1.5" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    </Transition>
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'
const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-icon-enter-active {
  animation: iconIn 0.3s ease-out;
}
.theme-icon-leave-active {
  animation: iconOut 0.2s ease-in;
}

@keyframes iconIn {
  from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
  to { opacity: 1; transform: rotate(0) scale(1); }
}
@keyframes iconOut {
  from { opacity: 1; transform: rotate(0) scale(1); }
  to { opacity: 0; transform: rotate(90deg) scale(0.5); }
}
</style>
