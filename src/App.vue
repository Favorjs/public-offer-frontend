<template>
  <div id="app">
    <SiteShell />
  </div>
</template>

<script>
import SiteShell from './layouts/SiteShell.vue'

export default {
  name: 'App',
  components: { SiteShell }
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>