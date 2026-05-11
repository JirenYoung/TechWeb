<template>
  <div class="write-page">
    <div class="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <header class="mb-12 opacity-0-start animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4" :style="{ color: 'var(--text-primary)' }">
          写文章
        </h1>
        <p class="text-lg" :style="{ color: 'var(--text-tertiary)' }">
          用 Markdown 书写，支持实时预览，自动保存到本地浏览器
        </p>
      </header>

      <!-- 表单 -->
      <div v-if="!submitted" class="space-y-8 opacity-0-start animate-fade-in-up stagger-2">
        <!-- 标题 -->
        <div>
          <label class="block text-sm font-medium mb-2" :style="{ color: 'var(--text-secondary)' }">文章标题</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="给你的文章起个名字..."
            class="w-full px-4 py-3 rounded-xl border text-lg font-semibold outline-none transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
            :style="{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"
          />
        </div>

        <!-- 标签 & 封面 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium mb-2" :style="{ color: 'var(--text-secondary)' }">标签（用逗号或空格分隔）</label>
            <input
              v-model="form.tags"
              type="text"
              placeholder="Vue, TypeScript, 前端"
              class="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
              :style="{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"
            />
            <div v-if="form.tags" class="flex flex-wrap gap-1.5 mt-2">
              <span
                v-for="tag in parsedTags"
                :key="tag"
                class="px-2 py-0.5 text-xs rounded-full border"
                :style="{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2" :style="{ color: 'var(--text-secondary)' }">封面图片 URL（可选）</label>
            <input
              v-model="form.cover"
              type="text"
              placeholder="https://images.unsplash.com/..."
              class="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
              :style="{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"
            />
            <div
              v-if="form.cover"
              class="mt-2 w-full h-20 rounded-lg overflow-hidden"
              :style="{ backgroundColor: 'var(--bg-tertiary)' }"
            >
              <img :src="form.cover" class="w-full h-full object-cover" @error="form.cover = ''" />
            </div>
          </div>
        </div>

        <!-- 摘要 -->
        <div>
          <label class="block text-sm font-medium mb-2" :style="{ color: 'var(--text-secondary)' }">文章摘要</label>
          <textarea
            v-model="form.excerpt"
            rows="3"
            placeholder="一段简短的文章摘要，会显示在文章列表中..."
            class="w-full px-4 py-3 rounded-xl border outline-none resize-none transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
            :style="{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"
          ></textarea>
        </div>

        <!-- 正文 -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium" :style="{ color: 'var(--text-secondary)' }">正文内容（支持 HTML / Markdown 语法）</label>
            <button
              @click="previewOpen = !previewOpen"
              class="text-xs px-3 py-1 rounded-full border transition-all duration-300"
              :class="previewOpen ? '!bg-primary-500 !text-white !border-primary-500' : ''"
              :style="previewOpen ? {} : { borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }"
            >
              {{ previewOpen ? '关闭预览' : '预览' }}
            </button>
          </div>
          <div class="grid grid-cols-1" :class="previewOpen ? 'md:grid-cols-2' : ''">
            <textarea
              v-model="form.content"
              rows="20"
              placeholder="开始写你的文章...&#10;&#10;## 二级标题&#10;&#10;正文段落...&#10;&#10;- 列表项1&#10;- 列表项2&#10;&#10;```js&#10;console.log('代码块')&#10;```"
              class="w-full px-4 py-3 rounded-xl border font-mono text-sm outline-none resize-none transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
              :class="previewOpen ? 'rounded-r-none border-r-0' : ''"
              :style="{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"
            ></textarea>
            <div
              v-if="previewOpen"
              class="prose-custom px-6 py-4 rounded-r-xl border border-l-0 overflow-y-auto max-h-[500px]"
              :style="{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }"
              v-html="renderedContent"
            ></div>
          </div>
          <p class="text-xs mt-1.5" :style="{ color: 'var(--text-tertiary)' }">
            正文支持 Markdown 语法：<code>**粗体**</code> <code>*斜体*</code> <code>## 标题</code> <code>- 列表</code> <code>\`代码\`</code> <code>```代码块```</code> <code>> 引用</code>
          </p>
        </div>

        <!-- 提交按钮 -->
        <div class="flex items-center gap-4 pt-4">
          <button
            @click="handleSubmit"
            :disabled="!canSubmit"
            class="px-8 py-3 rounded-full font-medium btn-hover text-sm"
            :class="canSubmit ? 'bg-primary-500 text-white' : ''"
            :style="!canSubmit ? { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)', cursor: 'not-allowed' } : {}"
          >
            发布文章
          </button>
          <button
            @click="autoSave"
            class="px-6 py-3 rounded-full border btn-hover text-sm"
            :style="{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }"
          >
            暂存草稿
          </button>
          <span v-if="saveTip" class="text-xs animate-fade-in" :style="{ color: 'var(--text-tertiary)' }">
            {{ saveTip }}
          </span>
        </div>
      </div>

      <!-- 发布成功 -->
      <div
        v-else
        class="text-center py-16 opacity-0-start animate-fade-in-up"
      >
        <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-3" :style="{ color: 'var(--text-primary)' }">文章发布成功！</h2>
        <p class="mb-8" :style="{ color: 'var(--text-tertiary)' }">
          文章已保存到本地浏览器，可以在文章列表中查看
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link
            :to="`/article/${newArticleId}`"
            class="px-6 py-3 rounded-full bg-primary-500 text-white font-medium btn-hover text-sm"
          >
            查看文章
          </router-link>
          <button
            @click="resetForm"
            class="px-6 py-3 rounded-full border btn-hover text-sm"
            :style="{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }"
          >
            再写一篇
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticles } from '@/composables/useArticles'

const router = useRouter()
const { addArticle } = useArticles()

const DRAFT_KEY = 'techlog_draft'

const form = reactive({
  title: '',
  tags: '',
  cover: '',
  excerpt: '',
  content: ''
})

const previewOpen = ref(false)
const submitted = ref(false)
const saveTip = ref('')
const newArticleId = ref(null)

const parsedTags = computed(() => {
  return form.tags.split(/[,，\s]+/).filter(Boolean)
})

const canSubmit = computed(() => {
  return form.title.trim() && form.content.trim()
})

const renderedContent = computed(() => {
  let html = form.content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/gs, (match) => `<ul>${match}</ul>`)
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
  html = html.replace(/\n\n/g, '</p><p>')
  html = html.replace(/\n/g, '<br>')
  html = `<p>${html}</p>`

  return html
})

const handleSubmit = () => {
  if (!canSubmit.value) return
  const article = addArticle({ ...form })
  newArticleId.value = article.id
  submitted.value = true
  clearDraft()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const autoSave = () => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...form }))
  saveTip.value = '草稿已暂存 ✓'
  setTimeout(() => { saveTip.value = '' }, 2000)
}

const loadDraft = () => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (raw) {
      const draft = JSON.parse(raw)
      Object.keys(draft).forEach(key => {
        if (form.hasOwnProperty(key)) form[key] = draft[key]
      })
    }
  } catch { /* ignore */ }
}

const clearDraft = () => {
  localStorage.removeItem(DRAFT_KEY)
}

const resetForm = () => {
  Object.keys(form).forEach(key => { form[key] = '' })
  submitted.value = false
}

onMounted(() => {
  loadDraft()
})
</script>
