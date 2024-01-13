import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, authTutorGuard } from '@/services/authGuard'
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
      title: 'Người dùng'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next);
    },
    path: '/users',
    name: 'users',
    component: () => import('@/views/users/UsersList.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    },
    path: '/detail-tutor/:tutor_id',
    name: 'detail-tutor',
    component: () => import('@/views/tutors/DetailTutor.vue')
  },
  {
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    },
    path: '/detail-course/:course_id',
    name: 'detail-course',
    component: () => import('@/views/courses/DetailCourse.vue')
  },
  {
    meta: {
      title: 'Chương trình khuyến mãi'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    },
    path: '/coupons',
    name: 'coupons',
    component: () => import('@/views/coupons/Coupons.vue')
  },
  {
    meta: {
      title: 'Quản lý giao dịch'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    },
    path: '/payments',
    name: 'payments',
    component: () => import('@/views/payment/PaymentList.vue')
  },
  {
    meta: {
      title: 'Thanh toán'
    },
    beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    },
    path: '/payments/course',
    name: 'payments-course',
    component: () => import('@/views/salary/SalaryList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
