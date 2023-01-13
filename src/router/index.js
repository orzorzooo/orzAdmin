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
  const user = userStore();
  const auth = await user.authenticated();
  if (to.name !== "Login" && !auth) {
    console.log("router guard fail");
    return { name: "Login" };
  } else if (to.name == "Login" && auth) {
    return { name: "UserIndex" };
  }
  // return false;
});

export default router;
