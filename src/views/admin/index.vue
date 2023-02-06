<template>
  <el-container class="container">
    <el-header>
      <!-- 头部 -->
      <div class="title">作者中心</div>
      <div class="header-right-box">
        <span @click="$router.push('/')">网站首页</span>
        <div class="user-info-box">
          <el-avatar
            shape="circle"
            key="cover"
            :src="$store.state.userInfo.avater"
          ></el-avatar>
          <!-- 昵称 -->
          <span>{{ $store.state.userInfo.nickName }}</span>
        </div>
        <!-- 退出按钮 -->
        <span class="outButton" @click="outLogin">退出</span>
      </div>
    </el-header>
    <!-- 侧边栏部分 -->
    <el-container>
      <el-aside width="198px">
        <el-menu
          background-color="rgb(133, 133, 133)"
          text-color="#fff"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu index="/admin/user">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              个人中心</template
            >
            <el-menu-item index="/admin/user/personal">个人资料</el-menu-item>
            <el-menu-item index="/admin/user/changePwd">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="/admin/article">
            <template slot="title">
              <i class="el-icon-reading"></i>
              文章管理</template
            >
            <el-menu-item index="/admin/article/release">发布文章</el-menu-item>
            <el-menu-item index="/admin/article/articleList"
              >文章列表</el-menu-item
            >
          </el-submenu>
          <el-menu-item index="/admin/article/star">
            <span slot="title">
              <i class="el-icon-thumb"></i>
              点赞管理</span
            >
          </el-menu-item>
          <el-menu-item index="/admin/article/comment">
            <span slot="title">
              <i class="el-icon-s-comment"></i>
              评论管理</span
            >
          </el-menu-item>
          <el-menu-item index="/admin/article/collection">
            <span slot="title">
              <i class="el-icon-star-off"></i>
              收藏列表</span
            >
          </el-menu-item>

          <el-menu-item index="/admin/user/fansList">
            <span slot="title">
              <i class="el-icon-magic-stick"></i>
              粉丝列表</span
            >
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    outLogin() {
      this.$confirm("是否退出登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          this.$store.commit("setUserToken", "");
          this.$store.commit("setUserInfo", "");
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
}
.el-main {
  background: linear-gradient(
      rgba(238, 238, 238, 0.6),
      rgba(255, 255, 255, 0.3)
    ),
    url("../../assets/image/index_bgc.webp");
  background-size: 100% 100%;
}
// 修改二级列表样式
.el-submenu {
  min-width: 198px;

  /deep/ .el-menu-item {
    font-size: @fs-12;
    text-align: center;
  }
}
/deep/.el-menu-item {
  min-width: 198px;
}
.el-menu-item.is-active {
  background-color: rgba(48, 48, 202, 0.5) !important;
}
/deep/.el-submenu__title:hover {
  background-color: rgba(48, 48, 202, 0.5) !important;
}
.el-menu-item:hover {
  background-color: rgba(48, 48, 202, 0.5) !important;
}

// 头部样式
.el-header {
  height: 70px !important;
  background-color: @color-grey2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: @fs-17;

  .title {
    color: #fff;
    font-weight: 600;
  }
  .header-right-box {
    display: flex;
    align-items: center;
    width: 22%;
    justify-content: space-around;
    font-size: @fs-15;
    color: #fff;
    .user-info-box {
      display: flex;
      align-items: center;
      span {
        padding-left: 5px;
      }
    }
    // 网站首页 效果设置
    span:first-child:hover,
    .outButton:hover {
      cursor: pointer;
      color: @color-grey4;
    }
  }
}

// // 侧边栏样式
.el-aside {
  background-color: @color-grey2;
}
</style>