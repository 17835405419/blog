<template>
  <div class="articleInfo-box">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <Header />
      </el-header>
      <!-- 文章内容 -->
      <el-main>
        <el-row>
          <el-col :span="12" :offset="2">
            <!-- 显示内容区 -->

            <div class="article-content-box">
              <h2 class="article-title">{{ articleInfo.title }}</h2>
              <!-- 文章相关信息 -->
              <div class="article-about-info">
                <span class="about-item">
                  <i class="el-icon-alarm-clock"></i>
                  发布日期：{{ articleInfo.createTime | FormatTime }}
                </span>
                <span class="about-item author-name">
                  <i class="el-icon-user"></i>
                  作者：{{ articleInfo.authorName }}
                </span>
                <span class="about-item">
                  <i class="el-icon-view"></i>
                  阅读量：{{ articleInfo.articleHandle.read }}
                </span>
                <!-- 文章标签 -->
                <el-tag
                  type="success"
                  size="mini"
                  class="tag"
                  effect="plain"
                  v-for="(item, index) in articleInfo.showTagList"
                  :key="index"
                >
                  {{ item }}
                </el-tag>
              </div>

              <!-- 分割线 -->
              <el-divider></el-divider>
              <div
                v-html="articleInfo.content"
                v-highlight
                class="article-content"
              ></div>
            </div>

            <!-- 评论区 -->
            <Comment
              ref="commentRef"
              @release="releaseComment"
              :commentList="commentList"
              :isShowComment="$store.state.token ? true : false"
            />

            <!-- 文章功能按钮 -->
            <div class="article-button-box">
              <el-tooltip
                content="点赞该文章"
                placement="right"
                effect="light"
                :enterable="false"
              >
                <div
                  :class="[isStar ? ['buttom-item', 'active'] : 'buttom-item']"
                  @click="star"
                >
                  <span class="el-icon-thumb"></span>
                </div>
              </el-tooltip>
              <span class="button-name">点赞</span>
              <el-tooltip
                content="关注作者"
                placement="right"
                effect="light"
                :enterable="false"
              >
                <div
                  :class="[isFans ? ['buttom-item', 'active'] : 'buttom-item']"
                  @click="fans"
                >
                  <span class="el-icon-user"></span>
                </div>
              </el-tooltip>
              <span class="button-name">关注</span>
              <el-tooltip
                content="收藏该文章"
                placement="right"
                effect="light"
                :enterable="false"
              >
                <div
                  :class="[
                    isCollect ? ['buttom-item', 'active'] : 'buttom-item',
                  ]"
                  @click="collect"
                >
                  <span class="el-icon-star-off"></span>
                </div>
              </el-tooltip>
              <span class="button-name">收藏</span>
            </div>
          </el-col>

          <!-- 右侧区 -->
          <el-col :span="5" :offset="2">
            <Rank
              title="作者相关"
              :rankLists="authorArticleLists"
              @toInfoQuery="renderHtml"
            />
            <Rank
              title="阅读排行"
              :style="{ marginTop: '20px' }"
              :rankLists="rankLists"
              @toInfoQuery="renderHtml"
            />
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <Footer :style="{ marginTop: '40px' }" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Rank from "../components/Rank.vue";
import Footer from "../components/Footer.vue";
import Comment from "../components/Comment.vue";
import { updateLocalUserInfo } from "@/untils/untils.js";
import {
  article_getArticle,
  article_getStar,
  article_createStar,
  article_deleteStar,
  article_createComment,
  article_getComment,
  article_createCollection,
  article_deleteCollection,
  article_getCollection,
} from "@/api/article_api.js";
import { user_follow, user_upFollow, user_findFans } from "@/api/user_api.js";
export default {
  components: {
    Header,
    Rank,
    Comment,
    Footer,
  },
  data() {
    return {
      articleInfo: {
        // 事先定义二级对象 防止控制台报错
        articleHandle: {},
      },
      rankLists: [],
      authorArticleLists: [],
      commentList: [],
      commentContent: "", //评论框内容
      isStar: false,
      isFans: false,
      isCollect: false,
    };
  },
  created() {
    this.getArticleInfo();
    this.getRankList();
    this.getAuthorArticleList();
    // 判断是否登陆 来决定是否调用获取评论接口

    this.$store.state.token ? this.getComment() : "";
    // 判断是否登陆 来决定是否调用检查点赞 关注 收藏 接口
    this.$store.state.token ? this.checkArticleStatus() : "";
  },

  methods: {
    async getArticleInfo() {
      const { data } = await article_getArticle({
        articleId: this.$route.query.articleId,
      });
      this.articleInfo = data.data.res[0];
    },
    // 获取排行榜数据
    async getRankList() {
      const { data } = await article_getArticle({
        sortQuery: "articleHandle.read",
        sortStyle: 0, //排序方式 降序排序
        pageSize: 6,
      });
      if (data.code === 0) {
        this.rankLists = data.data.res;
      }
    },

    // 获取作者相关文章
    async getAuthorArticleList() {
      const { data } = await article_getArticle({
        authorId: this.articleInfo.authorId,
        pageSize: 6,
      });

      if (data.code === 0) {
        this.authorArticleLists = data.data.res;
      }
    },

    // 获取子组件点击的id 如果要跳转当前页面 则直接渲染即可
    async renderHtml(articleId) {
      const { data } = await article_getArticle({
        articleId: articleId,
      });
      this.articleInfo = data.data.res[0];
      // 清空上一个文章的评论
      this.commentList = [];
      // 判断是否登陆 调用评论接口 获取新文章评论
      this.$store.state.token ? await this.getComment() : "";
    },

    // 查询文章状态是否点过赞 是否已收藏 是否关注了作者
    async checkArticleStatus() {
      const { data } = await article_getStar({
        articleId: this.$route.query.articleId,
        userId: this.$store.state.userInfo.userId,
      });
      const { data: data1 } = await user_findFans({
        authorId: this.articleInfo.authorId,
        userId: this.$store.state.userInfo.userId,
      });

      const { data: data2 } = await article_getCollection({
        articleId: this.$route.query.articleId,
        userId: this.$store.state.userInfo.userId,
      });

      if (data.code === 0) {
        this.isStar = true;
      }
      if (data1.code === 0) {
        this.isFans = true;
      }
      if (data2.code === 0) {
        this.isCollect = true;
      }
    },
    // 获取评论数据
    async getComment() {
      const { data } = await article_getComment({
        articleId: this.$route.query.articleId,
      });
      if (data.code === 0) this.commentList = data.data.res;
    },

    // 点赞事件
    async star() {
      if (this.isStar) {
        // 如果已经点过赞 则调用取消点赞接口
        const { data: data1 } = await article_deleteStar({
          userId: this.$store.state.userInfo.userId,
          articleId: this.articleInfo.articleId,
        });
        if (data1.code === 0) {
          this.isStar = false;
          this.$message({
            message: data1.msg,
            type: "info",
            duration: 1000,
          });
        }
        return;
      }
      // 点赞接口
      const { data } = await article_createStar({
        userId: this.$store.state.userInfo.userId,
        nickName: this.$store.state.userInfo.nickName,
        authorId: this.articleInfo.authorId,
        articleId: this.articleInfo.articleId,
        title: this.articleInfo.title,
      });
      if (data.code === 0) {
        this.isStar = true;
        this.$message({
          message: data.msg,
          type: "success",
          duration: 1000,
        });
      }
    },

    // 关注事件
    async fans() {
      if (this.isFans) {
        // 如果已经是粉丝 则调用取消关注接口
        const { data: data1 } = await user_upFollow({
          userId: this.$store.state.userInfo.userId,
          authorId: this.articleInfo.authorId,
        });
        if (data1.code === 0) {
          this.isFans = false;
          // 修改vuex中的用户数据
          await updateLocalUserInfo(this.$store, data1.msg, "info");
        }
        return;
      }
      // 关注接口
      const { data } = await user_follow({
        userId: this.$store.state.userInfo.userId,
        nickName: this.$store.state.userInfo.nickName,
        authorId: this.articleInfo.authorId,
        authorName: this.articleInfo.authorName,
      });
      if (data.code === 0) {
        this.isFans = true;
        // 修改vuex中的用户数据
        await updateLocalUserInfo(this.$store, data.msg);
      }
    },

    // 收藏事件
    async collect() {
      if (this.isCollect) {
        // 如果已经收藏 则调用取消收藏接口
        const { data: data1 } = await article_deleteCollection({
          userId: this.$store.state.userInfo.userId,
          articleId: this.$route.query.articleId,
        });
        if (data1.code === 0) {
          this.isCollect = false;
          this.$message({
            message: data1.msg,
            type: "info",
            duration: 1000,
          });
        }
        return;
      }
      // 关注接口
      const { data } = await article_createCollection({
        userId: this.$store.state.userInfo.userId,
        nickName: this.$store.state.userInfo.nickName,
        authorId: this.articleInfo.authorId,
        authorName: this.articleInfo.authorName,
        articleId: this.$route.query.articleId,
        title: this.articleInfo.title,
      });
      if (data.code === 0) {
        this.isCollect = true;
        this.$message({
          message: data.msg,
          type: "success",
          duration: 1000,
        });
      }
    },
    // 评论事件 需要调用子组件事件
    async releaseComment(commentContent) {
      const { data } = await article_createComment({
        userId: this.$store.state.userInfo.userId,
        nickName: this.$store.state.userInfo.nickName,
        avater: this.$store.state.userInfo.avater
          ? this.$store.state.userInfo.avater
          : "http://rnla1fx0j.hn-bkt.clouddn.com/rootAdmin/defaultAvater.png",
        content: commentContent,
        title: this.articleInfo.title,
        authorId: this.articleInfo.authorId,
        articleId: this.articleInfo.articleId,
      });
      if (data.code === 0) {
        this.$refs["commentRef"].emptyInput();
        // 重新获取数据
        await this.getComment();
        this.$message({
          message: data.msg,
          type: "success",
          duration: 1000,
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
.el-container {
  background: linear-gradient(
      rgba(238, 238, 238, 0.6),
      rgba(255, 255, 255, 0.3)
    ),
    url("@/assets/image/index_bgc.webp");
  background-size: 100% 100%;
}
.el-header,
.el-footer {
  padding: 0;
}
.el-main {
  margin-top: 55px;
  padding: 0;
}
.el-divider {
  margin: 10px 0;
}
// 文章具体内容
.article-content-box {
  box-sizing: border-box; //怪异盒子
  background-color: @color-white;
  padding: 15px;
  .article-title {
    margin: 0;
  }
  .article-content {
    font-size: @fs-17;
  }
  // 文章相关信息
  .article-about-info {
    padding-top: 15px;
    font-size: @fs-15;
    .about-item {
      margin-right: 5px;
    }
    .el-tag {
      margin: 0 2px;
    }
  }
}

// 文章功能按键
.article-button-box {
  position: fixed;
  top: 100px;
  left: 20px;
  text-align: center;
  font-size: @fs-17;
  color: @color-grey3;
  .buttom-item {
    width: 30px;
    height: 30px;
    margin-top: 10px;
    background-color: @color-white;
    box-shadow: 0px 0px 3px 1px rgb(215, 213, 213);
    border-radius: 50%;
    cursor: pointer;
    .layoutFlexCenter(row);
  }
  .button-name {
    font-size: @fs-13;
  }
}

// 选中后颜色
.active {
  color: @color-red4;
}
</style>