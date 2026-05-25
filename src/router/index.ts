import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../pages/Login.vue'
import Accounts from '../pages/Accounts.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/'
  }

  if (to.path === '/' && isAuthenticated) {
    return '/accounts'
  }
})

// 監聽 401 事件，導向登入頁
window.addEventListener('unauthorized', () => {
  router.push('/')
})

export default router
