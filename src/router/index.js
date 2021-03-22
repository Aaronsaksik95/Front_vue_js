import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shops from '../views/shop/Shops.vue'
import Product from '../views/shop/Product.vue'
import Login from '../views/authentication/Login.vue'
import Signup from '../views/authentication/Signup.vue'
import Profil from '../views/authentication/Profil.vue'
import ShoppingCart from '../views/shop/ShoppingCart.vue'
import Orders from '../views/shop/Orders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shops',
    name: 'Shops',
    component: Shops
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    beforeEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name: "Login"
        })
      }
      else {
        next()
      }
    }
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  }
]

const router = new VueRouter({
  routes
})

export default router
