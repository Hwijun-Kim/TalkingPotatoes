import { createRouter, createWebHistory } from "vue-router";

import CreateItem from "@/pages/CreateItem.vue";
import Login from "@/pages/Login.vue";
import Home from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";
import UpdateItem from "@/pages/UpdateItem.vue";
import TotalView from "@/pages/TotalView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login, meta: { hideHeader: true } },
    { path: "/profile", component: Profile },
    { path: "/updateitem", component: UpdateItem },
    { path: "/home", component: Home },
    { path: "/createItem", component: CreateItem },
    { path: "/TotalView", component: TotalView },
  ],
});

export default router;
