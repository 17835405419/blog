
<template>
  <div style="border: 1px solid #ccc">
    <el-form label-width="80px" :model="articleForm" :rules="articleRules">
      <!-- 文章标题 -->
      <el-form-item label="文章标题" prop="title">
        <el-input
          placeholder="请输入文章标题"
          v-model="articleForm.title"
        ></el-input>
      </el-form-item>
      <!-- 文章封面 -->
      <el-form-item label="文章封面">
        <!-- transmitImgUrl 接受子组件传递过来的图片地址   deleteImgUrl 接收子组件传递回来的删除图片讯号 -->
        <Upload
          :action="action"
          :headers="headers"
          ref="myUpload"
          name="articleCover"
          :isShowFileList="isShowFileList"
          listType="picture-card"
          @transmitImgUrl="getChildUrl"
          @deleteImgUrl="articleForm.articleImg = ''"
        >
          <i class="el-icon-plus"></i>
        </Upload>
      </el-form-item>
      <!-- 文章内容 -->
      <el-form-item label="文章内容" prop="content">
        <!--创建 wangeditor 挂载点 -->
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 400px; overflow-y: hidden"
          v-model="articleForm.content"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </el-form-item>
      <!-- 文章分区 -->
      <el-form-item label="文章分区" prop="articlPartName">
        <el-dropdown split-button size="mini" @command="showArticlePart">
          {{ articleForm.articlPartName }}
          <!-- 选择内容 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="技术博客">技术博客</el-dropdown-item>
            <el-dropdown-item command="生活日志">生活日志</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <!-- 文章标签 -->
      <el-form-item label="文章标签">
        <div class="tag-box" @click="drawer = !drawer">
          <el-tag
            v-for="(item, index) in articleForm.showTagList"
            :key="index"
            closable
            @close="delArticleTag(index)"
            :disable-transitions="true"
          >
            {{ item }}
          </el-tag>
        </div>
        <!-- 标签选择弹框 -->
        <el-drawer
          :with-header="false"
          :visible.sync="drawer"
          direction="btt"
          :modal="false"
          size="30%"
        >
          <span
            class="article-tag"
            v-for="item in tagList"
            :key="item.tagId"
            @click="showArticleTag(item.tagName)"
            >{{ item.tagName }}
          </span>
        </el-drawer>
      </el-form-item>

      <!-- 文章来源 -->
      <el-form-item label="文章来源" prop="stemfrom">
        <el-radio v-model="articleForm.stemfrom" label="原创">原创</el-radio>
        <el-radio v-model="articleForm.stemfrom" label="转载">转载</el-radio>
      </el-form-item>

      <!-- 发布按钮 -->
      <el-form-item>
        <el-button type="success" size="small" @click="release">发布</el-button>
      </el-form-item>
    </el-form>
    <!-- <button @click="look">123</button> -->
  </div>
</template>

