<template>
  <div class="Login" :style="note">
    <div class="spanClass" style="text-align: center">
      <span class="m138">扫雷后台管理系统</span><br>
      <span class="m139">Mine sweeping background management system</span>
    </div>
    <div class="loginClass">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-form" status-icon label-width="100px">
        <el-form-item label="账号" prop="input">
          <el-input v-model="ruleForm.input" clearable placeholder="请输入账号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="input1">
          <el-input v-model="ruleForm.input1" show-password clearable placeholder="请输入密码" autocomplete="off" @keyup.enter.native="enterLogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 300px" type="primary" @click="goLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import IotNavbar from '@/components/Navbar'
export default {
  components: { IotNavbar },
  name: 'login',
  data: () => ({
    note: {
      backgroundImage: 'url(' + require('../assets/loginBackground.jpg') + ')',
      backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '100%'
    },
    formData: {},
    ruleForm: {
      input: '',
      input1: ''
    },
    rules: {
      input: [
        {required: true, message: '账号不能为空', trigger: 'blur'}
      ],
      input1: [
        {required: true, message: '密码不能为空', trigger: 'blur'}]
    },
    radio: 0
  }),
  mounted () {
    // this.getCookie()
  },
  methods: {
    goLogin () {
      let json = {}
      json = {
        params: {
          userName: this.ruleForm.input,
          password: this.ruleForm.input1
        }
      }
      // this.setCookie(this.input, this.input1, 7)
      this.$axios.get('/admin/login', json).then(res => {
        if (res.data.status === 'success') {
          this.setSessionStorage(this.ruleForm.input, res.data.role)
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
          console.log(11111111)
          console.log(res.data)
          this.$router.push('/BasicInfo')
        } else {
          this.$message({
            showClose: true,
            message: '账号或密码错误',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    enterLogin () {
      this.goLogin()
    },
    setSessionStorage (userName, role) {
      sessionStorage.setItem('userName', userName)
      sessionStorage.setItem('role', role)
    }
  }
}
</script>

<style scoped>
  .el-form-item__label {
    font-size: 20px;
    color: #D1D1D1;
  }
  .el-input__inner {
    background-color: #EDEDED;
  }
  .Login {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0 0 15px 0;
    margin: 80px auto 0 auto;
  }
  .spanClass{
    margin-top: 80px;
    margin-left: 20px;
  }
  .loginClass{
    width: 450px;
    height: 350px;
    margin: 30px 680px 0 auto;
    border: 1px solid #436EEE;
    border-radius: 10px;
  }
  .m138{
    font-size: 40px;
    color: #FFF5EE;
  }
  .m139{
    font-size: 19px;
    color: #FFF5EE;
  }
  .m140{
    display: inline-block;
  }
  .m141{
    display: inline-block;
  }
</style>
<style>
  .login-form .el-input__inner{
    height: 40px;
  }
  .login-form .el-form-item__label{
    font-size: 18px;
    color: #CDCDC1;
  }
</style>
