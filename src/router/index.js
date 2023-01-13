// Composables
import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "@/stores/user";
const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Login.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("@/layouts/user/index.vue"),
    children: [
      {
        path: "",
        name: "UserIndex",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/user/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.name !== "Login") {
    const user = userStore(pinia);
    return { name: "Login" };
  }
  // const auth = authenticated();
  // if (!auth && to.name !== "Login") {
  //   return { name: "Login" };
  // }
  // ...
  // 返回 false 以取消导航
  // return false;
});

export default router;
