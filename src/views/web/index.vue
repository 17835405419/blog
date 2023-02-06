<template>
  <el-container>
    <el-header>
      <!-- 头部文件 -->
      <Header />
    </el-header>
    <!-- 主体 -->
    <el-main>
      <el-row>
        <el-col :span="12" :offset="2">
          <!--轮播图 -->
          <Swiper :swiperItem="bannerLists" />
          <!-- 文章列表 -->
          <div
            class="article-list-box"
            v-for="(item, index) in articleList"
            :key="index"
            :style="{ marginTop: '30px' }"
          >
            <ArticleList :articleInfo="item" />
          </div>
          <!-- 分页 -->

          <Pagination
            :style="{ margin: '40px 0 0  0' }"
            class="page"
            @changePage="changePage"
            :pageSize="pageSize"
            :total="total"
          />
        </el-col>

        <el-col :span="5" :offset="3">
          <!-- 博主介绍 -->
          <Introduction />
          <!-- 阅读排行 -->
          <Rank
            :style="{ marginTop: '20px' }"
            title="阅读排行"
            :rankLists="rankLists"
          />
          <!-- 标签云 -->
          <TagBox
            :style="{ marginTop: '20px' }"
            :tagLists="tagLists"
            @tagName="getTagName"
          />
        </el-col>
      </el-row>
    </el-main>
    <!-- 底部 -->
    <el-footer>
      <Footer :style="{ marginTop: '40px' }" />
    </el-footer>
  </el-container>
</template>

<script>
import Header from "./components/Header.vue";
import Swiper from "@/components/Swiper.vue";
import Introduction from "./components/Introduction.vue";
import Rank from "./components/Rank.vue";
import TagBox from "./components/TagBox.vue";
import ArticleList from "./components/ArticleList.vue";
import Pagination from "@/components/Pagination.vue";
import Footer from "./components/Footer.vue";

import {
  article_getArticle,
  article_getArticleTag,
} from "@/api/article_api.js";
import { banner_getBanner } from "@/api/banner_api.js";
export default {
  components: {
    Header,
    Swiper,
    Introduction,
    Rank,
    TagBox,
    ArticleList,
    Pagination,
    Footer,
  },
  data() {
    return {
      articleList: [],
      bannerLists: [], //轮播图数据
      rankLists: [],
      tagLists: [],
      pageSize: 8, //每一页显示的数量
      total: null, //总条目数
      isShowSearch: false,
    };
  },
  created() {
    this.getArticleList();
    this.getBannerList();
    this.getRankList();
    this.getTagList();
  },
  methods: {
    // 获取轮播图数据
    async getBannerList() {
      const { data } = await banner_getBanner();
      if (data.code === 0) {
        this.bannerLists = data.bannerLists;
      }
    },
    // 获取文章列表
    async getArticleList(page = 1) {
      const { data } = await article_getArticle({
        page: page,
        pageSize: this.pageSize,
      });
      if (data.code === 0) {
        this.articleList = data.data.res;
        this.total = data.data.count;
      }
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

    // 获取tag标签
    async getTagList() {
      const { data } = await article_getArticleTag({});
      if (data.code === 0) {
        this.tagLists = data.data;
      }
    },

    // 获取点击tag子组件传递的tag名
    getTagName(tagName) {
      // 跳转页面 查询相关文章
      this.$router.push({
        path: "/tag",
        query: {
          name: tagName,
        },
      });
    },

    // 点击分页
    async changePage(page) {
      await this.getArticleList(page);
      // 翻页之后自动到顶部
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  background: linear-gradient(
      rgba(238, 238, 238, 0.6),
      rgba(255, 255, 255, 0.3)
    ),
    url("../../assets/image/index_bgc.webp");
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
.el-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
</style>