<template>
  <div class="h-full w-full">
    <div
      v-if="show"
      @click="$emit('close')"
      class="backdrop h-full w-full z-900 fixed inset-x-0"
    ></div>
    <transition name="slide-side">
      <div
        v-if="show"
        @click="$emit('close')"
        class="sidenav flex flex-col h-full bg-white z-1000 fixed top-0 bottom-0 left-auto right-0"
      >
        <nuxt-link to="/posts" class="hover:text-red-900 active:text-red-900"
          >Posts</nuxt-link
        >
        <nuxt-link to="/about" class="hover:text-red-900 active:text-red-900"
          >About</nuxt-link
        >
        <nuxt-link to="/admin" class="hover:text-red-900 active:text-red-900"
          >Admin</nuxt-link
        >
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TheSidenav',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.7);
}

.sidenav {
  width: 320px;
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(200%);
}

.sidenav a {
  @apply p-4;
  border-bottom: 1px solid #e2e8f0;
}
</style>
