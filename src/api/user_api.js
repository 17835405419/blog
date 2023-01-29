import request from "@/untils/request.js";

export const user_login = (data) => {
  return request({
    method: "Post",
    url: "/users/login",
    data,
  });
};
export const user_register = (data) => {
  return request({
    method: "Post",
    url: "/users/register",
    data,
  });
};
export const user_getUserInfo = () => {
  return request({
    method: "Get",
    url: "/users/getUserInfo",
  });
};
export const user_updateUserInfo = (data) => {
  return request({
    method: "Put",
    url: "/users/updateUserInfo",
    data,
  });
};
export const user_updatePwd = (data) => {
  return request({
    method: "Put",
    url: "/users/updatePwd",
    data,
  });
};

/* 
 粉丝接口
*/
export const user_follow = (data) => {
  return request({
    method: "Post",
    url: "/fans",
    data,
  });
};

export const user_upFollow = (params) => {
  return request({
    method: "delete",
    url: "/fans",
    params,
  });
};
export const user_findFans = (params) => {
  return request({
    method: "Get",
    url: "/fans",
    params,
  });
};
