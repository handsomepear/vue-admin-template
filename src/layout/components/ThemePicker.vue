<template>
  <div class="theme-picker">
    <span>设置主题</span>
    <el-color-picker v-model="themeColor" @change="changeThemeColor"></el-color-picker>
  </div>
</template>

<script>
import { state, mutations } from '@/theme'
export default {
  data() {
    return {
      themeColor: state.primaryColor,
    }
  },
  methods: {
    // 确定设置主题
    changeThemeColor() {
      mutations.setPrimaryColor(this.themeColor)
    },
  },
}
</script>
