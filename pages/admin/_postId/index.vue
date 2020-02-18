<template>
  <div class="admin-post-page">
    <section class="flex container p-4 mx-auto">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '~/components/Admin/AdminPostForm'
export default {
  layout: 'admin',
  middleware: ['checkAuth', 'auth'],
  components: {
    AdminPostForm
  },
  async asyncData({ params, $axios }) {
    try {
      const res = await $axios.get(
        `https://nuxt-blog-app-99a59.firebaseio.com/posts/${params.postId}.json`
      )
      return { loadedPost: { ...res.data, id: params.postId } }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch('editPost', editedPost).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>
