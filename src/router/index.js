import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import cart from '../components/cart.vue'
import Addproduct from '../components/Addproduct.vue'
import ShowProducts from '../components/ShowProducts.vue'
import EditProduct from '../components/EditProduct.vue'
import Login from '../components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/showproducts',
    name: 'showproducts',
    component: ShowProducts
  },
  {
    path: '/Addproduct',
    name: 'Addproduct',
    component: Addproduct
  },
  {
    path: '/edit',
    name: 'editproduct',
    component: EditProduct
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
