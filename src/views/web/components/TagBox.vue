<template>
  <el-card>
    <div slot="header">
      <span class="top-title">标签云</span>
    </div>
    <div class="tag-content">
      <el-tag
        :color="bgColor(index)"
        size="small"
        v-for="(item, index) in tagLists"
        :key="index"
        @click="transmitTag(item.tagName)"
        >{{ item.tagName }}</el-tag
      >
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    tagLists: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    // 默认vue是不允许在计算属性中传参的 但我们可以使用闭包
    bgColor(index) {
      return () =>
        `rgb(${255 * Math.random(index)},${255 * Math.random(index)},${
          255 * Math.random(index)
        })`;
    },
  },
  methods: {
    transmitTag(tagName) {
      this.$emit("tagName", tagName);
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.el-card__header {
  padding: 12px 12px 12px 23px;
}
/deep/.el-card__body {
  padding: 10px;
}
.top-title {
  font-size: 12px;
}
.tag-content {
  .el-tag {
    color: #fff;
    margin: 3px;
    cursor: pointer;
  }
  .el-tag:hover {
    box-shadow: 0 0 5px 1px #d7d5d5;
    color: #ab6262;
  }
}
</style>