import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/view/Login/index.vue') },
  { path: '/home', component: () => import('@/view/Home/index.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
