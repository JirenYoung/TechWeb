import { ref, watchEffect } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const initTheme = () => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  watchEffect(applyTheme)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  initTheme()

  return { isDark, toggleTheme }
}
