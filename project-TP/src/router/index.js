import { createRouter, createWebHistory } from 'vue-router'

import CreateItem from '@/pages/CreateItem.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/createItem', component: CreateItem },
    ]
})

export default router;