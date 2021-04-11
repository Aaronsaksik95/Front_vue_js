import Vue from 'vue'
import VueRouter from 'vue-router'
import authAdmin from '../middleware/authAdmin'
import auth from '../middleware/auth'

//Shops
import Man from '../views/shop/Man.vue'
import Woman from '../views/shop/Woman.vue'
import Kids from '../views/shop/Kids.vue'
import Home from '../views/Home.vue'
import Product from '../views/shop/Product.vue'
import ShoppingCart from '../views/shop/ShoppingCart.vue'
import Whish from '../views/shop/Whish.vue'
import Orders from '../views/shop/Orders.vue'
import Cancel from '../views/shop/Cancel.vue'
import Success from '../views/shop/Success.vue'

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
    path: '/man',
    name: 'Man',
    component: Man
  },
  {
    path: '/woman',
    name: 'Woman',
    component: Woman
  },
  {
    path: '/kids',
    name: 'Kids',
    component: Kids
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/whish',
    name: 'Whish',
    component: Whish
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
    path: '/cancel',
    name: 'Cancel',
    component: Cancel
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
