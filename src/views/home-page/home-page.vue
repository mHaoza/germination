<template>
  <div ref="webglRef" class="home-page"></div>
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
</script>

<style scoped>
.home-page {
  width: 100vw;
  height: 100vh;
}
</style>
