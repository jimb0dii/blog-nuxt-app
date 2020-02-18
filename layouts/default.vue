<template>
  <div id="__app">
    <Header @sidenavToggle="displayDrawer = !displayDrawer" />
    <Drawer :show="displayDrawer" @close="displayDrawer = false" />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import Header from '~/components/Navigation/Header.vue'
import Drawer from '~/components/Navigation/Drawer.vue'

export default {
  // middleware: 'log',
  components: {
    Header,
    Drawer
  },
  data() {
    return {
      displayDrawer: false
    }
  }
}
</script>
