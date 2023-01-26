<template>
  <!-- <div ref="worldRef" class="home-page"></div> -->
  <RamenShop />
</template>

<script setup lang="ts">
import RamenShop from '@/components/ramen-shop/'
// import { ref, onMounted } from 'vue'

// import World from './world/World'

// const worldRef = ref()

// onMounted(() => {
//   new World({ dom: worldRef.value })
// })
</script>

<style scoped>
.home-page {
  width: 100vw;
  height: 100vh;
}
</style>
