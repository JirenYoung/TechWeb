<template>
  <div class="articles-page">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">
      <!-- 页头 -->
      <header class="mb-10 md:mb-16 text-center opacity-0-start animate-fade-in">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4" :style="{ color: 'var(--text-primary)' }">
          <span class="char-by-char" style="visibility:hidden;">全部文章</span>
        </h1>
        <p class="text-base md:text-lg" :style="{ color: 'var(--text-tertiary)' }">
          探索前端技术与工程实践
        </p>
      </header>

      <!-- 标签筛选 — 移动端横向滚动 -->
      <div class="flex overflow-x-auto gap-2 pb-2 mb-8 md:mb-12 scrollbar-hide opacity-0-start animate-fade-in-up stagger-2 -mx-4 sm:mx-0 px-4 sm:px-0 md:flex-wrap md:justify-center">
        <button
          @click="activeTag = ''"
          class="shrink-0 px-3.5 py-2 rounded-full text-xs md:text-sm border transition-all duration-300 btn-hover whitespace-nowrap"
          :class="activeTag === '' ? '!bg-primary-500 !text-white !border-primary-500' : ''"
          :style="activeTag !== '' ? { borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' } : {}"
        >
          全部
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="activeTag = tag"
          class="shrink-0 px-3.5 py-2 rounded-full text-xs md:text-sm border transition-all duration-300 btn-hover whitespace-nowrap"
          :class="activeTag === tag ? '!bg-primary-500 !text-white !border-primary-500' : ''"
          :style="activeTag !== tag ? { borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' } : {}"
        >
          {{ tag }}
        </button>
      </div>

      <!-- 搜索结果数量 -->
      <p class="text-xs md:text-sm mb-6 md:mb-8 opacity-0-start animate-fade-in stagger-3" :style="{ color: 'var(--text-tertiary)' }">
        共 {{ filteredArticles.length }} 篇文章
        <span v-if="activeTag"> — 标签: #{{ activeTag }}</span>
      </p>

      <!-- 文章网格 -->
      <TransitionGroup
        name="article-list"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
      >
        <div
          v-for="(article, i) in filteredArticles"
          :key="article.id"
          class="scroll-reveal"
          :style="{ transitionDelay: `${i * 60}ms` }"
        >
          <ArticleCard :article="article" />
        </div>
      </TransitionGroup>

      <div
        v-if="filteredArticles.length === 0"
        class="text-center py-16 md:py-24"
        :style="{ color: 'var(--text-tertiary)' }"
      >
        <p class="text-base md:text-lg">没有找到相关文章</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useScrollReveal } from '@/composables/useAnimation'
import ArticleCard from '@/components/ArticleCard.vue'

const { allArticles, allTags } = useArticles()

const activeTag = ref('')

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
.article-list-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.article-list-leave-active {
  transition: all 0.25s ease-in;
}
.article-list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}
.article-list-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

/* 隐藏横向滚动条 */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>