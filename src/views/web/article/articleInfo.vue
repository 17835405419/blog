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
          <el-col :span="15" :offset="2">
            <!-- 显示内容区 -->
            <div class="article-content-box">
              <h2 :style="{ marginBottom: 0 }">{{ articleInfo.title }}</h2>
              <div class="article-about-info">
                <p>
                  <i class="el-icon-alarm-clock"></i>
                  发布日期：{{ articleInfo.createTime | FormatTime }}
                </p>
                <p :style="{ width: '80px' }">
                  <i class="el-icon-user"></i>
                  作者：{{ articleInfo.authorName }}
                </p>
                <p>
                  <i class="el-icon-view"></i>
                  阅读量：{{ articleInfo.articleHandle.read }}
                </p>
              </div>
              <!-- 分割线 -->
              <el-divider></el-divider>
              <p v-html="articleInfo.content" v-highlight class="content"></p>
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
                <div class="buttom-item">
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
                <div class="buttom-item">
                  <span class="el-icon-star-off"></span>
                </div>
              </el-tooltip>
              <span class="button-name">收藏</span>
            </div>
          </el-col>

          <!-- 右侧区 -->
          <el-col :span="5">
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
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Rank from "../components/Rank.vue";
import Footer from "../components/Footer.vue";
import Comment from "../components/Comment.vue";
import {
  article_getArticle,
  article_getStar,
  article_createStar,
  article_deleteStar,
  article_createComment,
  article_getComment,
} from "@/api/article_api.js";

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
    };
  },
  created() {
    this.getArticleInfo();
    this.getRankList();
    this.getAuthorArticleList();
    // 判断是否登陆 来决定是否调用获取评论接口
    this.$store.state.token ? this.getComment() : "";
    // 判断是否登陆 来决定是否调用检查点赞接口
    this.$store.state.token ? this.checkArticleStatus() : "";
  },

  methods: {
    async getArticleInfo() {
      const { data } = await article_getArticle({
        articleId: this.$route.query.articleId,
      });
      this.articleInfo = data.data.ArticleInfo[0];
    },
    // 获取排行榜数据
    async getRankList() {
      const { data } = await article_getArticle({
        sortQuery: "articleHandle.read",
        sortStyle: 0, //排序方式 降序排序
        pageSize: 6,
      });
      if (data.code === 0) {
        this.rankLists = data.data.ArticleInfo;
      }
    },

    // 获取作者相关文章
    async getAuthorArticleList() {
      const { data } = await article_getArticle({
        authorId: this.articleInfo.authorId,
        pageSize: 6,
      });

      if (data.code === 0) {
        this.authorArticleLists = data.data.ArticleInfo;
      }
    },

    // 获取子组件点击的id 如果要跳转当前页面 则直接渲染即可
    async renderHtml(articleId) {
      const { data } = await article_getArticle({
        articleId: articleId,
        pageSize: 6,
      });
      this.articleInfo = data.data.ArticleInfo[0];
    },

    // 查询文章状态是否点过赞 是否已收藏 是否关注了作者
    async checkArticleStatus() {
      const { data } = await article_getStar({
        articleId: this.$route.query.articleId,
        userId: this.$store.state.userInfo.userId,
      });

      if (data.code === 0) {
        this.isStar = true;
      }
    },
    // 获取评论数据
    async getComment() {
      const { data } = await article_getComment({
        articleId: this.$route.query.articleId,
      });
      if (data.code === 0) {
        this.commentList = data.data;
      }
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

    // 评论事件 需要调用子组件事件
    async releaseComment(commentContent) {
      const { data } = await article_createComment({
        userId: this.$store.state.userInfo.userId,
        nickName: this.$store.state.userInfo.nickName,
        avater: this.$store.state.userInfo.avater,
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
.el-header,
.el-footer {
  padding: 0;
}

.el-main {
  // 左边内容区
  .article-content-box {
    background-color: #fff;
    margin-right: 10px;
    width: 600px;
    padding: 25px;
    padding-top: 15px;
    .content {
      font-size: 13px;
      text-indent: 2em;
    }
    // 文章相关信息
    .article-about-info {
      display: flex;
      align-items: center;
      p {
        font-size: 12px;
        margin-right: 10px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; // 默认不换行；
        i {
          display: inline;
        }
      }
    }
    // 分割线
    /deep/.el-divider {
      margin: 0;
    }
    /deep/pre {
      background-color: #2d2d2d;
      line-height: 18px;
    }
  }
  // 文章功能按键
  .article-button-box {
    position: fixed;
    top: 150px;
    left: 60px;
    bottom: 150px;
    // 文本居中
    text-align: center;
    width: 40px;
    .buttom-item {
      width: 40px;
      height: 40px;
      margin-top: 10px;
      background-color: #fff;
      box-shadow: 0px 0px 3px 1px rgb(215, 213, 213);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .button-name {
      font-size: 12px;
      color: #3b3b3b;
    }
  }
}

.active {
  color: rgb(216, 41, 41);
}
</style>