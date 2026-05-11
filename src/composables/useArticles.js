import { computed, triggerRef } from 'vue'

const postModules = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default', eager: true })

const posts = []
let id = 1

Object.entries(postModules).forEach(([filepath, raw]) => {
  const fmEnd = raw.indexOf('---', 3)
  if (fmEnd === -1) return
  const fm = raw.slice(3, fmEnd)
  const bodyLen = raw.length - fmEnd - 3

  const meta = {}
  fm.split('\n').forEach(line => {
    const ci = line.indexOf(':')
    if (ci === -1) return
    const key = line.slice(0, ci).trim()
    let val = line.slice(ci + 1).trim()
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''))
    } else {
      val = val.replace(/^['"]|['"]$/g, '')
    }
    if (val === 'true') meta[key] = true
    else if (val === 'false') meta[key] = false
    else meta[key] = val
  })

  posts.push({
    id: id++,
    title: meta.title || '无标题',
    date: meta.date || '1970-01-01',
    tags: meta.tags || [],
    categories: meta.categories || [],
    cover: meta.cover || '',
    excerpt: meta.excerpt || '',
    featured: meta.featured || false,
    readTime: Math.max(1, Math.round(bodyLen / 500)),
    filepath,
    _raw: raw,
    _content: null
  })
})

posts.sort((a, b) => new Date(b.date) - new Date(a.date))

const allArticles = computed(() => posts)

const allTags = computed(() => [...new Set(posts.flatMap(p => p.tags))].sort())

const allCategories = computed(() => [...new Set(posts.flatMap(p => p.categories))].sort())

const archives = computed(() => {
  return posts.reduce((acc, a) => {
    const y = a.date.slice(0, 4)
    if (!acc[y]) acc[y] = []
    acc[y].push(a)
    return acc
  }, {})
})

let markdownReady = false
let _parseFM = null
let _renderMD = null

async function ensureMarkdown() {
  if (markdownReady) return
  const mod = await import('@/utils/markdown.js')
  _parseFM = mod.parseFrontmatter
  _renderMD = mod.renderMarkdown
  markdownReady = true
}

async function loadContent(article) {
  if (article._content) return article._content
  await ensureMarkdown()
  const { body } = _parseFM(article._raw)
  article._content = _renderMD(body)
  triggerRef(allArticles)
  return article._content
}

export function useArticles() {
  return { allArticles, allTags, allCategories, archives, loadContent }
}
