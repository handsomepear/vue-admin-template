<template>
  <div>
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import { NavBar } from './components'
export default {
  components: {
    NavBar,
  },
}
</script>

<style></style>
