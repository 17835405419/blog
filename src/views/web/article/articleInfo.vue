<template>
  <div class="articleInfo-box">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <Header />
      </el-header>
      <!-- 文章内容 -->
      <el-main>
        <el-row :gutter="20">
          <el-col :span="14" :offset="2">
            <!-- 显示内容区 -->
            <div class="article-content-box">
              <h2>文章题目</h2>
              <p v-html=""></p>
            </div>
          </el-col>

          <!-- 右侧区 -->
          <el-col :span="8"></el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
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
    background-color: rgb(255, 250, 250);
    margin-right: 10px;
    width: 600px;
    padding: 25px;
    padding-top: 15px;
    p {
      font-size: 13px;
      text-indent: 2em;
    }
  }
}
</style>