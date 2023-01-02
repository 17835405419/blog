<template>
  <div class="decx-box">
    <span>博主简介</span>
    <div class="content-box">
      <div class="avaterUrl-box">
        <el-avatar :size="size" :src="userInfo.avater"></el-avatar>
        <span>{{ userInfo.nickName }}</span>
        <span class="fans-num"> 粉丝数：{{ userInfo.fansNum }}</span>
      </div>
      <div class="userdecx-box">
        <span>
          {{ userInfo.desc }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    avaterUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      size: 30,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
.decx-box {
  background-color: #fff;
  box-shadow: 0 0 5px 0.2px #fff;
  padding: 10px;
  height: 180px;
  span {
    color: rgb(119, 113, 113);
  }
  .content-box {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    span {
      font-size: 10px;
    }
    .avaterUrl-box {
      display: flex;
      align-items: center;
      margin-left: 20px;
      // 选择除了第一个元素 因为第一个元素为el-avater中的图片 不排除会导致样式出错
      span:not(:first-child) {
        padding-left: 20px;
      }
      .fans-num {
        font-size: 10px;
        -webkit-transform-origin-x: 0; //兼容谷歌
        -webkit-transform: scale(0.8); //按比例缩小文字
      }
    }
    .userdecx-box {
      margin-top: 10px;
      text-indent: 2em;
      display: -webkit-box; /*必须结合的属性,将对象作为弹性伸缩盒子模型显示*/
      -webkit-line-clamp: 5; /*设置多少行*/
      -webkit-box-orient: vertical; /*必须结合的属性,设置或检索伸缩盒对象的子元素的排列方式*/
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>