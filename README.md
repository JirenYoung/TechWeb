<p align="center">
  <img src="public/vite.svg" width="80" alt="TechLog" />
</p>

<h1 align="center">TechLog</h1>
<p align="center">Personal tech blog — built with Vue 3, Tailwind CSS & Vite</p>

<p align="center">
  <a href="#-简体中文">🇨🇳 简体中文</a> ·
  <a href="#-english">🇬🇧 English</a> ·
  <a href="#-deutsch">🇩🇪 Deutsch</a>
</p>

---

## 🇨🇳 简体中文

### 项目简介

TechLog 是一个轻量级个人技术博客，基于 Markdown 文章驱动。支持深色/浅色主题切换、移动端适配、标签分类、归档时间线等功能。

### 技术栈

- **框架**: Vue 3 (Composition API)
- **路由**: Vue Router 4
- **样式**: Tailwind CSS 3
- **构建**: Vite 5
- **Markdown**: marked + highlight.js

### 功能特性

- 📝 Markdown 文章渲染（代码高亮、图片懒加载）
- 🌓 深色 / 浅色主题切换
- 📱 移动端适配（底部导航栏 + 响应式布局）
- 🏷️ 标签分类与筛选
- 📦 文章归档时间线
- 🔍 全文浏览与快速跳转

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/JirenYoung/TechWeb.git
cd TechWeb

# 安装依赖
npm install

# 本地开发
npm run dev

# 生产构建
npm run build
npm run preview
```

### 添加文章

在 `src/posts/` 下创建 `YYYY-MM-DD-标题/` 目录，放入 `index.md` 和图片：

```markdown
---
title: 文章标题
date: 2026-05-26
tags: [Vue, JavaScript]
cover: ./images/cover.jpg
excerpt: 文章摘要
featured: false
---

正文内容...
```

### 快捷创建文章

使用 `blog new` 命令快速创建文章模板：

```bash
blog new 文章标题
```

该命令会自动在 `src/posts/` 下创建 `文章标题-当前日期/` 目录，包含：
- 预设 frontmatter 的 `index.md`（含 title、date、tags、categories、cover、excerpt、featured 字段）
- `images/` 图片子目录

> 如果 `blog` 命令未注册，可使用 `node bin/blog.js new 文章标题`。

### 项目结构

```
src/
├── components/    # 通用组件
├── composables/   # 组合式函数
├── posts/         # Markdown 文章
├── router/        # 路由配置
├── styles/        # 全局样式
├── utils/         # 工具函数
└── views/         # 页面组件
```

---

## 🇬🇧 English

### Overview

TechLog is a lightweight personal tech blog driven by Markdown articles. It supports dark/light theme switching, mobile adaptation, tag filtering, and archive timeline.

### Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Router**: Vue Router 4
- **Styling**: Tailwind CSS 3
- **Bundler**: Vite 5
- **Markdown**: marked + highlight.js

### Features

- 📝 Markdown rendering with syntax highlighting
- 🌓 Dark / Light theme toggle
- 📱 Mobile-first responsive design with bottom navigation
- 🏷️ Tag classification & filtering
- 📦 Archive timeline view
- 🔍 Full article browsing

### Quick Start

```bash
git clone https://github.com/JirenYoung/TechWeb.git
cd TechWeb
npm install
npm run dev
```

### Adding Articles

Create a `YYYY-MM-DD-title/` folder under `src/posts/` with an `index.md`:

```markdown
---
title: My Article
date: 2026-05-26
tags: [Vue, JavaScript]
cover: ./images/cover.jpg
excerpt: Article summary
featured: false
---

Content goes here...
```

### Quick Article Creation

Use the `blog new` command to scaffold a new article:

```bash
blog new "Article Title"
```

This automatically creates an `Article Title-YYYY-MM-DD/` directory under `src/posts/` with:
- A pre-filled `index.md` (including title, date, tags, categories, cover, excerpt, featured fields)
- An `images/` subdirectory

> If the `blog` command is not registered, use `node bin/blog.js new "Article Title"`.

---

## 🇩🇪 Deutsch

### Übersicht

TechLog ist ein leichtgewichtiger persönlicher Tech-Blog, der auf Markdown-Artikeln basiert. Er unterstützt Dunkel-/Hell-Modus, mobile Anpassung, Tag-Filterung und eine Archiv-Zeitleiste.

### Technologie-Stack

- **Framework**: Vue 3 (Composition API)
- **Router**: Vue Router 4
- **Styling**: Tailwind CSS 3
- **Bundler**: Vite 5
- **Markdown**: marked + highlight.js

### Funktionen

- 📝 Markdown-Rendering mit Syntax-Highlighting
- 🌓 Umschaltung zwischen Dunkel- und Hellmodus
- 📱 Mobile-First-Design mit unterer Navigationsleiste
- 🏷️ Tag-Klassifizierung & Filterung
- 📦 Archiv-Zeitleiste
- 🔍 Vollständige Artikelübersicht

### Schnellstart

```bash
git clone https://github.com/JirenYoung/TechWeb.git
cd TechWeb
npm install
npm run dev
```

### Artikel hinzufügen

Erstelle einen Ordner `JJJJ-MM-TT-titel/` unter `src/posts/` mit einer `index.md`:

```markdown
---
title: Mein Artikel
date: 2026-05-26
tags: [Vue, JavaScript]
cover: ./images/cover.jpg
excerpt: Artikelzusammenfassung
featured: false
---

Inhalt hier...
```

### Schnelle Artikelerstellung

Verwende den `blog new` Befehl, um schnell einen neuen Artikel zu erstellen:

```bash
blog new "Artikel Titel"
```

Dies erstellt automatisch ein `Artikel Titel-JJJJ-MM-TT/` Verzeichnis unter `src/posts/` mit:
- Einer vorgefüllten `index.md` (mit title, date, tags, categories, cover, excerpt, featured Feldern)
- Einem `images/` Unterverzeichnis

> Falls der `blog` Befehl nicht registriert ist, verwende `node bin/blog.js new "Artikel Titel"`.

---

<p align="center">
  <sub>Built with Vue 3 + Tailwind CSS · Deployed via Vite</sub>
</p>