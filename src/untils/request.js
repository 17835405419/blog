import axios from "axios";
import store from "@/store/";
import { Message } from "element-ui"; //导入弹窗

let instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const { token } = store.state; //从vuex中取出token
    //  如果用户已登录 统一给接口设置token信息
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    // 对请求错误做些什么
    console.log("请求失败", err);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  async (res) => {
    const { data } = res;

    if (data.code === 1004) {
      store.commit("setUserInfo", "");
      store.commit("setUserToken", "");
      Message({
        message: "您的登录已过期",
        type: "warning",
        duration: 1000,
      });
    } else if (data.code === 1002) {
      Message({
        message: "请您先登录",
        type: "warning",
        duration: 1000,
      });
    }

    return res;
  },
  (err) => {
    // 对响应错误做点什么
    console.log(err.message);
    return Promise.reject(err);
  }
);

export default instance;
