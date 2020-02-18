<template>
  <div class="admin-page">
    <section class="container mx-auto flex flex-wrap px-4 my-4">
      <button
        @click="$router.push('/admin/new-post')"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Post
      </button>
      <button
        @click="onLogout"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </section>
    <section class="container mx-auto my-4">
      <h1 class="px-4">Existing Posts</h1>
      <PostList :posts="loadedPosts" is-admin />
    </section>
  </div>
</template>

<script>
import PostList from '~/components/Posts/PostList'
export default {
  layout: 'admin',
  middleware: ['checkAuth', 'auth'],
  components: {
    PostList
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/admin/auth')
    }
  }
}
</script>
