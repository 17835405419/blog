<template>
  <!-- 评论界面 -->
  <div class="comment-box">
    <!-- 评论框 -->
    <el-input
      :rows="3"
      class="comment-input"
      type="textarea"
      resize="none"
      v-model="commentInput"
      placeholder="写下你的评论..."
      @focus="isShow = true"
    ></el-input>

    <!-- 发布按钮 -->
    <div class="button-box" v-show="isShow">
      <span>Ctrl + Enter发表</span>
      <div class="button-item">
        <el-button type="danger" size="mini" round @click="releaseComment"
          >发布</el-button
        >
        <el-button size="mini" round @click="isShow = false">取消</el-button>
      </div>
    </div>

    <!-- 具体评论信息 -->
    <div class="comment-info-box">
      <span>|</span>
      <span>全部评论</span>
      <span class="comment-num">{{ commentList.length }}</span>

      <!--  v-if 和 v-for  不能同时使用 以额外再套一个 div-->
      <div v-if="isShowComment">
        <!-- 评论主要内容 -->
        <div
          class="comment-content"
          v-for="(item, index) in commentList"
          :key="index"
        >
          <div class="reviewer-info-box">
            <el-avatar :size="35" :src="item.avater" round></el-avatar>
            <div class="reviewer-info">
              <div class="review-nickName">{{ item.nickName }}</div>
              <div class="review-time">
                {{ item.createTime | FormatTime }}
              </div>
            </div>
          </div>
          <div class="comment-info">
            {{ item.content }}
          </div>
          <el-divider />
        </div>
      </div>

      <!-- 没有登录时显示的内容 -->
      <div class="nologin-comment-content" v-else>
        <i class="el-icon-s-release"></i>
        <span>登录后可查看评论</span>
      </div>

      <!-- 没有评论时显示的内容 -->
      <div
        class="no-comment-content"
        v-show="commentList.length === 0 && isShowComment"
      >
        <span>暂无评论，期待您的回复</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否显示评论区
    isShowComment: {
      type: Boolean,
      required: true,
    },
    // 评论数据
    commentList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      commentInput: "", //输入框内容
      isShow: false, //控制发布按钮
      isShowReply: false, //控制显示按钮
    };
  },

  methods: {
    releaseComment() {
      if (this.commentInput !== "") {
        this.$emit("release", this.commentInput);
        return;
      }
      this.$message.warning("评论内容不能为空");
    },
    // 清空输入框事件
    emptyInput() {
      this.commentInput = "";
    },
  },
};
</script>

<style lang='less' scoped>
// 评论框修改
/deep/ .el-textarea__inner {
  background-color: #eee;
  border: 1px solid #e8e4e4;
}
/deep/ .el-textarea__inner:focus {
  border-color: #e8e4e4;
}
.el-divider {
  margin: 10px 0;
}
// 评论界面
.comment-box {
  box-sizing: border-box;
  background-color: @color-white;
  padding: 15px;
}

//  评论框下发布按钮
.button-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  font-size: @fs-13;
}

.comment-info-box {
  position: relative;
  margin-top: 10px;
  span:first-child {
    font-weight: 800;
    padding-right: 3px;
  }
  // 评论数
  .comment-num {
    font-size: @fs-12;
    padding-left: 6px;
  }
}

// 评论内容
.comment-content {
  margin-top: 10px;
  .reviewer-info-box {
    display: flex;
    align-items: center;
    font-size: @fs-12;
    color: @color-grey4;
    .reviewer-info {
      padding-left: 10px;
      .review-nickName {
        font-size: @fs-14;
      }
    }
  }
  //  评论的具体内容
  .comment-info {
    padding: 5px 0 1px 29px;
    font-size: @fs-13;
  }
}
.nologin-comment-content {
  height: 100px;
  margin-top: 10px;
  background-color: @color-grey1;
  font-size: @fs-14;
  .layoutFlexCenter(column);
  i {
    font-size: @fs-40;
    &:hover {
      cursor: pointer;
    }
  }
}
.no-comment-content {
  height: 100px;
  .layoutFlexCenter(row);
}
// 取消最后一个评论下划线
.comment-content:last-child .el-divider {
  display: none;
}
</style>