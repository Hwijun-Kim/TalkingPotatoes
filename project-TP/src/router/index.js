import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue';
import CreateItem from '@/pages/CreateItem.vue';
import Profile from '@/pages/Profile.vue';
import UpdateItem from '@/pages/UpdateItem.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/createItem', component: CreateItem },
      { path: '/profile', component: Profile },
      { path: '/updateitem', component: UpdateItem },
      { path: '/home', component: Home },
    ]
})

export default router;