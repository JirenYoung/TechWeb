<template>
  <div class="archive-page">
    <div class="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <header class="mb-16 opacity-0-start animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4" :style="{ color: 'var(--text-primary)' }">
          <span class="char-by-char" style="visibility:hidden;">归档</span>
        </h1>
        <p class="text-lg" :style="{ color: 'var(--text-tertiary)' }">
          共 {{ totalCount }} 篇文章
        </p>
      </header>

      <div class="relative">
        <div class="absolute left-0 top-0 bottom-0 w-px hidden md:block" :style="{ backgroundColor: 'var(--border-color)' }"></div>

        <div
          v-for="(groupArticles, year) in archives"
          :key="year"
          class="mb-16 scroll-reveal"
        >
          <div class="flex items-center gap-4 mb-8">
            <span class="text-3xl font-bold font-mono text-primary-500 hidden md:block">{{ year }}</span>
            <span class="text-2xl font-bold md:hidden" :style="{ color: 'var(--text-primary)' }">{{ year }}</span>
            <span class="hidden md:block flex-1 h-px" :style="{ backgroundColor: 'var(--border-color)' }"></span>
          </div>

          <div class="space-y-0">
            <router-link
              v-for="article in groupArticles"
              :key="article.id"
              :to="`/article/${article.id}`"
              class="group flex flex-col sm:flex-row items-start gap-4 sm:gap-8 py-5 border-b transition-colors duration-300"
              :style="{ borderColor: 'var(--border-color)' }"
            >
              <time class="text-sm font-mono whitespace-nowrap pt-0.5 min-w-[100px]" :style="{ color: 'var(--text-tertiary)' }">
                {{ article.date.slice(5) }}
              </time>
              <div class="flex-1 min-w-0">
                <h3 class="text-base font-medium leading-snug transition-colors duration-300 group-hover:text-primary-500" :style="{ color: 'var(--text-primary)' }">
                  {{ article.title }}
                </h3>
                <div class="flex items-center gap-2 mt-1.5">
                  <span
                    v-for="tag in article.tags"
                    :key="tag"
                    class="text-xs px-2 py-0.5 rounded-full border"
                    :style="{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useScrollReveal } from '@/composables/useAnimation'

const { allArticles, archives } = useArticles()

const totalCount = computed(() => allArticles.value.length)

useScrollReveal()
</script>
