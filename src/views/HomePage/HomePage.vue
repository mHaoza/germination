<template>
  <div ref="webglRef" class="home-page" v-show="isShow"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// import World from './world/World'
import Experience from '@/threejs/genshinWorld/experience/experience'

const webglRef = ref<HTMLDivElement>()

onMounted(() => {
  // new World({ dom: webglRef.value })
  new Experience(webglRef.value!)
})

const isShow = ref(false)

setInterval(() => {
  const now = new Date().valueOf()
  if (now >= 1684166400000) {
    isShow.value = true
  }
}, 500)
</script>

<style scoped>
.home-page {
  width: 100vw;
  height: 100vh;
}
</style>
