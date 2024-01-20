import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/orgs',
    name: 'orgs',
    component: () => import('@/views/AllOrgsView.vue'),
  },
  {
    path: '/orgs/:id',
    name: 'org-id',
    component: () => import('@/views/OrgView.vue')
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('@/views/AllTeamsView.vue'),
  },
  {
    path: '/teams/:id',
    name: 'team-id',
    component: () => import('@/views/TeamView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
