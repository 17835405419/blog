<template>
  <div>
    <el-table :data="starLists" :show-header="false">
      <el-table-column>
        <template slot-scope="scope">
          <div class="comment-list">
            <div>
              <el-tag type="info" size="small">会员</el-tag>
              <span class="name">&nbsp;&nbsp;{{ scope.row.nickName }}</span>
              点赞了你的文章 【{{ scope.row.title }}】
            </div>
            <div>
              {{ scope.row.createTime | FormatTime }}
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <Pagination
      :style="{ marginTop: '10px' }"
      :total="count"
      @changePage="changePage"
    />
  </div>
</template>
<script>
import { article_getStar } from "@/api/article_api.js";
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      starLists: [],
      page: 1,
      count: 0,
    };
  },
  created() {
    this.getStarInfo();
  },
  methods: {
    async getStarInfo(page = 1) {
      const { data } = await article_getStar({
        authorId: this.$store.state.userInfo.userId,
        page: page,
      });

      this.starLists = data.data.res;

      this.count = data.data.count;
    },

    // 分页
    async changePage(page) {
      await this.getStarInfo(page);
    },
  },
};
</script>

<style lang="less" scoped>
.comment-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    color: rgb(52, 25, 172);
    font-weight: 600;
  }
}
</style>