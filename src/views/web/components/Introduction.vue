<template>
  <div class="decx-box">
    <span class="decx-title">博主简介</span>

    <div class="user-info-box">
      <el-avatar
        :size="size"
        :src="userInfo ? userInfo.avater : defaultAvater"
      ></el-avatar>
      <span class="user_nickName">{{
        userInfo ? userInfo.nickName : "游客"
      }}</span>
      <span class="user_fans-num">
        粉丝数：{{ userInfo ? userInfo.fansNum : 0 }}</span
      >
    </div>
    <div class="user_decx-box">
      <span>
        {{ userInfo ? userInfo.desc : "暂无简介" }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      size: 40,
      defaultAvater:
        "http://rnla1fx0j.hn-bkt.clouddn.com/rootAdmin/defaultAvater.png",
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
.decx-box {
  background-color: #fff;
  box-shadow: 0 0 5px 0.2px rgb(212, 210, 210);
  border-radius: 3px;
  padding: 10px;
  height: 120px;
}
.decx-title {
  color: @color-grey3;
}
.user-info-box {
  display: flex;
  align-items: center;
  padding: 10px 0 0 0;
  span {
    font-size: @fs-14;
    color: @color-grey3;
    &:not(:first-child) {
      padding: 0 5px;
    }
  }
  .user_fans-num {
    margin-left: 35px;
  }
}
.user_decx-box {
  font-size: @fs-14;
  text-indent: 2em;
  padding-top: 10px;
  color: @color-grey2;
  .ellipsisMultiline(5);
}
</style>