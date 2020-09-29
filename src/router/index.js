import Vue from 'vue'
import VueRouter from 'vue-router'
import details from '../views/MasterDetails.vue'
import category from '../views/category.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import PageUsers from '../views/PageUsers.vue'
import PageMasters from '../views/PageMasters.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    name: "login",
    component: login, 
  },
  {
    path: '/category',
    name: 'category',
    component: category,
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: "/details/:id",
    name: "details",
    component: details
  },
  {
    path: "/page-users",
    name: "page-users",
    component: PageUsers,
  },
  {
    path: "/page-masters",
    name: "page-masters",
    component: PageMasters,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
