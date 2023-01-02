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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
