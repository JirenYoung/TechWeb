# ============================================
# Stage 1: 构建
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# 利用 Docker 缓存层：先装依赖
COPY package.json package-lock.json ./
RUN npm ci --registry=https://registry.npmmirror.com

# 复制源码并构建
COPY . .
RUN npm run build

# ============================================
# Stage 2: 运行
# ============================================
FROM nginx:alpine

# 自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段拷贝产物
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
