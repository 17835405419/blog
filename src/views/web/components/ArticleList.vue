<template>
  <el-card class="article-box" shadow="hover">
    <div class="article_content-box">
      <div class="content_img-box" v-if="articleInfo.articleImg">
        <img class="img" :src="articleInfo.articleImg" alt="封面" />
      </div>

      <div class="content_text-box">
        <h4 class="text-title" @click="goToArticleInfo(articleInfo.articleId)">
          {{ articleInfo.title }}
        </h4>
        <p
          class="text-content"
          v-html="articleInfo.content.replace(/<[^>]+>/g, '')"
        ></p>

        <div class="text-info">
          <span class="el-icon-date info"
            >&nbsp&nbsp{{ articleInfo.createTime | FormatTime }}</span
          >
          <span class="el-icon-chat-dot-square info"
            >&nbsp&nbsp{{ articleInfo.articleHandle.comment }}</span
          >
          <span class="el-icon-thumb info"
            >&nbsp&nbsp{{ articleInfo.articleHandle.star }}</span
          >
          <span class="el-icon-view info"
            >&nbsp&nbsp{{ articleInfo.articleHandle.read }}</span
          >
        </div>

        <div class="tag-box">
          <el-tag
            type="success"
            size="mini"
            class="tag"
            effect="plain"
            v-for="(item, index) in articleInfo.showTagList.slice(0, 3)"
            :key="index"
          >
            {{ item }}
          </el-tag>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    goToArticleInfo(articleId) {
      this.$router.push({
        path: "/articleInfo",
        query: {
          articleId,
        },
      });
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.el-card__body {
  padding: 0;
}

.article_content-box {
  position: relative;
  height: 80px;
  box-sizing: border-box; //怪异盒子
  padding: 10px;
}
// 文章图片盒子
.content_img-box {
  position: absolute;
  right: 30px;
  height: 60px;
  width: 60px;
  .img {
    width: 100%;
    height: 100%;
  }
}

//列表样式
.content_text-box {
  padding-left: 10px;
  // 标题
  .text-title {
    font-size: @fs-16;
    margin: 0;
    font-weight: 500;
    &:hover {
      cursor: pointer;
    }
  }

  .text-content {
    font-size: @fs-13;
    // 文字省略
    .ellipsisMultiline(2) //超出两行省略;
  }

  // 文章信息
  .text-info {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 10px;
    .info {
      color: @color-grey2;
      font-size: @fs-13;
      &:first-child {
        padding-right: 10px;
      }
      &:not(:first-child) {
        width: 30px;
        .ellipsisLine(); //单行超出省略
      }
    }
  }
}
//   标签
.tag-box {
  position: absolute;
  right: 30px;
  bottom: 6px;
  .tag {
    height: 12px;
    line-height: 12px;
    margin: 0 2px;
  }
}
</style>