<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import Upload from "../components/MyUpload.vue";
import {
  article_getArticleTag,
  article_deleteArticleImg,
  article_createArticle,
} from "@/api/article_api.js";
export default Vue.extend({
  components: { Editor, Toolbar, Upload },

  data() {
    let _that = this;
    return {
      editor: null, //富文本编辑器实例
      toolbarConfig: {
        insertKeys: [], //插入新菜单
        excludeKeys: ["insertVideo", "uploadVideo", "bgColor"], //不显示哪些工具栏
      }, //工具栏配置
      editorConfig: {
        MENU_CONF: {
          uploadImage: {
            server: "http://127.0.0.1:3000/api/upload/articleImg", // 服务器端地址
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            }, //请求头
            fieldName: "articleImg", //上传字段名
            maxFileSize: 1 * 1024 * 1024, // 1M
            timeout: 5 * 1000, //超时时间
          }, //编辑器上传图片配置
          insertImage: {
            onInsertedImage(imageNode) {
              /**
               * 插入文章图片之后的回调
               * 收集已上传的图片
               */

              if (imageNode == null) return;
              const { src, alt, url, href } = imageNode;
              _that.allUploadImgList.push(src);
            },
          },
        },
      }, //编辑器配置
      allUploadImgList: [], //所有上传过的图片 包括删除的 在最后要和还存有的图片进行比较 然后删除服务器端的图片

      mode: "default", // or 'simple'
      action: "http://127.0.0.1:3000/api/upload/articleCover", //封面上传地址
      headers: {
        Authorization: `Bearer ${this.$store.state.token}`,
      }, //上传配置请求头

      // 发表文章内容
      articleForm: {
        authorId: this.$store.state.userInfo.userId,
        title: "", //文章标题
        articleImg: "", //封面图片
        content: "", //文章内容
        articlPartName: "选择分区", //分区
        //显示的标签列表
        showTagList: [],
        stemfrom: "", //文章来源
      },

      isShowFileList: true, //是否显示头像上传照片墙
      drawer: false, //是否打开标签抽屉组件
      tagList: [], // 标签列表

      // 表单验证规则
      articleRules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        content: [{ required: true, trigger: "blur" }],
        articlPartName: [
          { required: true, message: "请选择文章分区", trigger: "blur" },
        ],
        stemfrom: [
          { required: true, message: "请选择文章来源", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getArtcileTag();
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    // 获取文章tag
    async getArtcileTag() {
      const { data } = await article_getArticleTag();
      if (data.code === 0) {
        // 缓存一份 tag数据
        this.tagList = data.data;
      }
    },

    getChildUrl(imgUrl) {
      // 获取子组件传递回来的头像地址
      this.articleForm.articleImg = imgUrl;
    },

    // 将选择的标签显示出来
    showArticleTag(tagName) {
      if (this.articleForm.showTagList.length > 5) {
        this.$message.warning("最多可选择六个标签");
      } else {
        this.articleForm.showTagList.push(tagName);
      }
    },
    // 删除显示的标签
    delArticleTag(index) {
      this.articleForm.showTagList.splice(index, 1);
    },
    // 文章分区 下拉框 回调事件函数
    showArticlePart(command) {
      this.articleForm.articlPartName = command;
    },

    // 发布文章按钮
    async release() {
      if (this.articleForm.title === "") {
        this.$message.warning("文章标题为必填");
      } else if (this.articleForm.content === "<p><br></p>") {
        this.$message.warning("文章内容为必填");
      } else if (this.articleForm.articlPartName === "选择分区") {
        this.$message.warning("请选择分区");
      } else if (this.articleForm.stemfrom === "") {
        this.$message.warning("请选择文章来源");
      } else {
        // 简易diff算法 获取需要在服务器中删除的文章图片
        let newImgList = this.editor
          .getElemsByType("image")
          .map((item) => item.src);
        this.allUploadImgList.forEach(async (e) => {
          if (!newImgList.includes(e)) {
            await article_deleteArticleImg({ imgUrl: e });
          }
        });
        // 调用接口发布文章
        const { data } = await article_createArticle({
          articleInfo: this.articleForm,
        });
        if (data.code === 0) {
          this.$message.success("发布文章成功");
          // 清空文章数据
          this.articleForm = {
            authorId: this.$store.state.userInfo.userId,
            title: "", //文章标题
            articleImg: "", //封面图片
            content: "", //文章内容
            articlPartName: "选择分区", //分区
            //显示的标签列表
            showTagList: [],
            stemfrom: "", //文章来源
          };
          // 调用子组件方法清空上传列表
          this.$refs.myUpload.clearFiles();
        }
      }
    },
  },

  // 组件销毁生命周期
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style lang='less' scoped>
// 编辑器样式
@import url("@wangeditor/editor/dist/css/style.css");
.el-form {
  padding: 30px 40px 0 40px;
}
// 上传封面按钮
// .upload-cover {
//   width: 100px;
//   height: 100px;
//   border: 1px dashed rgb(143, 139, 139);
//   background-color: #fff;
//   i {
//     line-height: 100px;
//   }
// }

// 标签盒子
.tag-box {
  width: 815px;
  height: 36px;
  background-color: #fff;
  display: flex;
  align-items: center;
  .el-tag {
    margin-right: 5px;
  }
}
// 标签块
.article-tag {
  display: inline-block;
  width: 100px;
  border: 1px solid #eee;
  text-align: center;
}
.article-tag:hover {
  box-shadow: 0 0 10px 5px #eee;
  cursor: pointer;
}
.tag-box:hover {
  cursor: pointer;
}
</style>