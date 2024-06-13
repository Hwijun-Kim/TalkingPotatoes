import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
} from "vue-router";

import CreateItem from "@/pages/CreateItem.vue";
import Login from "@/pages/Login.vue";
import Home from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";
import UpdateItem from "@/pages/UpdateItem.vue";
import TotalView from "@/pages/TotalView.vue";
import Summary from "@/pages/Summary.vue";

const viewsIdGuard = (to, from) => {
  // totalView/:id 경로는 반드시 이전 경로가
  // /totalView, /totalView:id 인 경우만 내비게이션 허용함
  if (from.name !== "totalView" && from.name !== "totalView/id") {
    return false;
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login, name: "Login", meta: { hideHeader: true } },
    { path: "/profile", component: Profile, name: "Profile" },
    { path: "/home", component: Home, name: "Home" },
    { path: "/createItem", component: CreateItem, name: "CreateItem" },
    { path: "/totalView", component: TotalView, name: "TotalView" },
    {
      path: "/totalView/updateitem/:id",
      component: UpdateItem,
      name: "UpdateItemTotalView",
      //beforeEnter:viewsIdGuard
    },
    {
      path: "/home/updateitem/:id",
      component: UpdateItem,
      name: "UpdateItemHome",
      //beforeEnter:viewsIdGuard
    },
    { path: "/summary", component: Summary, name: "Summary" },
  ],
});

router.beforeEach((to) => {
  //to.query에 속성이 존재할 경우 제거된 경로로 재이동
  if (to.query && Object.keys(to.query).length > 0) {
    return { path: to.path, query: {}, params: to.params };
  }
});

router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    console.log("@@ 내비게이션 중단 : ", failure);
    return { name: "home" };
  }
});

export default router;
