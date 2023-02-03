<template>
  <el-card>
    <div slot="header">
      <span class="header_tag-title">标签云</span>
    </div>

    <el-tag
      :color="bgColor(index)"
      size="middle"
      v-for="(item, index) in tagLists"
      :key="index"
      @click="transmitTag(item.tagName)"
      >{{ item.tagName }}</el-tag
    >
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
  padding: 13px;
}
/deep/.el-card__body {
  padding: 10px;
}
.header_tag-title {
  font-size: @fs-16;
  color: @color-grey3;
}

.el-tag {
  color: @color-white;
  margin: 8px;
  cursor: pointer;
  &:hover {
    color: @color-black;
    transition: all 0.5s;
    box-shadow: 1px 3px 8px 0.3px @color-grey2;
  }
}
</style>