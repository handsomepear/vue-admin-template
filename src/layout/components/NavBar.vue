<template>
  <div class="navbar">
    <div class="right-menu">
      <theme-picker />
    </div>
  </div>
</template>

<script>
import ThemePicker from './ThemePicker'
import { state } from '@/theme'
export default {
  components: { ThemePicker },
  computed: {
    primaryColor() {
      return state.primaryColor
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-color: var(--primary-color);
}

.right-menu {
  float: right;
  height: 100%;
  vertical-align: middle;
}
</style>
