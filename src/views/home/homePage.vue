<template>
  <div>HomePage</div>
  <div class="markdown-body">
    <VueComponent />
  </div>
</template>

<script setup lang="ts">
import { attributes, VueComponent } from './测试md文件.md'

console.log('attributes', attributes)
</script>

<style scoped></style>
