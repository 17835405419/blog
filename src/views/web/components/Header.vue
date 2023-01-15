<template>
  <div class="header-box">
    <div class="logo-box">
      <img src="@/assets/favicon.png" alt="" />
      <span>文霄博客站</span>
    </div>

    <div class="nav">
      <span @click="$router.push('/')">博客首页</span>
      <span>技术博客</span>
      <span>生活日志</span>
      <span>留言</span>
      <span>关于我</span>
      <span>
        <i class="el-icon-zoom-in"></i>
      </span>

      <span @click="$router.push('/login')" v-if="!this.$store.state.token">
        登录
      </span>
      <span @click="$router.push('/admin/user/personal')" v-else>作者中心</span>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.header-box {
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 1px 1px 5px 1px #eee;
  width: 100%;
  height: 55px;

  .logo-box {
    display: flex;
    align-items: center;
    margin: 0 6%;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 12px;
      color: rgb(82, 78, 78);
      margin-left: 10px;
    }
  }
  //   导航区域
  .nav {
    display: flex;
    width: 675px;
    margin-left: 220px;
    justify-content: space-between;
    font-size: 13px;
    span {
      color: rgb(136, 125, 125);
    }
    span:hover {
      cursor: pointer;
      color: rgb(65, 61, 61);
    }
  }
}
</style>