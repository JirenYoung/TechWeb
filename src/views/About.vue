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
import { useScrollReveal } from '@/composables/useAnimation'
import ProgressiveImage from '@/components/ProgressiveImage.vue'

const author = {
  name: 'TechLog',
  title: '全栈工程师 / 技术写作者',
  bio: '热爱技术，喜欢探索前沿。专注于前端工程化、性能优化和开发者体验。\n在这里记录技术思考、学习心得和项目经验。',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  skills: [
    'Linux CentOS/Ubuntu',
    'Nginx',
    'Shell 脚本',
    'MySQL 数据库',
    '局域网搭建',
    'VLAN/ACL/路由',
    '服务器硬件运维',
    'VMware/KVM 虚拟化'
  ],
  social: {
    github: 'https://github.com/techlog',
    twitter: 'https://twitter.com/techlog',
  }
}

const timeline = [
  { year: '2023.09 - 2026.06', title: '江苏电子信息职业学院', description: '计算机应用技术（系统集成）专科在读' },
  { year: '实训项目', title: 'Linux 服务器搭建与运维', description: 'CentOS 系统初始化、用户权限管理、Nginx 服务部署、Shell 自动化脚本、防火墙与 SSH 安全加固' },
  { year: '实训项目', title: '企业级局域网搭建', description: 'IP 地址规划、VLAN 划分、静态路由配置、ACL 访问控制、网络故障排查与互通测试' },
  { year: '实训项目', title: '物理服务器运维部署', description: '服务器硬件组装、系统安装、RAID 配置、远程管理、服务稳定性监控与日常巡检' },
  { year: '实训项目', title: 'MySQL 数据库运维', description: '数据库安装配置、权限管理、SQL 操作、定时备份与恢复、日志分析及故障处理' },
]

const socialLinks = [
  { label: 'GitHub', href: author.social.github },
  { label: 'Twitter', href: author.social.twitter },
  { label: 'Email', href: 'mailto:hello@techlog.dev' },
]

useScrollReveal()
</script>
