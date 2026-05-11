<template>
  <div class="min-h-screen" :style="{ backgroundColor: 'var(--bg-primary)' }">
    <NavBar />
    <main class="pt-16">
      <router-view v-slot="{ Component, route }">
        <Transition :name="transitionName" mode="out-in">
          <div :key="route.path" class="page-wrapper">
            <component :is="Component" />
          </div>
        </Transition>
      </router-view>
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'

const router = useRouter()
const transitionName = ref('page')

watch(() => router.currentRoute.value.path, (to, from) => {
  // 可以根据路由深度决定动画方向
  transitionName.value = 'page'
})
</script>

<style>
.page-wrapper {
  min-height: calc(100vh - 4rem);
}

.page-enter-active {
  animation: pageEnter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.page-leave-active {
  animation: pageLeave 0.25s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

@keyframes pageEnter {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pageLeave {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-8px); }
}
</style>
