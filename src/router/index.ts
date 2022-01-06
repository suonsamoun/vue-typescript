import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import Todo from "@/views/Todo.vue";
import Login from "@/views/Login.vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/auth/actions";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Todo",
    component: Todo,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { state, dispatch } = useStore();

  dispatch(ActionTypes.FETCH_USER);
  
  if (!state.auth.me && to.fullPath !== '/login') {
    next('/login');
  } else if (state.auth.me && to.fullPath === '/login') {
    next('/');
  } else {
    next();
  }

});

export default router;
