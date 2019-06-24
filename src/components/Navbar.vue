<template>
  <div style="width: 100%;text-align: center">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="BasicInfo" style="margin-left: 350px">信息数据管理</el-menu-item>
      <el-menu-item index="InfoRelease">成绩排名</el-menu-item>
      <el-menu-item index="" style="font-size: 14px;margin-left: 650px">
        <el-dropdown>
           <span class="el-dropdown-link" style="color: white">
             Hi,{{userAccount}}<i class="el-icon-arrow-down el-icon--right" style="color: white"></i>
           </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click="clearLogin">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: 'BasicInfo',
      userAccount: ''
    }
  },
  created: function () {
    this.activeIndex = this.$route.path.substr(1)
    this.userAccount = sessionStorage.getItem('userName')
  },
  watch: {
    // 监听路由变化
    // $route (to) {
    //   this.activeIndex = to.path.substr(1)
    //   console.log(this.activeIndex)
    // }
  },
  methods: {
    handleSelect (keyPath) {
      if (keyPath !== '') {
        this.$router.push({ path: '/' + keyPath })
      } else {}
    },
    clearLogin () {
      sessionStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
  .el-menu.el-menu--horizontal {
    border-bottom: solid 1px #e6e6e6;
    width: 100%;
    height: 100px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    padding:0 8px;
  }

  .el-menu-item {
    width: 210px;
    height: 90px;
    font-size: 18px;
  }

  .el-menu--horizontal>.el-menu-item {
    line-height: 90px;
  }
</style>
