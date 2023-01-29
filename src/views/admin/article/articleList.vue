<template>
  <div>
    <el-table :data="articleList" style="width: 100%" size="mini">
      <el-table-column label="文章标题" prop="title"> </el-table-column>

      <!--  在prop中格式化时间  -->
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime | FormatTime }}
        </template>
      </el-table-column>
      <el-table-column label="文章来源" prop="stemfrom" align="center">
      </el-table-column>
      <el-table-column label="阅读量" prop="articleHandle.read" align="center">
      </el-table-column>
      <el-table-column label="点赞数" prop="articleHandle.star" align="center">
      </el-table-column>
      <el-table-column
        label="评论数"
        prop="articleHandle.comment"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="buttonbox">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页按钮 -->
    <Pagination
      :total="count"
      @changePage="changePage"
      :style="{ marginTop: '15px' }"
    />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination.vue";
import { article_getArticle, article_deleteArticle } from "@/api/article_api";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      articleList: [],
      page: 1, //当前页数
      count: 0, //总条数
    };
  },
  created() {
    // 获取用户列表数据
    this.getArticleList();
  },

  methods: {
    async getArticleList(page = 1) {
      const { data } = await article_getArticle({
        page: page,
        userId: this.$store.state.userInfo.userId,
      });
      this.articleList = data.data.res;
      this.count = data.data.count;
    },
    // 更新按钮事件
    // 使用Json.stringify 将传递的对象数据转化为json 目标页面再转为对象 防止传参后刷新数据丢失
    handleEdit(row) {
      this.$router.push({
        path: "/admin/article/update",
        query: {
          articleInfo: JSON.stringify(row),
        },
      });
    },
    // 删除按钮事件
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await article_deleteArticle({
            userId: this.$store.state.userInfo.userId,
            articleId: row.articleId,
          });
          if (data.code === 0) {
            // 删除之后重新获取数据
            await this.getArticleList();
            this.$message({
              type: "success",
              message: data.msg,
            });
            return;
          }
          this.$message({
            type: "error",
            message: "删除失败!",
          });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 切换页码
    async changePage(page) {
      await this.getArticleList(page);
    },
  },
};
</script>
<style lang="less" scoped>
.buttonbox {
  display: flex;
}
</style>