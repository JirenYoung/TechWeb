<template>
  <div class="home-page">
    <!-- Hero 区 -->
    <section
      class="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      :style="{ background: 'var(--hero-gradient)' }"
      ref="heroSection"
    >
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" style="animation-delay: 0s;" />
        <div class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style="animation-delay: 2s;" />
        <div class="absolute top-1/2 left-1/2 w-48 h-48 bg-primary-300/20 rounded-full blur-2xl animate-float" style="animation-delay: 4s;" />
      </div>

      <div
        class="relative z-10 text-center px-6 max-w-3xl mx-auto"
        :style="{ willChange: 'transform' }"
        ref="heroContent"
      >
        <div class="flex items-center justify-center gap-3 mb-8 opacity-0-start animate-fade-in stagger-1">
          <span class="w-8 h-px bg-white/40"></span>
          <span class="text-white/60 text-sm tracking-widest uppercase font-mono">Welcome to TechLog</span>
          <span class="w-8 h-px bg-white/40"></span>
        </div>
        <h1
          class="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6"
        >
          <span class="char-by-char" style="visibility:hidden;">用代码记录思考</span>
        </h1>
        <p class="text-xl text-white/70 leading-relaxed mb-10 font-light opacity-0-start animate-fade-in-up stagger-3">
          探索前端技术边界，分享工程实践经验<br class="hidden sm:block" />
          专注于 Vue、TypeScript、性能优化与开发者体验
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0-start animate-fade-in-up stagger-5">
          <router-link
            to="/articles"
            class="px-8 py-3 bg-white text-gray-900 font-medium rounded-full btn-hover text-sm tracking-wide"
          >
            浏览文章
          </router-link>
          <router-link
            to="/about"
            class="px-8 py-3 border border-white/30 text-white rounded-full btn-hover text-sm tracking-wide"
          >
            关于我
          </router-link>
        </div>
        <div class="mt-16 opacity-0-start animate-fade-in stagger-7">
          <svg class="w-6 h-6 mx-auto text-white/40 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- 精选文章 -->
    <section class="py-24 md:py-32 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center gap-4 mb-16">
          <span class="w-12 h-px bg-primary-500"></span>
          <h2 class="text-2xl md:text-3xl font-bold tracking-tight char-by-char" style="visibility:hidden;" :style="{ color: 'var(--text-primary)' }">
            精选文章
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(article, i) in featuredArticles"
            :key="article.id"
            class="scroll-reveal"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <ArticleCard :article="article" />
          </div>
        </div>

        <div class="mt-14 text-center scroll-reveal">
          <router-link
            to="/articles"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300 btn-hover"
            :style="{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }"
          >
            查看全部文章
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 标签云 -->
    <section class="pb-24 md:pb-32 px-6">
      <div class="max-w-5xl mx-auto text-center">
        <h3 class="text-lg font-medium mb-8" :style="{ color: 'var(--text-tertiary)' }">
          探索标签
        </h3>
        <div class="flex flex-wrap justify-center gap-3">
          <router-link
            v-for="(tag, i) in allTags"
            :key="tag"
            :to="`/tags?filter=${tag}`"
            class="px-4 py-2 rounded-full text-sm border transition-all duration-300 scroll-reveal btn-hover"
            :style="{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-secondary)',
              transitionDelay: `${i * 50}ms`
            }"
          >
            #{{ tag }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useScrollReveal } from '@/composables/useAnimation'
import ArticleCard from '@/components/ArticleCard.vue'

const { allArticles, allTags } = useArticles()

const featuredArticles = allArticles.value.filter(a => a.featured)

const heroSection = ref(null)
const heroContent = ref(null)

useScrollReveal()

// 视差效果
let rafId = null

const handleParallax = () => {
  if (!heroContent.value) return
  const scrollY = window.scrollY
  const translateY = scrollY * 0.35
  const opacity = Math.max(0, 1 - scrollY / 500)
  heroContent.value.style.transform = `translateY(${translateY}px)`
  heroContent.value.style.opacity = opacity
}

const onScroll = () => {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(handleParallax)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(rafId)
})
</script>
