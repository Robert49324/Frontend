import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '../views/SignUpPage.vue'
import NotFound from '../views/NotFound.vue'
import HomePage from '../views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home',
  },
  {
    path: '/signup',
    component: SignUpPage,
    name: 'signup',
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'login',
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    name: 'notFound',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
