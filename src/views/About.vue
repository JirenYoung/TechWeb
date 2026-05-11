<template>
  <div class="about-page">
    <div class="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <!-- 头像与基本信息 -->
      <div class="text-center mb-20 opacity-0-start animate-fade-in">
        <div class="relative inline-block">
          <div class="w-28 h-28 rounded-full overflow-hidden border-4 border-white/10 dark:border-white/5 shadow-xl mx-auto mb-6 animate-float">
            <ProgressiveImage :src="author.avatar" :alt="author.name" class="w-full h-full" />
          </div>
          <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center"
            :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }">
            <span class="text-lg">🧑‍💻</span>
          </div>
        </div>
        <h1 class="text-4xl font-bold tracking-tight mb-3" :style="{ color: 'var(--text-primary)' }">
          <span class="char-by-char" style="visibility:hidden;">{{ author.name }}</span>
        </h1>
        <p class="text-lg font-medium" :style="{ color: 'var(--text-secondary)' }">
          {{ author.title }}
        </p>
      </div>

      <!-- Bio -->
      <div
        class="max-w-2xl mx-auto mb-24 text-center opacity-0-start animate-fade-in-up stagger-2"
      >
        <p class="text-lg leading-relaxed whitespace-pre-line" :style="{ color: 'var(--text-secondary)' }">
          {{ author.bio }}
        </p>
      </div>

      <!-- 技能 -->
      <section class="mb-24">
        <div class="flex items-center gap-3 mb-10 scroll-reveal">
          <span class="w-8 h-px bg-primary-500"></span>
          <h2 class="text-xl font-bold" :style="{ color: 'var(--text-primary)' }">
            技术栈
          </h2>
        </div>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="(skill, i) in author.skills"
            :key="skill"
            class="px-5 py-2.5 rounded-xl border text-sm font-medium scroll-reveal transition-all duration-300 hover:border-primary-400 hover:text-primary-500"
            :style="{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-secondary)',
              transitionDelay: `${i * 60}ms`
            }"
          >
            {{ skill }}
          </span>
        </div>
      </section>

      <!-- 时间线 -->
      <section>
        <div class="flex items-center gap-3 mb-10 scroll-reveal">
          <span class="w-8 h-px bg-primary-500"></span>
          <h2 class="text-xl font-bold" :style="{ color: 'var(--text-primary)' }">
            我的经历
          </h2>
        </div>
        <div class="relative">
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-px" :style="{ backgroundColor: 'var(--border-color)' }"></div>
          <div class="space-y-12">
            <div
              v-for="(item, i) in timeline"
              :key="item.year"
              class="relative flex flex-col md:flex-row items-start gap-6 scroll-reveal"
              :style="{ transitionDelay: `${i * 100}ms` }"
              :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
            >
              <div class="flex-1" :class="i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'">
                <span class="text-sm font-mono font-medium text-primary-500">{{ item.year }}</span>
                <h3 class="text-lg font-semibold mt-1" :style="{ color: 'var(--text-primary)' }">{{ item.title }}</h3>
                <p class="text-sm mt-1" :style="{ color: 'var(--text-tertiary)' }">{{ item.description }}</p>
              </div>
              <div class="absolute left-4 md:left-1/2 w-3 h-3 rounded-full border-2 bg-[var(--bg-primary)] border-primary-500 transform -translate-x-1/2 mt-1.5"></div>
              <div class="flex-1 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 社交链接 -->
      <div class="text-center mt-24 scroll-reveal">
        <div class="flex justify-center gap-6">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 rounded-full border btn-hover text-sm font-medium"
            :style="{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { author } from '@/data/articles'
import { useScrollReveal } from '@/composables/useAnimation'
import ProgressiveImage from '@/components/ProgressiveImage.vue'

const timeline = [
  { year: '2026', title: '技术博客上线', description: '开始系统性记录技术思考与工程实践' },
  { year: '2025', title: '高级前端工程师', description: '负责前端架构设计与性能优化' },
  { year: '2023', title: '前端工程师', description: '深入 Vue3/React 生态，专注工程化建设' },
  { year: '2022', title: '入行前端开发', description: '从后端转前端，开启了新的技术旅程' },
]

const socialLinks = [
  { label: 'GitHub', href: author.social.github },
  { label: 'Twitter', href: author.social.twitter },
  { label: 'Email', href: 'mailto:hello@techlog.dev' },
]

useScrollReveal()
</script>
