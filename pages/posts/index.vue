<template>
  <div class="posts-page">
    <section class="container mx-auto">
      <PostList :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
import PostList from '~/components/Posts/PostList'

export default {
  // middleware: 'log',
  components: {
    PostList
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>
