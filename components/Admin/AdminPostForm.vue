<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnailLink"
      >Thumbnail Link</AppControlInput
    >
    <AppControlInput v-model="editedPost.previewText" control-type="textarea"
      >Preview Text</AppControlInput
    >
    <AppControlInput v-model="editedPost.content" control-type="textarea"
      >Content</AppControlInput
    >

    <AppButton type="submit">Save</AppButton>

    <AppButton
      @click="onCancel"
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      >Cancel</AppButton
    >
  </form>
</template>

<script>
import AppControlInput from '~/components/UI/AppControlInput'
import AppButton from '~/components/UI/AppButton'
export default {
  components: {
    AppControlInput,
    AppButton
  },
  props: {
    post: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: '',
            title: '',
            thumbnailLink: `https://picsum.photos/seed/${Math.floor(
              Math.random() * 1000 + 1
            )}/300/200`,
            previewText: '',
            content: ''
          }
    }
  },
  methods: {
    onSave() {
      // save post
      this.$emit('submit', this.editedPost)
    },
    onCancel() {
      // navigate back
      this.$router.push('/admin')
    }
  }
}
</script>
