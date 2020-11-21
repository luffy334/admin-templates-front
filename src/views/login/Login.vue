<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="form.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { auth, menu } from '@/api/system'
  import { setToken, setMenu } from '@/utils/auth'

  export default {
    data() {
      return {
        form: {
          userName: 'luffy',
          password: 'luffy'
        }
      }
    },
    methods: {
      login() {
        auth(this.form).then((res) => {
          if(res) {
            setToken(res.token)
            menu().then(res => {
              setMenu(res)
              this.$router.push({ path: '/home' })
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {

  }
</style>