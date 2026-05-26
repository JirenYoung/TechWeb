import { ref, watchEffect } from 'vue'

const isDark = ref(true)

export function useTheme() {
  const initTheme = () => {
    isDark.value = !window.matchMedia('(prefers-color-scheme: light)').matches
  }

  const applyTheme = () => {
    document.documentElement.classList.toggle('light', !isDark.value)
  }

  watchEffect(applyTheme)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  initTheme()

  return { isDark, toggleTheme }
}
