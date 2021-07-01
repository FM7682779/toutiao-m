import { createRouter, createWebHashHistory } from 'vue-router'
import empty from '@/views/empty/'
import store from '@/store/'
import { Dialog } from 'vant'
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      }

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/')
  },
  {
    path: '/artc/:artcid',
    name: 'artc',
    component: () => import('@/views/artc/')
  },
  {
    path: '/userprofile/',
    name: 'userprofile',
    component: () => import('@/views/userprofile/')
  },
  {
    path: '/chart/',
    name: 'chart',
    component: () => import('@/views/chart/'),
    meta: { requiresAuth: true }
  },
  {
    path: '/empty/',
    name: 'empty',
    component: empty
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  const user = store.state.user
  if (!to.meta.requiresAuth || user) {
    return next()
  }
  Dialog.confirm({
    title: '该功能需要登录，确认登录吗？'
  })
    .then(() => {
      // on confirm
      next({
        name: 'Login',
        query: {
          redirect: from.fullPath
        }
      })
    })
    .catch(() => {
      // on cancel
      next(false)
    })
})

export default router
