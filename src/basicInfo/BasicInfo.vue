<template>
  <div class="BasicInfo">
    <navbar></navbar>
    <el-container>
      <el-aside style="width: 151px;height: 534px;position: fixed;top: 90px">
        <el-menu
          :default-active="Index"
          @select="handleSelect"
          class="menu">
          <el-menu-item index="b">
            <i class="el-icon-menu"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div style="margin-top: 100px">
          <div v-show="Index === 'a'" style="margin-left: 160px;">
            <el-table
              :data="PersonalData"
              stripe
              border
              style="width: 100%;">
              <el-table-column prop="name" label="玩家名" min-width="13%" align="center" />
              <el-table-column prop="phone" label="账号" min-width="10%" align="center" />
              <el-table-column prop="password" label="密码" min-width="10%" align="center" />
              <el-table-column prop="createtime" label="创建时间" min-width="10%" align="center" />
              <el-table-column prop="updatetime" label="更新时间" min-width="9%" align="center" />
              <el-table-column label="操作" min-width="9%" align="center">
                <template slot-scope="scope">
                  <span class="spanStyle">
                    <el-button type="text"  @click="changePasswordDialog(scope.row.phone)">修改密码</el-button>
                    <el-dialog style="margin-top: 30px" title="提示" :visible.sync="dialogTableVisible" width="40%">
                      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="新密码" prop="pass">
                          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
                          <el-button @click="resetForm('ruleForm')">重置</el-button>
                          <el-button type="primary" @click="dialogTableVisible = false">取 消</el-button>
                        </el-form-item>
                      </el-form>
                     </el-dialog>
                  </span>
                </template>
               </el-table-column>
            </el-table>
          </div>
         </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navbar from '@/components/Navbar'
export default {
  name: 'info',
  components: { navbar },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      Index: 'a',
      phone: '',
      dialogTableVisible: false,
      PersonalData: []
    }
  },
  mounted () {
    this.getPersonalData()
  },
  methods: {
    getPersonalData () {
      this.phone = sessionStorage.getItem('userName')
      this.$axios.get('/PersonalData/getPersonalData' +
      '?phone=' +
      this.phone
      ).then(res => {
        this.PersonalData = res.data
        for (let i = 0; i < this.PersonalData.length; i++) {
          this.PersonalData[i].createtime = this.resolvingDate(this.PersonalData[i].createtime)
          this.PersonalData[i].updatetime = this.resolvingDate(this.PersonalData[i].updatetime)
        }
      })
    },
    submitForm (ruleForm) {
      let password = ruleForm.pass
      let updatetime = this.getTime()
      let phone = sessionStorage.getItem('userName')
      this.$axios.put('/PersonalData/changePassword' +
        '?phone=' +
        phone +
        '&password=' +
        password +
        '&updatetime=' +
        updatetime
      ).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.resetForm('ruleForm')
        this.dialogTableVisible = false
        this.getPersonalData()
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    changePasswordDialog (value) {
      this.dialogTableVisible = true
    },
    getTime () {
      let d = new Date()
      let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
      let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
      let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
      let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
      let times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
      return times
    },
    resolvingDate (date) {
    // date是传入的时间
      let d = new Date(date)
      let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
      let day = ''
      let hours = ''
      if (d.getHours() < 8) {
        let hour = d.getHours() - 8 + 24
        hours = hour < 10 ? '0' + hour : hour
        let newday = d.getDate() - 1
        day = newday < 10 ? '0' + newday : newday
      } else {
        let hour = d.getHours() - 8
        hours = hour < 10 ? '0' + hour : hour
        let newday = d.getDate()
        day = newday < 10 ? '0' + newday : newday
      }
      let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
      let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
      let times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
      return times
    },
    handleSelect (value) {
      this.activeIndex = value
    }
  }
}
</script>

<style scoped>
  .el-form--inline .el-form-item{
    height: 20px;
  }
  .el-menu{
    width: 150px;
  }
  .el-input {
    width: 217px;
  }
  .spanStyle {
    color: #0075f0;
  }
  .spanStyle1 {
    color: red;
    cursor: pointer;
    margin-left: 20px;
  }

</style>
<style>
  .el-menu-item.is-active{
    background: #F8F8FF;
  }
  .el-input__inner {
    height: 30px;
  }
  .aform .el-form-item__label {
    font-size: 20px;
  }
  .aform {
    width: 600px;
    height: 400px;
    margin-left: 400px;
    margin-top: 100px;
  }
  /*.form {*/
    /*margin-top: 80px;*/
  /*}*/
  .menu .el-menu-item {
    height: 89px;
    line-height: 89px;
  }
  .spanStyle .el-form-item__error {
    left: 10px;
  }
  .tableStyle .el-table__header tr, .el-table__header th {
    padding: 0;
    height: 35px;
  }
  .tableStyle .el-table__body tr, .el-table__body td {
    padding: 0;
    height: 35px;
  }
</style>
