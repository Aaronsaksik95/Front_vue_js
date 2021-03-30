import Vue from 'vue'
import VueRouter from 'vue-router'
import authAdmin from '../middleware/authAdmin'
import auth from '../middleware/auth'

//Shops
import Home from '../views/Home.vue'
import Shops from '../views/shop/Shops.vue'
import Product from '../views/shop/Product.vue'
import ShoppingCart from '../views/shop/ShoppingCart.vue'
import Orders from '../views/shop/Orders.vue'

//Authentication
import Login from '../views/authentication/Login.vue'
import Signup from '../views/authentication/Signup.vue'
import Profil from '../views/authentication/Profil.vue'

//Back Office
import AdminOrders from '../views/admin/Orders.vue'
import AdminProducts from '../views/admin/Products.vue'
import AddProducts from '../views/admin/AddProduct.vue'
import AdminUsers from '../views/admin/Users.vue'
import UpdateUser from '../views/admin/UpdateUser.vue'
import UpdateProduct from '../views/admin/UpdateProduct.vue'


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
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
    beforeEnter: auth
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: auth
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
    beforeEnter: auth
  },
  {
    path: '/admin/Orders',
    name: 'AdminOrders',
    component: AdminOrders,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/Products',
    name: 'AdminProducts',
    component: AdminProducts,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/addProduct',
    name: 'AddProducts',
    component: AddProducts,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/Users',
    name: 'AdminUsers',
    component: AdminUsers,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/updateProduct/:id',
    name: 'UpdateProduct',
    component: UpdateProduct,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/updateUser/:id',
    name: 'UpdateUser',
    component: UpdateUser,
    beforeEnter: authAdmin
  },
  {
    path: '*',
    redirect: '/shops'
  }
]

const router = new VueRouter({
  routes
})

export default router
