import Vue from "vue";
import VueRouter from "vue-router";

// 重写 push方法防止路由重复跳转报错
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
// 重写replace方法
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  // 前端页面端
  {
    path: "/",
    name: "webIndex",
    component: () => import("@/views/web/index.vue"),
    meta: {
      title: "首页",
    },
  },

  {
    path: "/articleInfo",
    name: "articleInfo",
    component: () => import("@/views/web/article/articleInfo.vue"),
    meta: {
      title: "文章详情",
    },
  },
  {
    path: "/technology",
    name: "technology",
    component: () => import("@/views/web/selctionPage.vue"),
    meta: {
      title: "技术博客",
    },
  }, // 导航 ---技术博客
  {
    path: "/lifeLog",
    name: "lifeLog",
    component: () => import("@/views/web/selctionPage.vue"),
    meta: {
      title: "生活日志",
    },
  }, // 导航 ---生活日志
  {
    path: "/tag",
    name: "tag",
    component: () => import("@/views/web/selctionPage.vue"),
    meta: {
      title: "标签",
    },
  }, // 点击tag 查询文章
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/web/about.vue"),
    meta: {
      title: "关于",
    },
  }, // 关于我
  {
    path: "/leaveMessage",
    name: "leaveMessage",
    component: () => import("@/views/web/leaveMessage.vue"),
    meta: {
      title: "留言",
    },
  }, // 留言版

  // 后台作者端
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/admin/login/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/admin/login/register.vue"),
  },
  {
    redirect: "/admin/user/personal",
    path: "/admin",
    name: "adminIndex",
    component: () => import("@/views/admin/index.vue"),
    children: [
      {
        path: "/admin/user/personal",
        name: "personal",
        component: () => import("@/views/admin/user/personal.vue"),
        meta: {
          title: "个人资料",
        },
      },
      {
        path: "/admin/user/changePwd",
        name: "changePwd",
        component: () => import("@/views/admin/user/changePwd.vue"),
        meta: {
          title: "修改密码",
        },
      },
      {
        path: "/admin/user/fansList",
        name: "fansList",
        component: () => import("@/views/admin/user/fansList.vue"),
        meta: {
          title: "粉丝列表",
        },
      },
      {
        path: "/admin/article/release",
        name: "release",
        component: () => import("@/views/admin/article/release.vue"),
        meta: {
          title: "发布文章",
        },
      },
      {
        path: "/admin/article/update",
        name: "update",
        component: () => import("@/views/admin/article/release.vue"),
        meta: {
          title: "更新文章",
        },
      },
      {
        path: "/admin/article/articleList",
        name: "articleList",
        component: () => import("@/views/admin/article/articleList.vue"),
        meta: {
          title: "文章列表",
        },
      },
      {
        path: "/admin/article/star",
        name: "articleStar",
        component: () => import("@/views/admin/article/articleStar.vue"),
        meta: {
          title: "文章点赞",
        },
      },
      {
        path: "/admin/article/comment",
        name: "articleComment",
        component: () => import("@/views/admin/article/articleComment.vue"),
        meta: {
          title: "文章评论",
        },
      },
      {
        path: "/admin/article/collection",
        name: "articleCollection",
        component: () => import("@/views/admin/article/articleCollection.vue"),
        meta: {
          title: "文章收藏",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.pageYOffset = 0;
  next();
});

export default router;
