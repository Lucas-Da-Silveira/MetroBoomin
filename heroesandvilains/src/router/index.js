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
    path: '/org/login',
    name: 'org-login',
    component: () => import('@/views/Login/OrgLoginView.vue')
  },
  {
    path: '/hero/login',
    name: 'hero-login',
    component: () => import('@/views/Login/HeroLoginView.vue')
  },
  {
    path: '/hero/register',
    name: 'hero-register',
    component: () => import('@/views/Login/HeroRegisterView.vue')
  },
  {
    path: '/orgs',
    name: 'orgs',
    component: () => import('@/views/Orgs/AllOrgsView.vue')
  },
  {
    path: '/orgs/:id',
    name: 'org-id',
    component: () => import('@/views/Orgs/OrgView.vue')
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('@/views/Teams/AllTeamsView.vue')
  },
  {
    path: '/teams/:id',
    name: 'team-id',
    component: () => import('@/views/Teams/TeamView.vue')
  },
  {
    path: '/heroes/',
    name: 'heroes',
    component: () => import('@/views/Heroes/AllHeroesView.vue')
  },
  {
    path: '/heroes/:id',
    name: 'hero-id',
    component: () => import('@/views/Heroes/HeroView.vue')
  },
  {
    path: '/hero/settings',
    name: 'hero-settings',
    component: () => import('@/views/Heroes/HeroSettingsView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
