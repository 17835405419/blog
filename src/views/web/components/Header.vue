<template>
  <div class="header-box">
    <div class="header_logo-box">
      <img class="header_logo-img" src="@/assets/favicon.png" alt="Logo" />
      <span class="header_title-name">文霄博客站</span>
    </div>

    <div class="header_nav-box">
      <span @click="$router.replace('/')">博客首页</span>
      <span @click="$router.replace('/technology')">技术博客</span>
      <span @click="$router.replace('/lifeLog')">生活日志</span>
      <span @click="$router.replace('/leaveMessage')">留言</span>
      <span @click="$router.replace('/about')">关于我</span>
      <span>
        <i class="el-icon-zoom-in" @click="transmitSearch"></i>
      </span>

      <span @click="$router.push('/login')" v-if="!this.$store.state.token">
        登录
      </span>
      <span @click="$router.push('/admin/user/personal')" v-else>作者中心</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowSearch: false,
    };
  },
  methods: {
    transmitSearch() {
      this.isShowSearch = !this.isShowSearch;
      this.$emit("isShowSearch", this.isShowSearch);
    },
  },
};
</script>
<style lang="less" scoped>
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: @color-white;

  height: 35px;
}
// 左侧Logo区
.header_logo-box {
  display: flex;
  align-items: center;
  padding-left: 50px;
  .header_logo-img {
    width: 15px;
    height: 15px;
  }
  .header_title-name {
    font-size: @fs-16;
    color: @color-grey3;
    padding-left: 5px;
  }
}
//   导航区域
.header_nav-box {
  display: flex;
  justify-content: space-between;
  width: 45vw;
  padding-right: 50px;
  font-size: @fs-16;
  span {
    color: @color-grey2;
    &:hover {
      cursor: pointer;
      color: @color-grey4;
    }
  }
}
</style>