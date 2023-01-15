import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入组件库
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(ElementUI);

// 引入day.js
import dayjs from "dayjs";
// 定义全局过滤器 处理时间戳
Vue.filter("FormatTime", function (value) {
  if (!value) return "";
  return dayjs(value).format("YYYY-MM-DD");
});

// 引入代码高亮插件
//导入代码高亮文件
import hljs from "highlight.js";
//导入代码高亮样式
import "highlight.js/styles/monokai-sublime.css";
//定义一个代码高亮指令
Vue.directive("highlight", function (el) {
  let highlight = el.querySelectorAll("pre code");
  highlight.forEach((block) => {
    hljs.highlightElement(block);
  });
});
// 初始化
Vue.prototype.$hljs = hljs;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
