<template>
  <div class="home">
    <h1>home</h1>
    <el-row>
      <span>自定义button组件</span>
      <Button type="primary" text="home" />
    </el-row>
    <el-row>
      <span>element-ui button 组件：</span>
      <el-button type="primary" disabled>主要按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import Button from './Render'
export default {
  components: {
    Button,
  },
}
</script>

<style></style>
