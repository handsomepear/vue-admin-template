<template>
  <div class="login">
    <el-form>
      <el-form-item>
        <el-input type="text" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-input type="text" placeholder="请输入密码" />
      </el-form-item>
      <el-button @click="doLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    doLogin() {
      this.$store
        .dispatch('LoginByUsername', this.loginForm)
        .then(() => {
          // 登录之后重定向到首页
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
  },
}
</script>

<style></style>
