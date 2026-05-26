<template>
  <div class="min-h-screen" :style="{ backgroundColor: 'var(--bg-primary)' }">
    <NavBar />
    <main class="pt-16 pb-16 md:pb-0">
      <router-view v-slot="{ Component, route }">
        <Transition :name="transitionName" mode="out-in">
          <div :key="route.path" class="page-wrapper">
            <component :is="Component" />
          </div>
        </Transition>
      </router-view>
    </main>
    <Footer />
    <BottomNav />
    <BackToTop />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import BottomNav from '@/components/BottomNav.vue'
import BackToTop from '@/components/BackToTop.vue'

const router = useRouter()
const transitionName = ref('page')

watch(() => router.currentRoute.value.path, () => {
  transitionName.value = 'page'
})
</script>

<style>
.page-wrapper {
  min-height: calc(100vh - 4rem);
}
</style>
