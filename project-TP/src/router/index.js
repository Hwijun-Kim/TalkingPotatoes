import {createRouter,createWebHistory,isNavigationFailure} from "vue-router";

import CreateItem from "@/pages/CreateItem.vue";
import Login from "@/pages/Login.vue";
import Home from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";
import UpdateItem from "@/pages/UpdateItem.vue";
import TotalView from "@/pages/TotalView.vue";
import Summary from "@/pages/Summary.vue";


//라우터 설정
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login, name: "Login", meta: { hideHeader: true } }, //헤더 숨김
    { path: "/profile", component: Profile, name: "Profile" },
    { path: "/home", component: Home, name: "Home" },
    { path: "/createItem", component: CreateItem, name: "CreateItem" },
    { path: "/totalView", component: TotalView, name: "TotalView" },
    {
      path: "/totalView/updateitem/:id",
      component: UpdateItem,
      name: "UpdateItemTotalView",
    },
    {
      path: "/home/updateitem/:id",
      component: UpdateItem,
      name: "UpdateItemHome",
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
