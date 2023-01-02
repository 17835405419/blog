import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 前端页面端
  {
    path: "/",
    name: "webIndex",
    component: () => import("@/views/web/index.vue"),
  },

  {
    path: "/articleInfo/:id",
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
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
