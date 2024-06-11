import { createRouter, createWebHistory } from "vue-router";

import CreateItem from "@/pages/CreateItem.vue";
import Login from "@/pages/Login.vue";
import Home from "@/pages/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login, meta: { hideHeader: true } },
    { path: "/home", component: Home },
    { path: "/createItem", component: CreateItem },
  ],
});

export default router;
