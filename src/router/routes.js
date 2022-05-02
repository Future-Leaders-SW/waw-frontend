import HomeView from "@/views/HomeView.vue";

/**
 * List of routes to be registered for the app
 *
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    /*
     * route level code-splitting
     * this generates a separate chunk (About.[hash].js) for this route
     * which is lazy-loaded when the route is visited.
     */
    component: () => import("@/views/AboutView.vue"),
  },
];