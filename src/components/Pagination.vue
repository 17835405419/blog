<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :current-page="1"
    @current-change="changePage"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: null,
    }, //总条数
    pageSize: {
      type: Number,
      default: 10,
    }, //每一页默认显示的条数
  },
  data() {
    return {};
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="less" scoped>
</style>