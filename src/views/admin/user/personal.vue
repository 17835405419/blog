<template>
  <div class="personal-box">
    <el-form label-width="120px" :model="userForm">
      <el-form-item label="头像" class="avater-box">
        <el-avatar :size="50" :src="userForm.avater"></el-avatar>
        <Upload
          :action="action"
          :headers="headers"
          name="avater"
          class="upload-button"
          :disabled="isDisable"
          @transmitImgUrl="getChildUrl"
        >
          <el-button type="success" size="mini" :disabled="isDisable"
            >上传</el-button
          >
        </Upload>
      </el-form-item>

      <el-form-item label="昵称">
        <el-input
          v-model="userForm.nickName"
          :placeholder="userForm.nickName"
          :disabled="isDisable"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="userForm.sex" :label="0" :disabled="isDisable"
          >男</el-radio
        >
        <el-radio v-model="userForm.sex" :label="1" :disabled="isDisable"
          >女</el-radio
        >
        <el-radio v-model="userForm.sex" :label="2" :disabled="isDisable"
          >未知</el-radio
        >
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input
          type="textarea"
          rows="3"
          maxlength="50"
          v-model="userForm.desc"
          resize="none"
          :disabled="isDisable"
        >
        </el-input>
      </el-form-item>

      <!-- <el-form-item label="手机号">
        <el-input v-model="form.phone" :disabled="true"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="电子邮箱">
        <el-input
          v-model="userInfo.email"
          placeholder="无"
          :disabled="true"
        ></el-input>
      </el-form-item> -->

      <el-form-item>
        <el-button
          type="success"
          size="mini"
          @click="isDisable = !isDisable"
          round
        >
          修改
        </el-button>

        <el-button
          type="success"
          size="mini"
          round
          @click="change"
          :disabled="isDisable"
          >应用</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";

import { user_updateUserInfo } from "@/api/user_api.js";
import { updateLocalUserInfo } from "@/untils/untils.js";
import Upload from "../components/MyUpload.vue";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      isDisable: true, //是否显示表单禁用
      userForm: {
        avater: "",
      }, //用户信息
      action: "http://127.0.0.1:3000/api/upload/avater", //头像上传地址
      headers: {
        Authorization: `Bearer ${this.$store.state.token}`,
      }, //上传携带的参数
    };
  },
  mounted() {
    // 将vuex中的数据赋值给 data
    this.userForm = this.userInfo;
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    async change() {
      const { data } = await user_updateUserInfo(this.userForm);
      if (data.code == 0) {
        // 调用函数修改本地用户数据
        await updateLocalUserInfo(this.$store, data.msg);
      }
    },

    getChildUrl(avater) {
      // 获取子组件传递回来的头像地址
      this.userForm.avater = avater;
    },
  },
};
</script>

<style lang="less" scoped>
// 修改第一盒子
/deep/.avater-box .el-form-item__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  .el-avatar {
    margin-right: 10px;
  }
}

.personal-box {
  width: 200px;
  margin-top: 30px;
  transform: scale(1.2);
}
</style>

