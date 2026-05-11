#!/usr/bin/env node
import { writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const POSTS_DIR = resolve(ROOT, 'src', 'posts')

const args = process.argv.slice(2)

if (args.length < 2 || args[0] !== 'new') {
  console.log('用法: blog new 文章标题')
  process.exit(1)
}

const title = args.slice(1).join(' ')
const date = new Date()
const dateStr = date.toISOString().slice(0, 10)
const filename = `${dateStr}-${title}.md`
const filepath = resolve(POSTS_DIR, filename)

const frontmatter = `---
title: ${title}
date: ${dateStr}
tags: []
categories: []
cover: ""
excerpt: ""
featured: true
---

`

try {
  await mkdir(POSTS_DIR, { recursive: true })
  await writeFile(filepath, frontmatter, 'utf-8')
  console.log(`已创建: src/posts/${filename}`)
} catch (err) {
  console.error('创建失败:', err.message)
  process.exit(1)
}
