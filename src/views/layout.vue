<template>
  <div>
    <header :style="{ 'background-color': primaryColor }" />
  </div>
</template>

<script>
import state from '@/theme'
export default {
  data() {
    return {}
  },
  computed: {
    primaryColor() {
      return state.primaryColor
    },
    originStyle() {
      return state.originStyle
    },
  },
}
</script>

<style></style>
