<template>
  <div>
    <el-table :data="fansLists" :show-header="false">
      <el-table-column>
        <template slot-scope="scope">
          <div class="fans-box">
            <span class="nickName">{{ scope.row.nickName }}</span>
            <span class="fans-time"
              >关注于[{{ scope.row.createTime | FormatTime }}]</span
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
import { user_findFans } from "@/api/user_api.js";
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      fansLists: [],
      page: 1,
      count: 0,
    };
  },
  created() {
    this.fansListInfo();
  },
  methods: {
    async fansListInfo(page = 1) {
      const { data } = await user_findFans({
        userId: this.$store.state.userInfo.userId,
        page: page,
      });

      this.fansLists = data.data.res;
      this.count = data.data.count;
    },
    // 分页
    async changePage(page) {
      await this.fansListInfo(page);
    },
  },
};
</script>

<style lang='less' scoped>
.fans-box {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  .nickName {
    padding-left: 20px;
  }
  .nickName:hover {
    color: #93cbe1;
  }
  .fans-time {
    font-size: 12px;
  }
}
</style>