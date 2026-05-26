<template>
  <div class="tags-page">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">
      <header class="mb-12 md:mb-16 text-center opacity-0-start animate-fade-in">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4" :style="{ color: 'var(--text-primary)' }">
          <span class="char-by-char" style="visibility:hidden;">标签分类</span>
        </h1>
        <p class="text-base md:text-lg" :style="{ color: 'var(--text-tertiary)' }">
          {{ allTags.length }} 个标签 · {{ allArticles.length }} 篇文章
        </p>
      </header>

      <!-- 标签云 -->
      <div class="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-20 opacity-0-start animate-fade-in-up stagger-2">
        <button
          v-for="(tag, i) in allTags"
          :key="tag"
          @click="activeTag = tag === activeTag ? '' : tag"
          class="px-4 py-2 md:px-5 md:py-3 rounded-2xl border transition-all duration-400 btn-hover"
          :class="activeTag === tag ? '!bg-primary-500 !text-white !border-primary-500 shadow-lg shadow-primary-500/20' : ''"
          :style="activeTag !== tag ? {
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-secondary)',
            animationDelay: `${i * 0.05}s`
          } : {}"
        >
          <span class="text-xs md:text-sm font-medium">#{{ tag }}</span>
          <span v-if="activeTag !== tag" class="ml-1.5 text-xs opacity-50">{{ tagCounts[tag] }}</span>
        </button>
      </div>

      <!-- 筛选结果 -->
      <TransitionGroup
        name="tag-results"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="scroll-reveal"
        >
          <router-link
            :to="`/article/${article.id}`"
            class="block rounded-xl border p-4 md:p-5 card-hover"
            :style="{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }"
          >
            <div class="flex items-center gap-2 md:gap-3 text-xs mb-2" :style="{ color: 'var(--text-tertiary)' }">
              <time>{{ article.date }}</time>
              <span class="opacity-50">·</span>
              <span>{{ article.readTime }} 分钟</span>
            </div>
            <h3 class="text-sm md:text-base font-semibold leading-snug line-clamp-2 mb-2" :style="{ color: 'var(--text-primary)' }">
              {{ article.title }}
            </h3>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="text-xs px-2 py-0.5 rounded-full border"
                :class="tag === activeTag ? 'border-primary-500 text-primary-500 bg-primary-500/10' : ''"
                :style="tag !== activeTag ? { borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' } : {}"
              >
                {{ tag }}
              </span>
            </div>
          </router-link>
        </div>
      </TransitionGroup>

      <div
        v-if="filteredArticles.length === 0 && activeTag"
        class="text-center py-12 md:py-16"
        :style="{ color: 'var(--text-tertiary)' }"
      >
        <p class="text-base md:text-lg">该标签下暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useScrollReveal } from '@/composables/useAnimation'

const { allArticles, allTags } = useArticles()

const activeTag = ref('')

const tagCounts = computed(() => {
  const counts = {}
  allTags.value.forEach(tag => {
    counts[tag] = allArticles.value.filter(a => a.tags.includes(tag)).length
  })
  return counts
})

const filteredArticles = computed(() => {
  if (!activeTag.value) return allArticles.value
  return allArticles.value.filter(a => a.tags.includes(activeTag.value))
})

const { observe } = useScrollReveal()
watch(filteredArticles, () => {
  nextTick(() => observe())
})
</script>

<style scoped>
.tag-results-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.tag-results-leave-active {
  transition: all 0.25s ease-in;
}
.tag-results-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}
.tag-results-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
