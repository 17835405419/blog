<template>
  <div class="nav-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
      <el-breadcrumb-item> {{ $route.meta.title }} </el-breadcrumb-item>
      <!-- 如果没有传三层面包屑 则不显示 -->
      <el-breadcrumb-item v-if="$route.query.name ? true : false">{{
        $route.query.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.nav-box {
  height: 20px;
  margin: 5px 0;
  padding-left: 5px;
  background-color: @color-white;
  display: flex;
  align-items: center;
  border-left: 3px solid rgb(230, 173, 59);
}
.el-breadcrumb {
  font-size: @fs-16;
}
</style>