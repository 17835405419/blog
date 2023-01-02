<template>
  <div class="password-box">
    <el-form :model="pwdForm" :rules="rules" ref="pwdForm" label-width="100px">
      <el-form-item label="旧密码" prop="oldPassWord">
        <el-input
          v-model="pwdForm.oldPassWord"
          type="password"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassWord">
        <el-input
          v-model="pwdForm.newPassWord"
          type="password"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPassWord">
        <el-input
          v-model="pwdForm.confirmNewPassWord"
          type="password"
          placeholder="请确认新密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="changePwd">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { user_updatePwd } from "@/api/user_api.js";
export default {
  data() {
    // 自定义密码验证规则
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6 || value.length > 15) {
          callback(new Error("密码长度为6-15个字符"));
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdForm.newPassWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        if (value.length < 6 || value.length > 15) {
          callback(new Error("密码长度为6-15个字符"));
        }
      }
    };
    return {
      pwdForm: {
        oldPassWord: "",
        newPassWord: "",
        confirmNewPassWord: "",
      },
      rules: {
        newPassWord: [{ validator: validatePass, trigger: "blur" }],
        confirmNewPassWord: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    async changePwd() {
      const { data } = await user_updatePwd({
        oldPassWord: this.pwdForm.oldPassWord,
        newPassWord: this.pwdForm.newPassWord,
      });
      if (data.code === 0) {
        this.$message.success(data.msg);
      } else {
        this.$message.error(data.msg);
      }
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.el-form {
  margin-top: 30px;
}
/deep/.el-form-item {
  width: 35%;
  margin: 0 0 20px 0;
}
</style>