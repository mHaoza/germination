<template>
  <div class="post-page">
    <template v-for="post in posts" :key="post.path">
      <div>
        <router-link :to="post.path">{{ post.name }}</router-link>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = router
  .getRoutes()
  .filter((route) => route.path.includes('/post/'))

console.log('posts', posts)
</script>

<style scoped></style>
