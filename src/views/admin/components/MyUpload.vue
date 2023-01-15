<template>
  <div>
    <el-upload
      class="uploader"
      ref="upload"
      :action="action"
      :headers="headers"
      :multiple="multiple"
      :disabled="disabled"
      :name="name"
      :limit="limit"
      :show-file-list="isShowFileList"
      :list-type="listType"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-exceed="exceed"
    >
      <slot> </slot>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { article_deleteArticleCover } from "@/api/article_api.js";
export default {
  props: {
    // 上传地址
    action: {
      type: String,
      required: true,
    },
    // 上传请求头
    headers: {
      type: Object,
      default: () => {},
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 上传的文件字段名
    name: {
      type: String,
      required: true,
    },
    // 限制最大上传图片
    limit: {
      type: Number,
      default: 1,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否显示上传列表
    isShowFileList: {
      type: Boolean,
      default: false,
    },
    // 上传列表样式
    listType: {
      type: String,
      default: "",
    },
  },
  name: "Upload",
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  methods: {
    // 上传成功事件
    handleSuccess(res, file) {
      if (res.code === 0) {
        // 子组件发送事件 将图片地址传递给父组件

        this.$emit("transmitImgUrl", res.imgUrl);
      }
    },
    // 手动移除图片处理
    async handleRemove(file, fileList) {
      // 调用接口 删除上传的图片
      const { data } = await article_deleteArticleCover({
        imgUrl: file.response.imgUrl,
      });
      if (data.code === 0) {
        // 删除成功发送事件通知父组件删除图片地址
        this.$emit("deleteImgUrl");
      }
    },
    // 显示照片墙配置
    handlePictureCardPreview(file) {
      // 显示照片墙
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传之前的处理
    beforeUpload(file) {
      const isJPGorPng = ["image/png", "image/jpeg"].find(
        (item) => file.type === item
      );
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPng) {
        this.$message.error("上传图片只能是 JPG 或 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPGorPng && isLt2M;
    },
    // 清空上传列表方法
    clearFiles() {
      this.$refs.upload.clearFiles();
    },
    // 超出上传个数事件
    exceed() {
      this.$message.warning("超出最大上传限制");
    },
  },
};
</script>

<style>
</style>