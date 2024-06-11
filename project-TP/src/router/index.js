import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue';
import CreateItem from '@/pages/CreateItem.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/createItem', component: CreateItem },
      { path: '/home', component: Home },
    ]
})

export default router;