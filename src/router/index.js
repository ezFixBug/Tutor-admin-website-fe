import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, authTutorGuard } from '@/services/authGuard';
import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/',
    name: 'dashboard',
    component: Home
  },
  {
    meta: {
      title: 'Gia sư'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/tutors',
    name: 'tutors',
    component: () => import('@/views/tutors/Tutors.vue')
  },
  {
    meta: {
      title: 'Khóa học'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/courses',
    name: 'courses',
    component: () => import('@/views/courses/Courses.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  },
  {
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/detail-tutor/:tutor_id',
    name: 'detail-tutor',
    component: () => import('@/views/tutors/DetailTutor.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router