import Vue from "vue";
import VueRouter from "vue-router";

// 重写 push方法防止路由重复跳转报错
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  // 前端页面端
  {
    path: "/",
    name: "webIndex",
    component: () => import("@/views/web/index.vue"),
  },

  {
    path: "/articleInfo",
    name: "articleInfo",
    component: () => import("@/views/web/article/articleInfo.vue"),
  },

  // 后台作者端
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/admin/login/login.vue"),
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
        path: "/admin/article/release",
        name: "release",
        component: () => import("@/views/admin/article/release.vue"),
        meta: {
          title: "发布文章",
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
