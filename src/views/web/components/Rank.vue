<template>
  <el-card>
    <div slot="header" class="header-box">
      <span>|</span>
      <span>{{ title }}</span>
    </div>

    <div class="content-item" v-for="(item, index) in rankLists" :key="index">
      <p @click="goToArticleInfo(item.articleId, item.title)">
        {{ item.title }}
      </p>
      <p>阅读：{{ item.articleHandle.read }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    rankLists: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    goToArticleInfo(articleId, title) {
      // 将点击的id回传给父组件
      this.$emit("toInfoQuery", articleId);

      this.$router.push({
        path: "/articleInfo",
        query: {
          articleId,
          name: title,
        },
      });
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.el-card__header {
  padding: 13px;
  font-size: 12px;
  .header-box {
    span {
      font-size: @fs-16;
      color: @color-grey3;
      &:last-child {
        padding-left: 10px;
      }
    }
  }
}
/deep/.el-card__body {
  padding: 10px 10px 10px 20px;
}
.content-item {
  p {
    margin: 3px 0;
    font-size: @fs-15;
    color: @color-grey2;
    &:first-child:hover {
      cursor: pointer;
      color: @color-grey4;
      text-decoration: underline;
    }
    &:last-child {
      font-size: @fs-12;
      margin-bottom: 5px;
    }
  }
}
</style>