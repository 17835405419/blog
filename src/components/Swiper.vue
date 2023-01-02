<template>
  <el-carousel
    :height="height"
    :autoplay="autoplay"
    :direction="direction"
    loop
  >
    <el-carousel-item v-for="(item, index) in swiperItem" :key="index">
      <img :src="item.imgUrl" :alt="item.alt" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "250px",
    }, //高度
    autoplay: {
      type: Boolean,
      default: true,
    }, //是否自动播放
    direction: {
      type: String,
      default: "horizontal",
    }, //轮播方向
    swiperItem: {
      type: Array,
      required: true,
    }, //轮播数据
  },
};
</script>

<style lang="less" scoped>
img {
  height: 100%;
  width: 100%;
}
</style>