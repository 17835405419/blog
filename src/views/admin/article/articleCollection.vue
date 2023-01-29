<template>
  <div>
    <el-table :data="collectionLists" :show-header="false">
      <el-table-column>
        <template slot-scope="scope">
          <div class="collect-box">
            <span
              class="title"
              @click="
                $router.push({
                  path: '/articleInfo',
                  params: {
                    articleId: scope.row.articleId,
                  },
                })
              "
              >{{ scope.row.title }}</span
            >
            <span class="collect-time"
              >收藏于[{{ scope.row.createTime | FormatTime }}]</span
            >
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
import { article_getCollection } from "@/api/article_api.js";
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      collectionLists: [],
      page: 1,
      count: 0,
    };
  },
  created() {
    this.getCollectionInfo();
  },
  methods: {
    async getCollectionInfo(page = 1) {
      const { data } = await article_getCollection({
        userId: this.$store.state.userInfo.userId,
        page: page,
      });

      this.collectionLists = data.data.res;
      this.count = data.data.count;
    },
    // 分页
    async changePage(page) {
      await this.getCollectionInfo(page);
    },
  },
};
</script>

<style lang='less' scoped>
.collect-box {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  .title {
    padding-left: 20px;
  }
  .title:hover {
    color: #93cbe1;
  }
  .collect-time {
    font-size: 12px;
  }
}
</style>