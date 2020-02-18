<template>
  <nuxt-link :to="postLink" class="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
    <div class="post-preview">
      <img :src="thumbnail" alt="" class="w-full" />
      <div class="p-4">
        <h4 class="post-title">{{ title }}</h4>
        <div class="post-content">{{ previewText }}</div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
    id: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    previewText: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  },
  computed: {
    postLink() {
      return this.isAdmin ? `/admin/${this.id}` : `/posts/${this.id}`
    }
  }
}
</script>

<style scoped>
.post-preview {
  @apply overflow-hidden;
  @apply shadow-lg;
  @apply rounded;
}
</style>
