import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "@/untils/storage";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getItem("token"),
    userInfo: getItem("userInfo"),
  },
  getters: {},
  mutations: {
    setUserToken(state, token) {
      state.token = token;
      // 将传递过来的用户数据缓存到本地
      setItem("token", state.token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      setItem("userInfo", state.userInfo);
    },
  },
  actions: {},
  modules: {},
});
