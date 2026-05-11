import { ref, computed } from 'vue'
import { articles as builtInArticles } from '@/data/articles'

const STORAGE_KEY = 'techlog_articles'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
}

const userArticles = ref(loadFromStorage())

const allArticles = computed(() => {
  return [...userArticles.value, ...builtInArticles].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
})

const allTags = computed(() => {
  return [...new Set(allArticles.value.flatMap(a => a.tags))].sort()
})

const archives = computed(() => {
  return allArticles.value.reduce((acc, article) => {
    const year = article.date.slice(0, 4)
    if (!acc[year]) acc[year] = []
    acc[year].push(article)
    return acc
  }, {})
})

function addArticle({ title, excerpt, content, tags, cover }) {
  const id = Date.now()
  const today = new Date().toISOString().slice(0, 10)
  const readTime = Math.max(1, Math.round(content.replace(/<[^>]*>/g, '').length / 500))

  const article = {
    id,
    title,
    slug: `user-${id}`,
    excerpt,
    content,
    tags: tags.split(/[,，\s]+/).filter(Boolean),
    date: today,
    readTime,
    cover: cover || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    featured: false,
    isUserArticle: true
  }

  userArticles.value.unshift(article)
  saveToStorage(userArticles.value)
  return article
}

function deleteArticle(id) {
  userArticles.value = userArticles.value.filter(a => a.id !== id)
  saveToStorage(userArticles.value)
}

export function useArticles() {
  return { allArticles, allTags, archives, userArticles, addArticle, deleteArticle }
}
