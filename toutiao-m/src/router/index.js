import { createRouter, createWebHashHistory } from 'vue-router'

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
    component: () => import('@/views/artc/'),
    props: true
  },
  {
    path: '/userprofile/',
    name: 'userprofile',
    component: () => import('@/views/userprofile/'),
    props: true
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
