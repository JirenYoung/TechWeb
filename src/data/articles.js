export const articles = [
  {
    id: 1,
    title: 'Vue3 组合式 API 深入理解：从 Options 到 Composition 的思维转变',
    slug: 'vue3-composition-api-deep-dive',
    excerpt: '深入探讨 Vue3 Composition API 的设计哲学，通过实际案例对比 Options API 与 Composition API，帮助你完成思维范式的转换。',
    content: `<h2>为什么需要 Composition API？</h2>
<p>在 Vue2 中，我们使用 Options API 组织代码，通过 <code>data</code>、<code>methods</code>、<code>computed</code> 等选项来定义组件逻辑。当组件规模较小时，这种方式清晰直观；但当组件变得复杂时，同一个逻辑关注点的代码会被分散在不同选项中，导致代码难以维护。</p>
<p>Vue3 引入的 Composition API 彻底改变了这一局面。它允许我们按照逻辑关注点组织代码，而不是按照选项类型。</p>
<h2>从 Options 到 Composition</h2>
<p>让我们来看一个实际的例子。假设我们有一个搜索功能，包含搜索关键词、搜索结果和加载状态：</p>
<pre><code>// Options API
export default {
  data() {
    return {
      keyword: '',
      results: [],
      loading: false
    }
  },
  watch: {
    keyword: {
      handler: 'search',
      immediate: false
    }
  },
  methods: {
    async search() {
      this.loading = true
      try {
        const res = await fetch(\`/api/search?q=\${this.keyword}\`)
        this.results = await res.json()
      } finally {
        this.loading = false
      }
    }
  }
}</code></pre>
<pre><code>// Composition API
import { ref, watch } from 'vue'

export function useSearch() {
  const keyword = ref('')
  const results = ref([])
  const loading = ref(false)

  watch(keyword, async (val) => {
    if (!val) return
    loading.value = true
    try {
      const res = await fetch(\`/api/search?q=\${val}\`)
      results.value = await res.json()
    } finally {
      loading.value = false
    }
  })

  return { keyword, results, loading }
}</code></pre>
<p>使用 Composition API 后，我们可以将搜索逻辑提取为独立的组合式函数 <code>useSearch</code>，在任何组件中复用。</p>
<h2>核心优势</h2>
<ul>
<li><strong>逻辑复用</strong>：组合式函数是比 Mixin 更好的代码复用方式</li>
<li><strong>类型推导</strong>：更好的 TypeScript 支持</li>
<li><strong>按需组织</strong>：同一逻辑的代码放在一起，而不是分散在不同选项中</li>
<li><strong>Tree-shaking</strong>：未使用的 API 可以被打包工具移除</li>
</ul>
<h2>响应式系统原理</h2>
<p>Vue3 使用 <code>Proxy</code> 替代了 Vue2 的 <code>Object.defineProperty</code>，实现了真正的响应式代理。这意味着：</p>
<ul>
<li>可以检测属性的添加和删除</li>
<li>可以响应数组索引和 length 的变化</li>
<li>支持 Map、Set、WeakMap、WeakSet</li>
</ul>
<p>理解这些底层原理，有助于我们写出更高效的 Vue3 代码。</p>`,
    tags: ['Vue', 'JavaScript', '前端'],
    date: '2026-04-20',
    readTime: 12,
    cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    featured: true
  },
  {
    id: 2,
    title: 'Tailwind CSS 实战技巧：用 Utility-First 构建可维护的设计系统',
    slug: 'tailwind-css-practical-tips',
    excerpt: '分享在日常项目中使用 Tailwind CSS 的最佳实践，包括组件封装、响应式设计、深色模式和性能优化等实用技巧。',
    content: `<h2>为什么选择 Tailwind CSS？</h2>
<p>Tailwind CSS 的 Utility-First 方法论在最初可能会让习惯传统 CSS 的开发者感到不适，但一旦适应，你会发现它极大地提升了开发效率和代码的可维护性。</p>
<h2>组件封装的正确姿势</h2>
<p>使用 Tailwind 时，最常遇到的问题就是重复的类名组合。解决方案是提取组件：</p>
<pre><code>// 使用 @apply 提取重复样式
.btn-primary {
  @apply px-6 py-2.5 bg-primary-500 text-white rounded-lg
         font-medium transition-all duration-300
         hover:bg-primary-600 hover:shadow-lg
         active:scale-95;
}</code></pre>
<h2>响应式设计</h2>
<p>Tailwind 的响应式前缀让移动优先的设计变得简单：</p>
<pre><code>&lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
  &lt;!-- 小屏1列，中屏2列，大屏3列 --&gt;
&lt;/div&gt;</code></pre>
<h2>深色模式支持</h2>
<p>使用 class 策略的深色模式，配合 CSS 变量可以实现更灵活的主题切换：</p>
<pre><code>&lt;div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"&gt;
  &lt;h1 class="text-2xl font-bold"&gt;标题&lt;/h1&gt;
&lt;/div&gt;</code></pre>
<p>掌握这些技巧后，你会发现 Tailwind CSS 不仅是写样式更快，更重要的是它强制你遵循一致的设计规范，自然而然地形成设计系统。</p>`,
    tags: ['CSS', 'Tailwind', '前端'],
    date: '2026-04-15',
    readTime: 8,
    cover: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
    featured: true
  },
  {
    id: 3,
    title: '从零搭建 Vite + Vue3 工程化体系',
    slug: 'vite-vue3-engineering',
    excerpt: '详细介绍如何从零搭建一个现代化的 Vite + Vue3 前端工程项目，涵盖 ESLint、Prettier、Husky、自动导入等完整工程化配置。',
    content: `<h2>项目初始化</h2>
<p>使用 Vite 创建 Vue3 项目非常简单：</p>
<pre><code>npm create vite@latest my-app -- --template vue</code></pre>
<p>Vite 利用浏览器原生 ES Module 支持，开发服务器启动几乎瞬间完成，相比 Webpack 有了质的飞跃。</p>
<h2>工程化配置清单</h2>
<h3>1. 路径别名</h3>
<pre><code>// vite.config.js
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}</code></pre>
<h3>2. 自动导入</h3>
<p>使用 <code>unplugin-auto-import</code> 和 <code>unplugin-vue-components</code> 可以自动导入 Vue API 和组件，告别重复的 import 语句。</p>
<h3>3. ESLint + Prettier</h3>
<p>代码规范是团队协作的基础，合理配置 ESLint 和 Prettier 可以在保持代码风格统一的同时，避免不必要的冲突。</p>
<h3>4. Git Hooks</h3>
<p>通过 Husky + lint-staged，在提交前自动执行代码检查和格式化，确保提交到仓库的代码始终符合规范。</p>
<p>良好的工程化体系是高质量代码交付的基石。花时间搭建好基础设施，后续的开发效率会成倍提升。</p>`,
    tags: ['Vite', 'Vue', '工程化'],
    date: '2026-04-10',
    readTime: 14,
    cover: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
    featured: false
  },
  {
    id: 4,
    title: 'JavaScript 异步编程演进：从回调到 async/await',
    slug: 'js-async-evolution',
    excerpt: '回顾 JavaScript 异步编程的发展历程，从最早的回调函数到 Promise，再到今天的 async/await，理解每一阶段的设计动机。',
    content: `<h2>回调地狱时代</h2>
<p>在 Promise 出现之前，JavaScript 的异步编程只能依赖回调函数。当多个异步操作需要按顺序执行时，代码会变成著名的"回调地狱"：</p>
<pre><code>getUser(userId, (err, user) => {
  if (err) return handleError(err)
  getPosts(user.id, (err, posts) => {
    if (err) return handleError(err)
    getComments(posts[0].id, (err, comments) => {
      if (err) return handleError(err)
      console.log(comments)
    })
  })
})</code></pre>
<h2>Promise 时代</h2>
<p>Promise 将异步操作包装成一个对象，通过链式调用解决了回调地狱的问题：</p>
<pre><code>getUser(userId)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(handleError)</code></pre>
<h2>async/await 时代</h2>
<p>async/await 是 Promise 的语法糖，让异步代码看起来像同步代码：</p>
<pre><code>async function loadComments(userId) {
  try {
    const user = await getUser(userId)
    const posts = await getPosts(user.id)
    const comments = await getComments(posts[0].id)
    console.log(comments)
  } catch (err) {
    handleError(err)
  }
}</code></pre>
<h2>更高级的异步模式</h2>
<p>除了基础的 async/await，还有一些高级模式值得掌握：</p>
<ul>
<li><strong>Promise.all</strong>：并行执行多个异步操作</li>
<li><strong>Promise.race</strong>：取最快完成的那个</li>
<li><strong>Promise.allSettled</strong>：等待所有完成，不管成功或失败</li>
<li><strong>AbortController</strong>：取消正在进行的异步操作</li>
</ul>
<p>理解异步编程的演进历程，有助于我们在不同场景下做出最合适的技术选择。</p>`,
    tags: ['JavaScript', '异步编程'],
    date: '2026-03-28',
    readTime: 10,
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    featured: true
  },
  {
    id: 5,
    title: 'CSS Grid 布局完全指南',
    slug: 'css-grid-complete-guide',
    excerpt: '从基础概念到高级技巧，全面掌握 CSS Grid 布局系统，用最简洁的代码实现最复杂的页面布局。',
    content: `<h2>Grid vs Flexbox</h2>
<p>CSS Grid 是二维布局系统，同时控制行和列；Flexbox 是一维布局系统，只能在一个方向上排列元素。两者不是替代关系，而是互补关系。</p>
<h2>基础概念</h2>
<p>Grid 容器的核心属性：</p>
<ul>
<li><code>grid-template-columns</code> / <code>grid-template-rows</code>：定义网格轨道</li>
<li><code>gap</code>：网格间距</li>
<li><code>grid-template-areas</code>：命名区域布局</li>
</ul>
<pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}</code></pre>
<p>Grid 子元素的定位：</p>
<ul>
<li><code>grid-column</code> / <code>grid-row</code>：按网格线定位</li>
<li><code>grid-area</code>：按命名区域定位</li>
</ul>
<h2>实战：Dashboard 布局</h2>
<pre><code>.dashboard {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 240px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}</code></pre>
<p>CSS Grid 是现代 Web 布局的基石，掌握它能让你用声明式的方式完成任何布局需求。</p>`,
    tags: ['CSS', '布局'],
    date: '2026-03-20',
    readTime: 8,
    cover: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&q=80',
    featured: false
  },
  {
    id: 6,
    title: '前端性能优化实战：从 FCP 到 LCP 的完整优化路径',
    slug: 'frontend-performance-optimization',
    excerpt: '基于 Core Web Vitals 标准，系统梳理前端性能优化的策略和实践，从资源加载到渲染性能，全面提升用户体验。',
    content: `<h2>Core Web Vitals 核心指标</h2>
<p>Google 提出的三大核心 Web 指标：</p>
<ul>
<li><strong>LCP</strong>（Largest Contentful Paint）：最大内容绘制，应 ≤ 2.5s</li>
<li><strong>FID</strong>（First Input Delay）：首次输入延迟，应 ≤ 100ms</li>
<li><strong>CLS</strong>（Cumulative Layout Shift）：累计布局偏移，应 ≤ 0.1</li>
</ul>
<h2>资源加载优化</h2>
<h3>代码分割</h3>
<pre><code>const ArticleDetail = () => import('./views/ArticleDetail.vue')
const About = () => import('./views/About.vue')</code></pre>
<p>路由级别的懒加载可以将首屏 JS 体积减少 60% 以上。</p>
<h3>图片优化</h3>
<ul>
<li>使用 WebP/AVIF 格式</li>
<li>响应式图片：<code>srcset</code> + <code>sizes</code></li>
<li>懒加载：<code>loading="lazy"</code></li>
<li>模糊预加载：先显示低分辨率版本，再替换高清图</li>
</ul>
<h2>渲染性能优化</h2>
<ul>
<li>使用 <code>will-change</code> 提示浏览器优化</li>
<li>使用 <code>transform</code> 和 <code>opacity</code> 做动画（GPU 加速）</li>
<li>避免强制同步布局</li>
<li>使用 <code>requestAnimationFrame</code> 批量更新 DOM</li>
</ul>
<h2>构建优化</h2>
<ul>
<li>Tree-shaking：确保未使用的代码被打包移除</li>
<li>压缩：Gzip / Brotli</li>
<li>缓存策略：文件名哈希 + 强缓存</li>
</ul>
<p>性能优化是一个持续的过程，建议建立性能监控体系，在上线前和线上持续跟踪关键指标。</p>`,
    tags: ['性能优化', '前端', 'Web Vitals'],
    date: '2026-03-15',
    readTime: 11,
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    featured: false
  },
  {
    id: 7,
    title: 'TypeScript 类型体操入门：从基础到高级类型',
    slug: 'typescript-type-challenges',
    excerpt: '通过一系列循序渐进的类型挑战，掌握 TypeScript 高级类型的使用，包括条件类型、映射类型、模板字面量类型等。',
    content: `<h2>为什么要学类型体操？</h2>
<p>类型体操不仅仅是为了炫技。在实际项目中，合理的类型定义可以：</p>
<ul>
<li>大幅减少运行时错误</li>
<li>提供更好的 IDE 智能提示</li>
<li>让代码即文档</li>
<li>提升重构信心</li>
</ul>
<h2>基础：条件类型</h2>
<pre><code>type IsString<T> = T extends string ? true : false
type A = IsString<"hello"> // true
type B = IsString<42>      // false</code></pre>
<h2>进阶：映射类型</h2>
<pre><code>type Readonly&lt;T&gt; = {
  readonly [K in keyof T]: T[K]
}

type Partial&lt;T&gt; = {
  [K in keyof T]?: T[K]
}</code></pre>
<h2>高级：递归类型</h2>
<pre><code>type DeepReadonly&lt;T&gt; = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly&lt;T[K]&gt;
    : T[K]
}</code></pre>
<h2>实战：类型安全的 API 调用</h2>
<pre><code>type ApiResponse&lt;T&gt; = {
  data: T
  code: number
  message: string
}

async function request&lt;T&gt;(url: string): Promise&lt;ApiResponse&lt;T&gt;&gt; {
  const res = await fetch(url)
  return res.json()
}</code></pre>
<p>TypeScript 的类型系统是图灵完备的，掌握它需要持续练习，但回报是巨大的。</p>`,
    tags: ['TypeScript', '前端'],
    date: '2026-03-08',
    readTime: 12,
    cover: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80',
    featured: false
  },
  {
    id: 8,
    title: '设计模式在前端开发中的实际应用',
    slug: 'design-patterns-in-frontend',
    excerpt: '设计模式不是后端专属，在前端开发中同样大有用武之地。本文通过真实的 Vue/React 场景，讲解最实用的几种设计模式。',
    content: `<h2>前端常用的设计模式</h2>
<p>设计模式是解决特定问题的成熟方案。在前端开发中，以下模式最为实用：</p>
<h3>1. 观察者模式 / 发布订阅</h3>
<p>Vue 的响应式系统本质上就是观察者模式的实现。EventBus、Vuex/Pinia 的 store 订阅都基于此模式。</p>
<h3>2. 策略模式</h3>
<pre><code>const formatters = {
  date: (v) => new Date(v).toLocaleDateString(),
  currency: (v) => \`¥\${v.toFixed(2)}\`,
  percent: (v) => \`\${v}%\`
}

function format(type, value) {
  return formatters[type]?.(value) ?? value
}</code></pre>
<h3>3. 单例模式</h3>
<p>全局状态管理、弹窗管理器、请求缓存池等场景非常适合单例模式。</p>
<h3>4. 装饰器模式</h3>
<p>高阶组件（HOC）、Vue 的自定义指令都是装饰器模式的应用。</p>
<h3>5. 代理模式</h3>
<p>Vue3 的响应式系统基于 Proxy，图片懒加载也常用代理模式。</p>
<p>设计模式的目标是让代码更容易理解和维护，而不是增加复杂度。合理使用，拒绝过度设计。</p>`,
    tags: ['设计模式', '架构', '前端'],
    date: '2026-02-25',
    readTime: 9,
    cover: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    featured: false
  },
  {
    id: 9,
    title: 'Node.js Stream 流处理深入解析',
    slug: 'nodejs-stream-deep-dive',
    excerpt: '从基础概念到实战应用，深入理解 Node.js Stream 的工作原理，掌握高效处理大文件和实时数据的核心技术。',
    content: `<h2>Stream 是什么？</h2>
<p>Stream 是 Node.js 处理流式数据的抽象接口。它允许你逐块地读取/写入数据，而不是一次性将整个文件加载到内存中。</p>
<h2>四种基本流类型</h2>
<ul>
<li><strong>Readable</strong>：可读流，如 <code>fs.createReadStream</code></li>
<li><strong>Writable</strong>：可写流，如 <code>fs.createWriteStream</code></li>
<li><strong>Duplex</strong>：双工流，可读可写，如 <code>net.Socket</code></li>
<li><strong>Transform</strong>：转换流，读写过程中可修改数据，如 <code>zlib.createGzip</code></li>
</ul>
<h2>管道 Pipeline</h2>
<pre><code>const { pipeline } = require('stream/promises')

await pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('output.txt.gz')
)</code></pre>
<h2>实战：大文件处理</h2>
<p>当处理 GB 级别的大文件时，Stream 是唯一可行的方案：</p>
<pre><code>const readStream = fs.createReadStream('bigfile.csv')
const transform = new Transform({
  transform(chunk, encoding, callback) {
    const processed = processChunk(chunk)
    callback(null, processed)
  }
})</code></pre>
<p>理解 Stream 是成为高级 Node.js 开发者的必经之路。</p>`,
    tags: ['Node.js', '后端', 'Stream'],
    date: '2026-02-18',
    readTime: 13,
    cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    featured: false
  }
]

export const tags = [...new Set(articles.flatMap(a => a.tags))].sort()

export const archives = articles.reduce((acc, article) => {
  const year = article.date.slice(0, 4)
  if (!acc[year]) acc[year] = []
  acc[year].push(article)
  return acc
}, {})

export const author = {
  name: 'TechLog',
  title: '全栈工程师 / 技术写作者',
  bio: '热爱技术，喜欢探索前沿。专注于前端工程化、性能优化和开发者体验。\n在这里记录技术思考、学习心得和项目经验。',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  skills: ['Vue3', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vite', 'Next.js', 'Docker', 'AWS'],
  social: {
    github: 'https://github.com/techlog',
    twitter: 'https://twitter.com/techlog',
  }
}
