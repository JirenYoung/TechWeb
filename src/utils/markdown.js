import { marked } from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch {}
    }
    try {
      return hljs.highlightAuto(code).value
    } catch {}
    return code
  }
})

const renderer = new marked.Renderer()
let _resolveImage = null

renderer.image = function (href, title, text) {
  if (typeof href !== 'string') {
    text = href.text
    title = href.title
    href = href.href
  }
  let src = href
  if (_resolveImage && (href.startsWith('./') || href.startsWith('../') || (!href.startsWith('/') && !href.startsWith('http')))) {
    src = _resolveImage(href) || href
  }
  return `<img src="${src}" alt="${text || ''}" title="${title || ''}" loading="lazy" decoding="async" style="border-radius:12px;max-width:100%;margin:1.5em 0;" />`
}

marked.use({ renderer })

export function parseFrontmatter(raw) {
  const frontmatter = {}
  let body = raw

  if (raw.startsWith('---')) {
    const end = raw.indexOf('---', 3)
    if (end !== -1) {
      const fm = raw.slice(3, end).trim()
      body = raw.slice(end + 3).trim()

      fm.split('\n').forEach(line => {
        const colonIdx = line.indexOf(':')
        if (colonIdx === -1) return
        const key = line.slice(0, colonIdx).trim()
        let value = line.slice(colonIdx + 1).trim()

        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean)
        } else {
          value = value.replace(/^['"]|['"]$/g, '')
        }

        if (value === 'true') value = true
        else if (value === 'false') value = false

        frontmatter[key] = value
      })
    }
  }

  return { frontmatter, body }
}

export function renderMarkdown(md, options = {}) {
  _resolveImage = options.resolveImage || null
  return marked.parse(md)
}
