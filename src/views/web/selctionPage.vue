<template>
  <el-container>
    <el-header>
      <!-- 头部文件 -->
      <Header />
    </el-header>
    <el-main>
      <!-- 面包屑导航 -->
      <BreadCrumb />
      <!-- 主要内容 -->
      <div class="sectionPage-box">
        <div class="content" v-if="articleList.length !== 0">
          <div
            class="articleList-box"
            v-for="(item, index) in articleList"
            :key="index"
            @click="
              $router.push({
                path: '/articleInfo',
                query: { articleId: item.articleId },
              })
            "
          >
            <span class="article-time">{{ item.createTime | FormatTime }}</span>
            <span class="article-title">{{ item.title }}</span>
          </div>
        </div>

        <div class="no-content" v-else>
          <span>暂无内容</span>
        </div>
      </div>
      <Pagination
        :style="{ margin: '40px 0 0  0' }"
        @changePage="changePage"
        :pageSize="pageSize"
        :total="total"
      />
    </el-main>
    <el-footer>
      <!-- 底部区域 -->
      <Footer :style="{ marginTop: '40px' }" />
    </el-footer>
  </el-container>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import Pagination from "@/components/Pagination.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { article_getArticle } from "@/api/article_api.js";
export default {
  components: {
    Header,
    Footer,
    BreadCrumb,
    Pagination,
  },

  data() {
    return {
      articleList: [],
      pageSize: 10, //每一页显示的数量
      total: null, //总条目数
    };
  },
  created() {
    this.getArticleList();
  },
  watch: {
    // 由于不同路由 使用同一个组件 不会重复渲染 及触发create等钩子函数 所以需要进行监听
    $route: {
      handler(newval, oldval) {
        if (newval.name !== oldval.name) {
          // 先清空数据
          this.articleList = [];
          this.getArticleList();
        }
      },
    },
  },
  methods: {
    // 获取文章列表
    async getArticleList(page = 1) {
      const { data } = await article_getArticle({
        page: page,
        pageSize: this.pageSize,
        articlPartName:
          this.$route.meta.title !== "标签" ? this.$route.meta.title : "",
        tagName: this.$route.query.name ? this.$route.query.name : "",
      });

      if (data.code === 0) {
        this.articleList = data.data.res;
        this.total = data.data.count;
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

<style lang='less'scoped>
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
.el-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.el-main {
  width: 60vw;
  height: 80vh;
  margin: 0 auto;
}

.sectionPage-box {
  background-color: @color-white;
  font-size: @fs-16;
  color: @color-grey2;

  .articleList-box {
    height: 20px;
    line-height: 20px;
    padding: 0 20px;
    &:hover {
      color: @color-grey4;
      cursor: pointer;
    }
    .article-time {
      padding-right: 20px;
    }
  }

  .no-content {
    .layoutFlexCenter(row);
    font-size: @fs-15;

    height: 50px;
  }
}
</style>