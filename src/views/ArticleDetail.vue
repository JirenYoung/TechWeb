<template>
  <div class="article-detail-page" v-if="article">
    <!-- 阅读进度条 -->
    <div
      class="fixed top-16 left-0 h-0.5 z-50 transition-all duration-150"
      :style="{ width: `${readProgress}%`, backgroundColor: '#4c6ef5' }"
    ></div>

    <!-- 封面 -->
    <div class="relative h-[40vh] md:h-[50vh] overflow-hidden">
      <ProgressiveImage
        :src="article.cover"
        :alt="article.title"
        class="w-full h-full"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent"></div>
    </div>

    <div class="max-w-3xl mx-auto px-6">
      <!-- 文章头部 -->
      <header class="relative -mt-20 z-10 mb-12">
        <div
          class="rounded-2xl p-8 md:p-10 border backdrop-blur-xl opacity-0-start animate-fade-in-up"
          :style="{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--card-shadow)'
          }"
        >
          <div class="flex flex-wrap gap-2 mb-4 stagger-1">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="px-3 py-1 text-xs font-medium rounded-full border"
              :style="{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }"
            >
              {{ tag }}
            </span>
          </div>
          <h1
            class="text-3xl md:text-4xl font-bold leading-tight mb-4 stagger-2"
            :style="{ color: 'var(--text-primary)' }"
          >
            <span class="char-by-char" style="visibility:hidden;">{{ article.title }}</span>
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-sm stagger-3" :style="{ color: 'var(--text-tertiary)' }">
            <time>{{ article.date }}</time>
            <span>·</span>
            <span>{{ article.readTime }} 分钟阅读</span>
            <span>·</span>
            <span>{{ wordCount }} 字</span>
          </div>
        </div>
      </header>

      <!-- 文章内容 -->
      <article class="pb-24">
        <div
          class="prose-custom opacity-0-start animate-fade-in stagger-4"
          ref="articleBody"
          v-html="article.content"
        ></div>
      </article>
    </div>

    <!-- 底部导航 -->
    <div class="max-w-3xl mx-auto px-6 pb-16">
      <div
        class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-6 rounded-2xl border"
        :style="{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }"
      >
        <router-link
          v-if="prevArticle"
          :to="`/article/${prevArticle.id}`"
          class="group flex-1"
        >
          <p class="text-xs mb-1" :style="{ color: 'var(--text-tertiary)' }">← 上一篇</p>
          <p class="text-sm font-medium line-clamp-1 transition-colors duration-300 group-hover:text-primary-500" :style="{ color: 'var(--text-primary)' }">
            {{ prevArticle.title }}
          </p>
        </router-link>
        <div class="hidden sm:block w-px self-stretch" :style="{ backgroundColor: 'var(--border-color)' }"></div>
        <router-link
          v-if="nextArticle"
          :to="`/article/${nextArticle.id}`"
          class="group flex-1 text-right"
        >
          <p class="text-xs mb-1" :style="{ color: 'var(--text-tertiary)' }">下一篇 →</p>
          <p class="text-sm font-medium line-clamp-1 transition-colors duration-300 group-hover:text-primary-500" :style="{ color: 'var(--text-primary)' }">
            {{ nextArticle.title }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticles } from '@/composables/useArticles'
import { useScrollReveal } from '@/composables/useAnimation'
import ProgressiveImage from '@/components/ProgressiveImage.vue'

const { allArticles } = useArticles()
const route = useRoute()
const article = computed(() => allArticles.value.find(a => a.id === Number(route.params.id)))
const articleBody = ref(null)
const readProgress = ref(0)

const currentIndex = computed(() => allArticles.value.findIndex(a => a.id === Number(route.params.id)))
const prevArticle = computed(() => currentIndex.value > 0 ? allArticles.value[currentIndex.value - 1] : null)
const nextArticle = computed(() => currentIndex.value < allArticles.value.length - 1 ? allArticles.value[currentIndex.value + 1] : null)
const wordCount = computed(() => {
  if (!article.value) return 0
  const text = article.value.content.replace(/<[^>]*>/g, '')
  return text.length
})

const handleScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight > 0) {
    readProgress.value = Math.min(100, Math.round((scrollTop / docHeight) * 100))
  }
}

useScrollReveal()

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.scrollTo({ top: 0, behavior: 'instant' })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
