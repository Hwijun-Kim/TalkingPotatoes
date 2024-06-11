import { createRouter, createWebHistory } from 'vue-router'

import CreateItem from '@/pages/CreateItem.vue';
import Profile from '@/pages/Profile.vue';
import UpdateItem from '@/pages/UpdateItem.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/createItem', component: CreateItem },
      { path: '/profile', component: Profile },
      { path: '/updateitem', component: UpdateItem },
    ]
})

export default router;