import request from "@/untils/request.js";

export const banner_getBanner = () => {
  return request({
    method: "Get",
    url: "/banner",
  });
};
