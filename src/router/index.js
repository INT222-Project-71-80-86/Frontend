import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import cart from '../components/cart.vue'
import Addproduct from '../components/Addproduct.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/Addproduct',
    name: 'Addproduct',
    component: Addproduct
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
