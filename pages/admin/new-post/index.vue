<template>
  <div class="admin-new-post-page">
    <section class="flex container p-4 mx-auto">
      <AdminPostForm @submit="onSubmitted" />
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
  methods: {
    onSubmitted(postData) {
      this.$store.dispatch('addPost', postData).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>
