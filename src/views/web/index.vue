<template>
  <el-container>
    <el-header>
      <!-- 头部文件 -->
      <Header />
    </el-header>
    <!-- 主体 -->
    <el-main>
      <el-row>
        <el-col :span="15">
          <!--轮播图 -->
          <Swiper :swiperItem="bannerLists" />
          <!-- 文章列表 -->
          <div
            v-for="(item, index) in articleList"
            :key="index"
            :style="{ marginTop: '30px' }"
          >
            <ArticleList :style="{ marginTop: '15px' }" :articleInfo="item" />
          </div>
          <!-- 分页 -->
          <Pagination
            :style="{ marginTop: '20px' }"
            @changePage="changePage"
            :pageSize="pageSize"
            :total="total"
          />
        </el-col>

        <el-col :span="6" :offset="2">
          <!-- 博主介绍 -->
          <Introduction />
          <!-- 阅读排行 -->
          <Rank
            :style="{ marginTop: '20px' }"
            title="阅读排行"
            :rankLists="rankLists"
          />
        </el-col>
      </el-row>
    </el-main>
    <!-- 底部 -->
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
import Header from "./components/Header.vue";
import Swiper from "@/components/Swiper.vue";
import Introduction from "./components/Introduction.vue";
import Rank from "./components/Rank.vue";
import ArticleList from "./components/ArticleList.vue";
import Pagination from "@/components/Pagination.vue";
import Footer from "./components/Footer.vue";
import { article_getArticle } from "@/api/article_api.js";
import { banner_getBanner } from "@/api/banner_api.js";
export default {
  components: {
    Header,
    Swiper,
    Introduction,
    Rank,
    ArticleList,
    Pagination,
    Footer,
  },
  data() {
    return {
      articleList: [],
      bannerLists: [], //轮播图数据
      rankLists: [],
      pageSize: 6, //每一页显示的数量
      total: null, //总条目数
    };
  },
  created() {
    this.getArticleList();
    this.getBannerList();
    this.getRankList();
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
        this.articleList = data.data.ArticleInfo;
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
        this.rankLists = data.data.ArticleInfo;
      }
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
.el-header,
.el-footer {
  padding: 0;
}
.el-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.el-main {
  margin: 0 80px;
}
</style>