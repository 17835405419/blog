<template>
  <div class="login-box">
    <el-card class="login-content">
      <div class="title">博客登陆</div>
      <el-form :model="user" :rules="loginRules" ref="loginForm">
        <el-form-item prop="userName">
          <!-- oninput原生事件 监听输入只能为数字 -->
          <el-input
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="user.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="user.passWord"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="button-box">
          <span @click="$router.push('/register')">还没有账号？点击注册</span>
          <el-button size="mini" @click="$router.push('/')">取消</el-button>
          <el-button size="mini" @click="getUserLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { user_login, user_getUserInfo } from "@/api/user_api"; //登录接口

export default {
  data() {
    return {
      user: {
        userName: 2456491540,
        passWord: "123123",
      },
      //   用户验证规则
      loginRules: {
        userName: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            min: 9,
            max: 9,
            message: "长度为九个字符",
            trigger: "blur",
          },
        ],
      },
      // 用户信息
      userInfo: {},
    };
  },

  methods: {
    // 登录
    async getUserLogin() {
      const { data } = await user_login({
        userName: this.user.userName,
        passWord: this.user.passWord,
      });

      if (data.code == 0) {
        const { token } = data;
        this.$message({
          message: "登陆成功",
          type: "success",
        });
        // 将用户token存储在vuex中
        this.$store.commit("setUserToken", token);
        // 获取用户数据
        const res = await user_getUserInfo();

        // 将用户数据保存到data中
        this.userInfo == res.data.userInfo;
        // 将用户数据保存到 vuex中
        this.$store.commit("setUserInfo", res.data.userInfo);
        // 跳转到主页
        setTimeout(() => {
          this.$router.push("/");
        }, 800);
      } else {
        this.$message({
          message: data.msg,
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-box {
  height: 100vh;
  background: url("@/assets/image/index_bgc.webp") no-repeat;
  background-size: 100% 100%;
  .layoutFlexCenter(row);
}

.login-content {
  width: 200px;
  height: 150px;
  background-color: @color-grey1;
  box-shadow: 3px 4px 8px 0.5px #c4bfbfb6;
  &:hover {
    box-shadow: 3px 4px 8px 0.5px #b8b4b4;
  }
  .title {
    text-align: center;
    font-weight: 500;
    margin-bottom: 20px;
    font-size: @fs-18;
    color: @color-grey2;
  }
  // 修改输入框默认样式
  /deep/.el-input__inner {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }

  .button-box {
    display: flex;
    justify-content: flex-end;
    span {
      font-size: @fs-12;
      margin-right: 20px;
      color: @color-grey2;
    }
    span:hover {
      color: @color-grey4;
      cursor: pointer;
    }
  }
}
</style>