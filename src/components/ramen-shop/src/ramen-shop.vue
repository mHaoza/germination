<template>
  <div class="ramen-shop">
    <canvas class="webgl" ref="webglRef"></canvas>
    <div class="overlay"></div>
    <div id="cooking">
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div id="area">
        <div id="sides">
          <div id="pan"></div>
          <div id="handle"></div>
        </div>
        <div id="pancake">
          <div id="pastry"></div>
          <div id="pastry2"></div>
          <div id="pastry3"></div>
        </div>
      </div>
      <h1>Cooking Your Ramen... <span id="progressPercentage"></span>%</h1>
    </div>
    <button class="start">START</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Experience from './Experience/Experience.js'

const webglRef = ref()

onMounted(() => {
  new Experience(document.querySelector('canvas.webgl'))
})
</script>

<style scoped>
@import url(./style.css);
</style>
