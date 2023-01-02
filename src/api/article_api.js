import request from "@/untils/request.js";

export const article_getArticleTag = () => {
  return request({
    method: "Get",
    url: "/artcileTag",
  });
};

export const article_createArticle = (data) => {
  return request({
    method: "post",
    url: "/article",
    data,
  });
};

// 获取前端页面文章列表
export const article_getArticle = (params) => {
  return request({
    method: "get",
    url: "/article",
    params,
  });
};

//删除文章封面接口
export const article_deleteArticleCover = (params) => {
  return request({
    method: "delete",
    url: "/upload/articleCover",
    params,
  });
};
//删除文章图片接口
export const article_deleteArticleImg = (params) => {
  return request({
    method: "delete",
    url: "/upload/articleImg",
    params,
  });
};
