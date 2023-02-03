const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,

  // 配置全局less  需安装 npm install style-resources-loader vue-cli-plugin-style-resources-loader --save-dev
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, "./src/assets/style/commonStyle.less"),
      ],
    },
  },
});
