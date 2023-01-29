<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
    <el-breadcrumb-item
      :to="{ path: item.path }"
      v-for="(item, index) in routelists"
      :key="index"
      >{{ item.name }}</el-breadcrumb-item
    >
    <el-breadcrumb-item> {{ $route.query.tagName }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  mounted() {
    const list = this.$route.matched.map((item) => {
      return { path: item.path, name: item.meta.title };
    });
  },
  data() {
    return {};
  },
  computed: {
    routelists() {
      return this.$route.matched.map((item) => {
        return { path: item.path, name: item.meta.title };
      });
    },
  },
};
</script>

<style lang='less' scoped>
.el-breadcrumb {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>