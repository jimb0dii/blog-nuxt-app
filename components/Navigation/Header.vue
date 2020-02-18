<template>
  <header class="shadow-lg">
    <div class="flex container p-4 mx-auto">
      <div class="logo">
        <nuxt-link to="/">BLOG APP</nuxt-link>
      </div>
      <div class="flex-grow" />
      <div
        @click="$emit('sidenavToggle')"
        class="drawer-toggle flex flex-col justify-between cursor-pointer"
        role="button"
      >
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <div class="links">
        <nuxt-link to="/posts" class="ml-2">Posts</nuxt-link>
        <nuxt-link to="/about" class="ml-2">About</nuxt-link>
        <nuxt-link to="/admin" class="ml-2">Admin</nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
.drawer-toggle {
  width: 35px;
}

@media (min-width: 768px) {
  .drawer-toggle {
    display: none;
  }
}

@media (max-width: 767px) {
  .links {
    display: none;
  }
}

.drawer-toggle .bar {
  height: 2px;
  background-color: #000;
}

.links a.nuxt-link-active {
  @apply text-red-900;
}
</style>
