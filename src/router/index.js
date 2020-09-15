import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import details from '../views/MasterDetails.vue'
import category from '../views/category.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    name: "home",
    component: home, 
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/category',
    name: 'category',
    component: category
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/category2',
    name: 'category2',
    component: category2
  },
  {
    path: "/details/:id",
    name: "details",
    component: details
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
