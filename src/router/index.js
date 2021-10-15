import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import cart from '../components/cart.vue'
import Addproduct from '../components/Addproduct.vue'
import ShowProducts from '../components/ShowProducts.vue'
import EditProduct from '../components/EditProduct.vue'
import Login from '../components/Login.vue'
import About from '../views/About.vue'
import singleProduct from '../views/singleProduct.vue'
import register from '../components/register.vue'


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
    component: About
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/showproducts/:type/:value',
    name: 'showproducts',
    component: ShowProducts,
    props:true
  },
  {
    path: '/Addproduct',
    name: 'Addproduct',
    component: Addproduct
  },
  {
    path: '/edit/:editProduct',
    name: 'EditProduct',
    component: EditProduct,
    props:true
  },
    {
      path: '/product/:singleProd',
      name: 'singleProduct',
      component: singleProduct,
      props:true
    },
    {
      path:'/register',
      name:'register',
      component:register
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router