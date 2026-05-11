<template>
  <div class="relative overflow-hidden rounded-xl" :style="{ backgroundColor: 'var(--bg-tertiary)' }">
    <img
      v-if="loaded"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover animate-blur-in"
    />
    <div
      v-else
      class="absolute inset-0 animate-pulse"
      :style="{ backgroundColor: 'var(--bg-tertiary)' }"
    ></div>
    <img
      v-show="!loaded"
      :src="src"
      :alt="alt"
      class="absolute inset-0 w-full h-full object-cover opacity-0"
      @load="onLoad"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: String,
  alt: String
})

const loaded = ref(false)

const onLoad = () => {
  loaded.value = true
}
</script>
