<template>
  <div class="border-t" :style="{ borderColor: 'var(--border-color)' }">
    <div class="max-w-5xl mx-auto px-6 py-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-sm" :style="{ color: 'var(--text-tertiary)' }">
          <p>&copy; {{ year }} TechLog. All rights reserved.</p>
          <p class="mt-1">
            Built with
            <span class="text-primary-500">Vue3</span>
            +
            <span class="text-primary-500">Tailwind CSS</span>
            · Deployed on
            <span class="text-primary-500">Vercel</span>
          </p>
        </div>
        <div class="flex items-center gap-6">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm transition-colors duration-300 hover:text-primary-500"
            :style="{ color: 'var(--text-tertiary)' }"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const year = new Date().getFullYear()
const links = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'RSS', href: '/rss.xml' },
]
</script>
