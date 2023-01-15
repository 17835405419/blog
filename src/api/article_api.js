import request from "@/untils/request.js";

// 获取文章标签
export const article_getArticleTag = () => {
  return request({
    method: "Get",
    url: "/artcileTag",
  });
};

// 发布文章
export const article_createArticle = (data) => {
  return request({
    method: "post",
    url: "/article",
    data,
  });
};
// 删除文章
export const article_deleteArticle = (params) => {
  return request({
    method: "delete",
    url: "/article",
    params,
  });
};
// 获取文章列表
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

/**
 * 文章点赞接口
 */

export const article_createStar = (data) => {
  return request({
    method: "post",
    url: "/artcileStar",
    data,
  });
};

// 取消点赞
export const article_deleteStar = (params) => {
  return request({
    method: "delete",
    url: "/artcileStar",
    params,
  });
};

// 查找点赞

export const article_getStar = (params) => {
  return request({
    method: "get",
    url: "/artcileStar",
    params,
  });
};

/**
 * 文章评论接口
 */

export const article_createComment = (data) => {
  return request({
    method: "post",
    url: "/comment",
    data,
  });
};

// 查找评论
export const article_getComment = (params) => {
  return request({
    method: "get",
    url: "/comment",
    params,
  });
};
