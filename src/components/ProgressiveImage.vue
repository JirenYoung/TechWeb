<template>
  <div class="relative overflow-hidden rounded-xl" :style="{ backgroundColor: 'var(--bg-tertiary)' }">
    <img
      v-if="loaded"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
      :class="{ 'animate-blur-in': animate }"
    />
    <div
      v-else
      class="absolute inset-0 animate-pulse"
      :style="{ backgroundColor: 'var(--bg-tertiary)' }"
    ></div>
    <img
      ref="preloadRef"
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
const animate = ref(false)
const preloadRef = ref(null)

const onLoad = () => {
  loaded.value = true
}

onMounted(() => {
  // 浏览器缓存命中：图片已完成加载，直接显示，跳过动画
  if (preloadRef.value && preloadRef.value.complete && preloadRef.value.naturalWidth > 0) {
    loaded.value = true
    animate.value = false
  } else {
    // 首次加载：正常播放渐入动画
    animate.value = true
  }
})
</script>