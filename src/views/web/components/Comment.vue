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
      <div class="bnt">
        <el-button type="danger" size="mini" round @click="releaseComment">发布</el-button>
        <el-button size="mini" round @click="isShow = false">取消</el-button>
      </div>
    </div>
    
     <!-- 具体评论信息 -->
      <div class="comment-info-box" >
            <div class="comment-title-info">
              <span>|</span>
              <span>全部评论</span>
              <span class="comment-num">{{commentList.length}}</span>
            </div>

            <!--  v-if 和 v-for  不能同时使用 以额外再套一个 div-->
            <div  v-if="isShowComment">
                    <!-- 评论主要内容 -->
            <div class="comment-content"      
              v-for="(item, index) in commentList" :key="index">
              <div class="reviewer-info-box">
                <el-avatar :size="35" :src="item.avater" round></el-avatar>
     
                <div class="reviewer-info">
                  <div class="review-nickName">{{item.nickName}}</div>
                  <div class="review-time">  
                {{item.createTime |FormatTime}}
                  </div>
                </div>
              </div>
              <div class="comment-info">
               {{item.content}}
              </div> 
              <!-- <div class="star-box" >
                <span class="el-icon-chat-square" v-show="isShowReply">&nbsp回复</span>
                <span class="el-icon-thumb"></span>
              </div> --> 
              <el-divider />
            </div>

            </div>
            

            <!-- 没有登录时显示的内容 -->
            <div class="nologin-comment-content" v-else>
            <i class="el-icon-s-release" :style='{fontSize:"40px"}'></i>
            <div>登录后可查看评论</div>
          </div>


          <!-- 没有评论时显示的内容 -->
          <div class="no-comment-content" v-show="commentList.length ===0 && isShowComment">
            <span>暂无评论，期待您的回复</span>
          </div>
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
// 评论界面

.comment-box {
  background-color: #fff;
  width: 600px;
  margin-top: 20px;
  padding: 25px 25px 10px 25px;
  display: flex;
  flex-direction: column;
  // 评论框
  .comment-input {
    margin: 0 auto;
    padding-top: 30px;
    // 背景颜色
    /deep/ .el-textarea__inner {
      background-color: #eee;
      border: 1px solid #e8e4e4;
    }
    /deep/ .el-textarea__inner:focus {
      border-color: #e8e4e4;
    }
  }

  //  评论框下发布按钮
  .button-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    span {
      font-size: 12px;
      padding-left: 10px;
    }
    .bnt {
      padding-right: 20px;
    }
  }

  // 主要的评论内容
  .comment-info-box {
    position: relative;
    margin-top: 20px;
    .comment-title-info {
      span:first-child {
        font-weight: 800;
        padding-right: 7px;
      }
      // 评论数
      .comment-num {
        font-size: 12px;
        padding-left: 8px;
      }
    }

    .comment-content {
      position: relative;
      height: 102px;
      margin-top: 15px;

      .reviewer-info-box {
        display: flex;
        align-items: center;
        padding-left: 20px;

        // 头像列表
        .reviewer-info {
          padding-left: 10px;
          font-size: 11px;
          color: #3d3d3d;
          .review-nickName {
            font-size: 14px;
          }
        }
      }
      //  评论的具体内容
      .comment-info {
        padding: 5px 0px 10px 65px;
        font-size: 12px;
      }
      // 点赞回复操作
      .star-box {
        font-size: 14px;
        color: rgb(161, 157, 157);
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        span:first-child {
          font-size: 12px;
          padding-right: 20px;
        }
      }
      //  分割线样式
      .el-divider {
        margin: 10px 0;
      }
    }
    .nologin-comment-content {
      height: 120px;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: rgba(232, 228, 228, 0.4);

      i,
      div {
        font-size: 15px;
        color: #3d3d3d;
        cursor: pointer;
      }
    }
    .no-comment-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
    }
  }
  // 取消最后一个评论下划线
  .comment-content:last-child .el-divider {
    display: none;
  }
}
</style>