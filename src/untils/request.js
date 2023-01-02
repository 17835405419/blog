import axios from "axios";
import store from "@/store/";

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

export default instance;
