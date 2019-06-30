<template>
  <div class="InfoRelease">
    <navbar></navbar>
    <el-container>
      <el-aside style="width: 151px;height: 534px;position: fixed;top: 90px">
        <el-menu
          :default-active="Index"
          @select="handleSelect"
          class="menu1">
          <el-menu-item index="a">
            <i class="el-icon-setting"></i>
            <span slot="title">个人成绩展示</span>
          </el-menu-item>
          <el-menu-item index="b">
            <i class="el-icon-document"></i>
            <span slot="title">全体成绩排名</span>
          </el-menu-item>
          <el-menu-item style="height: 267px;cursor: pointer" disabled>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div  style="margin-top: 100px">
          <div v-show="Index === 'a'" style="margin-left: 160px;">
            <el-form :inline="true">
              <el-form-item label="日期：" >
                <div class="block">
                  <el-date-picker
                    v-model="personalData.date"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="通关时间：" >
                <el-input style="width: 180px" v-model="personalData.time" clearable placeholder="请输入" />
              </el-form-item>
              <el-form-item label="玩家名：" >
                <el-input style="width: 200px" v-model="personalData.userName" clearable placeholder="请输入" />
              </el-form-item>
              <el-form-item label="难度：" >
                <el-select v-model="personalData.value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="line-height: 0.3;margin-left: 20px" @click="getPersonalDataInfo">查 询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              :data="getPersonalData"
              stripe
              border
              style="width: 100%;">
              <el-table-column type="index" label="排名" width="80%" align="center" />
              <el-table-column prop="name" label="玩家" min-width="13%" align="center" />
              <el-table-column prop="usetime" label="通关时间" min-width="10%" align="center" />
              <el-table-column prop="createtime" label="日期" min-width="9%" align="center" />
              <el-table-column label="操作" min-width="9%" align="center">
                <template slot-scope="scope">
                  <span class="spanStyle">
                    <el-button type="primary" icon="el-icon-delete" size="mini" @click="delPersonal(scope.row.createtime)"></el-button>
                    <el-dialog style="margin-top: 30px" title="提示" :visible.sync="dialogTableVisible" width="40%">
                      确认删除
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="delPersonalData(scope.row.createtime)">确 定</el-button>
                        <el-button type="primary" @click="dialogTableVisible = false">取 消</el-button>
                       </div>
                     </el-dialog>
                  </span>
                </template>
               </el-table-column>
            </el-table>
          </div>
          <div v-show="Index === 'b'" style="margin-left: 160px">
            <el-form :inline="true">
              <el-form-item label="日期：" >
                <div class="block">
                  <el-date-picker
                    v-model="allData.date"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="通关时间：" >
                <el-input style="width: 180px" v-model="allData.time" clearable placeholder="请输入" />
              </el-form-item>
              <el-form-item label="玩家名：" >
                <el-input style="width: 180px" v-model="allData.userName" clearable placeholder="请输入" />
              </el-form-item>
              <el-form-item label="难度：" >
                <el-select v-model="allData.value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="line-height: 0.3;margin-left: 20px" @click="getAllDataInfo">查 询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              :data="getAllData"
              stripe
              border
              style="width: 100%;">
              <el-table-column type="index" label="排名" width="80%" align="center" />
              <el-table-column prop="name" label="玩家" min-width="13%" align="center" />
              <el-table-column prop="usetime" label="通关时间" min-width="10%" align="center" />
              <el-table-column prop="createtime" label="日期" min-width="9%" align="center" />
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
    return {
      phone: '',
      Index: 'a',
      personalData: {
        date: '',
        time: '',
        userName: '',
        phone: '',
        value: ''
      },
      allData: {
        date: '',
        time: '',
        userName: '',
        value: ''
      },
      deleteData: {
        createtime: '',
        phone: ''
      },
      options: [{
        value: '选项1',
        label: '初级'
      }, {
        value: '选项2',
        label: '中级'
      }, {
        value: '选项3',
        label: '高级'
      }],
      value: '',
      dialogTableVisible: false,
      getPersonalData: [],
      getAllData: []
    }
  },
  mounted () {
    this.getPersonalDataInfo()
    this.getAllDataInfo()
  },
  methods: {
    // 查看个人成绩
    getPersonalDataInfo () {
      let json = {}
      json = {
        params: {
          date: this.personalData.date,
          time: this.personalData.time,
          userName: this.personalData.userName,
          phone: sessionStorage.getItem('userName'),
          value: this.personalData.value
        }
      }
      this.$axios.get('/GradeRanking/getNewPersonalDataInfo', json).then(res => {
        this.getPersonalData = res.data
        for (let i = 0; i < this.getPersonalData.length; i++) {
          this.getPersonalData[i].createtime = this.resolvingDate(this.getPersonalData[i].createtime)
        }
      })
    },
    // 查看所有人成绩
    getAllDataInfo () {
      let json = {}
      json = {
        params: {
          date: this.allData.date,
          time: this.allData.time,
          userName: this.allData.userName,
          value: this.allData.value
        }
      }
      this.$axios.get('/GradeRanking/getNewAllDataInfo', json).then(res => {
        this.getAllData = res.data
        for (let i = 0; i < this.getAllData.length; i++) {
          this.getAllData[i].createtime = this.resolvingDate(this.getAllData[i].createtime)
        }
      })
    },
    delPersonal (value) {
      this.dialogTableVisible = true
      this.deleteData.createtime = value
      this.deleteData.phone = sessionStorage.getItem('userName')
      console.log(this.deleteData)
    },
    // 删除个人成绩
    delPersonalData (value) {
      this.$axios.put('/GradeRanking/delPersonalData' +
        '?createtime=' +
        this.deleteData.createtime +
        '&phone=' +
        this.deleteData.phone
      ).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.dialogTableVisible = false
        this.getPersonalDataInfo()
      })
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
      this.Index = value
    }
  }
}
</script>

<style scoped>

</style>
<style>
  .menu1 .el-menu-item {
    height: 89px;
    line-height: 89px;
  }
  .el-table__header tr, .el-table__header th {
    padding: 0;
    height: 34px;
  }
  .el-table__body tr, .el-table__body td {
    padding: 0;
    height: 34px;
  }
  .el-input__inner {
    height: 30px;
  }
</style>
