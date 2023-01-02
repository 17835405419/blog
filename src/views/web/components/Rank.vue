<template>
  <el-card class="card-box">
    <div slot="header" class="header-box">
      <span>|</span>
      <span>阅读排行</span>
    </div>
    <div class="content-box">
      <div class="text-item" v-for="(item, index) in articleList" :key="index">
        <div class="text-content">
          <p @click="childMethod(item.id)">
            {{ item.title }}
          </p>
          <p>阅读：{{ item.read }}</p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      articleList: [{ title: "nihao" }, { title: "dajiahgao" }],
    };
  },
};
</script>

<style lang='less' scoped>
.card-box {
  height: 300px;
}
/deep/.el-card__header {
  padding: 13px;
  font-size: 12px;
  .header-box {
    span:last-child {
      padding-left: 10px;
    }
  }
}
/deep/.el-card__body {
  padding: 10px 10px 10px 13px;
}
.text-item {
  font-size: 12px;
  .text-content {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    p {
      margin: 0;
      color: #777171;
    }
    p:last-child {
      font-size: 9px;
      -webkit-transform-origin-x: 0; //兼容谷歌
      -webkit-transform: scale(0.8); //按比例缩小文字
      color: rgb(139, 137, 137);
    }
    p:first-child:hover {
      text-decoration: underline rgb(177, 175, 175);
      cursor: pointer;
    }
  }
}
</style>