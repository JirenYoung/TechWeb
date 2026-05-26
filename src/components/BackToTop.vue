<template>
  <Transition name="back-to-top">
    <button
      v-show="show"
      @click="scrollToTop"
      class="fixed z-40 w-9 h-9 rounded-full flex items-center justify-center btn-hover backdrop-blur-md border bottom-20 right-4 md:bottom-8 md:right-8 md:w-10 md:h-10"
      :style="{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-secondary)',
        boxShadow: 'var(--card-shadow)'
      }"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)

const handleScroll = () => {
  show.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top-enter-active {
  animation: bttIn 0.3s ease-out;
}
.back-to-top-leave-active {
  animation: bttOut 0.2s ease-in;
}

@keyframes bttIn {
  from { opacity: 0; transform: translateY(16px) scale(0.8); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes bttOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(16px) scale(0.8); }
}
</style>
