<template>
  <router-link
    :to="`/article/${article.id}`"
    class="group block rounded-2xl overflow-hidden card-hover shimmer-card border"
    :style="{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }"
  >
    <div class="relative overflow-hidden aspect-[16/9]">
      <ProgressiveImage
        :src="article.cover"
        :alt="article.title"
        class="w-full h-full"
      />
      <div class="absolute top-3 left-3 flex gap-2">
        <span
          v-for="tag in article.tags.slice(0, 3)"
          :key="tag"
          class="px-2.5 py-0.5 text-xs font-medium rounded-full backdrop-blur-md border border-white/20 text-white/90"
        >
          {{ tag }}
        </span>
      </div>
      <div
        v-if="article.featured"
        class="absolute top-3 right-3 px-2.5 py-0.5 text-xs font-medium rounded-full backdrop-blur-md border border-primary-400/50 text-primary-200"
      >
        精选
      </div>
    </div>
    <div class="p-5">
      <div class="flex items-center gap-3 text-xs mb-2.5" :style="{ color: 'var(--text-tertiary)' }">
        <time>{{ article.date }}</time>
        <span class="opacity-50">·</span>
        <span>{{ article.readTime }} 分钟阅读</span>
      </div>
      <h3
        class="text-lg font-semibold leading-snug mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-primary-500"
        :style="{ color: 'var(--text-primary)' }"
      >
        {{ article.title }}
      </h3>
      <p class="text-sm line-clamp-2 leading-relaxed" :style="{ color: 'var(--text-tertiary)' }">
        {{ article.excerpt }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import ProgressiveImage from '@/components/ProgressiveImage.vue'

defineProps({
  article: Object
})
</script>
