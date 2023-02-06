<template>
  <div class="register-box">
    <el-card class="register-content">
      <div class="title">注册账号</div>
      <el-form
        :model="users"
        :rules="registerRules"
        label-width="80px"
        size="mini"
        ref="regForm"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="users.userName"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="users.passWord"></el-input>
        </el-form-item>
        <!-- 检查密码 -->
        <el-form-item label="确认密码" prop="checkPassWord">
          <el-input v-model="users.checkPassWord"></el-input>
        </el-form-item>
        <div class="button-box">
          <el-button type="primary" size="mini" @click="$router.push('/login')"
            >返回</el-button
          >
          <el-button
            type="info"
            size="mini"
            @click="$refs.regForm.resetFields()"
            >重置</el-button
          >
          <el-button type="success" size="mini" @click="register"
            >注册</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { user_register } from "@/api/user_api.js";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.users.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // -----------检测密码-----------

    return {
      users: {
        userName: null,
        passWord: "",
        checkPassWord: "",
      },

      // 验证规则
      registerRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 9,
            max: 9,
            message: "长度为九个数字",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 11,
            message: "长度在 5 到 11 个字符",
            trigger: "blur",
          },
        ],
        checkPassWord: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    register() {
      this.$refs.regForm
        .validate()
        .then(async (rel) => {
          if (rel) {
            //请求注册api
            const { data } = await user_register(this.users);
            console.log(data);
            if (data.code === 0) {
              this.$message.success(data.msg);
              this.$router.push("/login");
            } else {
              this.$message.error(data.msg);
            }
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "内容填写有误，请检查",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.register-box {
  height: 100vh;
  background: url("@/assets/image/index_bgc.webp") no-repeat;
  background-size: 100% 100%;
  .layoutFlexCenter(row);
}
.register-content {
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
      font-size: 13px;
      margin-right: 20px;
    }
    span:hover {
      color: rgb(145, 141, 141);
      cursor: pointer;
    }
  }
}
</style>