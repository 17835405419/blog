<template>
  <el-card class="card-box" shadow="hover">
    <div class="content-box">
      <div class="img-box" v-if="articleInfo.articleImg">
        <img :src="articleInfo.articleImg" alt="" />
      </div>

      <div class="text-box">
        <span class="title" @click="goToArticleInfo(articleInfo.articleId)">{{
          articleInfo.title
        }}</span>
        <div class="content">
          <p v-html="articleInfo.content.replace(/<[^>]+>/g, '')"></p>
        </div>
        <div class="userInfo">
          <span class="el-icon-date"
            >&nbsp&nbsp{{ articleInfo.createTime | FormatTime }}</span
          >
          <span class="el-icon-chat-dot-square"
            >&nbsp&nbsp{{ articleInfo.articleHandle.comment }}</span
          >
          <span class="el-icon-thumb"
            >&nbsp&nbsp{{ articleInfo.articleHandle.star }}</span
          >
          <span class="el-icon-view"
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
.card-box {
  height: 140px;

  .content-box {
    position: relative;
    display: flex;
    height: 120px;
    padding: 12px 0 0 10px;
    // 文章的图片
    .img-box {
      position: absolute;
      right: 50px;
      height: 100px;
      width: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    //列表样式
    .text-box {
      position: relative;
      padding-left: 10px;
      height: 100%;
      .title {
        font-size: 13px;
        height: 20%;
        display: block;
      }
      .content {
        height: 62%;
        p {
          line-height: 1.5;
          margin: 8px 0 0 0;
          font-size: 11px;
          -webkit-transform-origin-x: 0; //兼容谷歌
          -webkit-transform: scale(0.9); //按比例缩小文字
          // 文字省略
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; // 想要超出三行显示 就把这里改成3就好了
        }
      }

      .title:hover {
        cursor: pointer;
      }

      // 文章信息
      .userInfo {
        height: 10%;
        display: flex;
        span {
          color: rgb(48, 46, 46);
          font-size: 9px;
          -webkit-transform-origin-x: 0; //兼容谷歌
          -webkit-transform: scale(0.8); //按比例缩小文字
        }
        span:not(:first-child) {
          width: 48px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  //   标签
  .tag-box {
    display: flex;
    position: absolute;
    left: 280px;
    bottom: -2px;
    .tag {
      line-height: 17px;
      font-size: 9px;
      -webkit-transform: scale(0.8); //按比例缩小文字
    }
  }
}
</style>