<template>
  <div class="post-page">
    <section class="container mx-auto text-center">
      <h1 class="post-title">
        {{ loadedPost.title }}
      </h1>
      <div class="post-details">
        <div class="post-detail">
          Last updated on {{ loadedPost.updatedDate | date }}
        </div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    if (context.payload) {
      return {
        loadedPost: context.payload.postData
      }
    }
    return context.$axios
      .get(
        `https://nuxt-blog-app-99a59.firebaseio.com/posts/${context.params.id}.json`
      )
      .then((res) => {
        return {
          loadedPost: res.data
        }
      })
      .catch((error) => error(error))
  }
}
</script>
