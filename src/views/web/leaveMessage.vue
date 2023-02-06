<template>
  <el-container>
    <el-header>
      <!-- 头部文件 -->
      <Header />
    </el-header>
    <el-main>
      <div class="leave-message-box">
        <div class="img-box">
          <div class="title-box">
            <span class="cn-title">想对我说什么，写下来吧</span>
            <span class="en-title"
              >What do you want to say to me?Write it down</span
            >
          </div>
          <img src="../../assets/image/leave message.webp" alt="" />
        </div>

        <!-- 留言信息 -->
        <div class="message-box">
          <el-input
            :rows="3"
            class="message-input"
            type="textarea"
            resize="none"
            v-model="messageInput"
            placeholder="写下你的留言..."
          ></el-input>
          <!-- 发表按钮 -->
          <div class="btn-box">
            <el-button
              size="small"
              @click="publish"
              :disabled="messageInput !== '' ? false : true"
              >发表</el-button
            >
          </div>

          <!-- 具体内容 -->
          <div class="message-info-box">
            <span class="message-tag">|</span>
            <span>全部留言</span>
            <span class="message-num">{{ count }}</span>

            <div v-for="(item, index) in messageLists" :key="index">
              <div class="message-info">
                <el-avatar :size="35" :src="item.avater" round></el-avatar>
                <div class="vertical">
                  <div class="user-about-box">
                    <span class="nick-name">{{ item.nickName }}</span>
                    <span class="create-time">{{
                      item.createTime | FormatTime
                    }}</span>
                  </div>
                  <div class="message-content">
                    <span class="content">{{ item.content }}</span>
                  </div>
                  <el-dropdown
                    class="dropdown"
                    trigger="click"
                    size="mini"
                    placement="bottom"
                    v-if="userInfo.userId === item.userId"
                    @command="selectMethods"
                  >
                    <span class="details-box">...</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        :command="{ key: 'delete', messageId: item.messageId }"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <!-- 分割线 -->
              <el-divider></el-divider>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        @changePage="changePage"
        :pageSize="pageSize"
        :total="count"
      />
    </el-main>

    <el-footer>
      <!-- 底部区域 -->
      <Footer :style="{ marginTop: '40px' }" />
    </el-footer>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import {
  web_createLeaveMessage,
  web_getLeaveMessage,
  web_deleteLeaveMessage,
} from "@/api/web_api.js";
import { mapState } from "vuex";
export default {
  components: {
    Header,
    Footer,
    Pagination,
  },
  created() {
    this.getMessage();
  },
  data() {
    return {
      messageInput: "",
      count: 0,
      pageSize: 10,
      messageLists: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    async getMessage(page = 1) {
      const { data } = await web_getLeaveMessage({
        page: page,
        pageSize: 10,
      });
      if (data.code === 0) {
        this.messageLists = data.data.res;
        this.count = data.data.count;
      }
    },
    async publish() {
      const { data } = await web_createLeaveMessage({
        userId: this.userInfo.userId,
        nickName: this.userInfo.nickName,
        avater: this.userInfo.avater,
        content: this.messageInput,
      });
      console.log(data);
      await this.getMessage();
      if (data.code === 0) {
        this.messageInput = "";
        this.$message({
          message: data.msg,
          type: "success",
          duration: 1000,
          offset: 85,
        });
      }
    },
    async selectMethods(command) {
      switch (command.key) {
        case "delete":
          const { data } = await web_deleteLeaveMessage({
            messageId: command.messageId,
          });
          // 更新评论列表
          await this.getMessage();
          this.$message({
            type: "success",
            message: data.msg,
            duration: 1000,
            offset: 85,
          });
          return;

        default:
          return false;
      }
    },
    // 点击分页
    async changePage(page) {
      await this.getMessage(page);
      // 翻页之后自动到顶部
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style lang='less' scoped>
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
  margin: 0 auto;
}
.img-box {
  position: relative;
  width: 65vw;
  height: 20vw;
  margin-top: 10px;
  font-size: @fs-17;
  color: @color-white;
  .title-box {
    position: absolute;
    left: 25%;
    top: 45%;
    transform: translate(-50%, -50%);
    span {
      display: block;
      text-transform: uppercase;
      font-size: @fs-30;
      &:last-child {
        font-size: @fs-17;
        margin-top: 3px;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.message-box {
  box-sizing: border-box;
  padding: 15px 0;
  .btn-box {
    display: flex;
    justify-content: end;
    padding-top: 5px;
  }
}
.message-info-box {
  font-size: @fs-17;
  color: @color-grey4;
  margin-top: 10px;
  .message-tag {
    font-weight: 800;
    padding-right: 5px;
  }
  .message-num {
    font-size: @fs-15;
    padding-left: 5px;
  }
}
.vertical {
  position: relative;
  width: 100%;
  margin-left: 5px;
}
.message-info {
  display: flex;
  font-size: @fs-16;
  margin-top: 10px;
  .user-about-box {
    display: flex;
    justify-content: space-between;
  }
  .message-content {
    margin-top: 5px;
  }
  .dropdown {
    position: absolute;
    right: 0;
  }
  .details-box {
    font-weight: 900;
    color: @color-grey2;
    font-size: @fs-19;
    cursor: pointer;
  }
}
</style>