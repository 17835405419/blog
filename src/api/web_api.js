import request from "@/untils/request.js";

/* 
    留言api
*/
export const web_getLeaveMessage = () => {
  return request({
    method: "Get",
    url: "/leaveMessage",
  });
};
export const web_createLeaveMessage = (data) => {
  return request({
    method: "post",
    url: "/leaveMessage",
    data,
  });
};
export const web_deleteLeaveMessage = (params) => {
  return request({
    method: "delete",
    url: "/leaveMessage",
    params,
  });
};
