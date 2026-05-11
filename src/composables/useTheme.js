import { ref, watchEffect } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const initTheme = () => {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  watchEffect(applyTheme)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  initTheme()

  return { isDark, toggleTheme }
}
