import { user_getUserInfo } from "@/api/user_api.js";
import { Message } from "element-ui"; //导入弹窗
export const updateLocalUserInfo = async (store, message, type = "success") => {
  // 更新用户信息
  // 获取用户数据
  const res = await user_getUserInfo();
  // 将用户数据保存到 vuex中
  store.commit("setUserInfo", res.data.userInfo);
  //   弹窗
  Message({
    message: message,
    type: type, //默认值是success
  });
};
