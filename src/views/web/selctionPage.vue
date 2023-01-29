<template>
  <el-container>
    <el-header>
      <!-- 头部文件 -->
      <Header />
    </el-header>
    <el-main>
      <!-- 主要内容 -->
      <div class="nav-box">
        <BreadCrumb class="bread" />
      </div>
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
        :style="{ margin: '20px 0 20px 12vw' }"
        @changePage="changePage"
        :pageSize="pageSize"
        :total="total"
      />
    </el-main>
    <el-footer>
      <!-- 底部区域 -->
      <Footer />
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
      pageSize: 20, //每一页显示的数量
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
          this.$route.meta.title !== "Tags" ? this.$route.meta.title : "",
        tagName: this.$route.query.tagName ? this.$route.query.tagName : "",
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
.el-header,
.el-footer {
  padding: 0;
}
.el-main {
  height: 100vh;
}
.el-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.nav-box {
  width: 69.7vw;
  height: 45px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-left: 3px solid rgb(230, 173, 59);
  margin: 0 auto;
  margin-bottom: 10px;
  .bread {
    padding-left: 10px;
  }
}
.sectionPage-box {
  width: 70vw;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .articleList-box {
    height: 40px;
    padding: 0 20px;
    font-size: 13px;
    color: rgb(128, 124, 124);
    .article-time {
      padding-right: 20px;
    }
    .article-title {
      line-height: 40px;
    }
  }
  .articleList-box:hover {
    color: #3d3d3d;
    cursor: pointer;
  }
  .no-content {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    height: 50px;
  }
}
</style>