<template>
  <div class="home-page">
    <section
      class="bg-hero-image text-center py-32 bg-cover bg-center relative"
    >
      <h1>Get the latest news!</h1>
    </section>
    <div class="container mx-auto">
      <PostList :posts="loadedPosts" />
    </div>
  </div>
</template>

<script>
import PostList from '~/components/Posts/PostList'

export default {
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

<style scoped>
.bg-hero-image {
  background-image: url('~assets/images/main-page-background.jpg');
}
</style>
