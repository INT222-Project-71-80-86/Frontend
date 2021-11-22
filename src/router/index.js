import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import cart from '../components/cart.vue'
import Addproduct from '../views/AddproductV2.vue'
import Addbrand from '../components/Addbrand.vue'
import Addcolor from '../components/Addcolor.vue'
import ShowProducts from '../components/ShowProducts.vue'
import EditProduct from '../views/EditProductV2.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'
import About from '../views/About.vue'
import singleProduct from '../views/singleProduct.vue'
import store from '../store/index.js'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import AdminPage from '../components/AdminPage.vue'
import RoleManage from '../components/RoleManage.vue'
import CouponManage from '../components/CouponManage.vue'
import Register from '../components/Register.vue'

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
    path: '/Addcolor',
    name: 'Addcolor',
    component: Addcolor
  },
  {
    path: '/Addbrand',
    name: 'Addbrand',
    component: Addbrand
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
      path:'/Profile',
      name:'Profile',
      component: Profile
    },
    {
      path:'/AdminPage',
      name:'AdminPage',
      component: AdminPage
     },
     {
       path:'/RoleManage',
       name:'RoleManage',
       component: RoleManage
     },
     {
       path:'/CouponManage',
       name:'CouponManage',
       component: CouponManage
     },
     {
       path:'/Register',
       name:'Register',
       component: Register
      }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const backend_url = process.env.VUE_APP_BACKEND_URL

router.beforeEach(async (to, from, next) => {

  console.log(to)
  console.log(from)

  let access_token = localStorage.getItem("access_token")
  let refresh_token = localStorage.getItem("refresh_token")

  if(access_token == null){
    // Check list of path whether user can route to or not
    console.log("access token is null")
    next()
  }
  // npm install jwt-decode
  let user = jwt_decode(access_token)
  console.log(user)

  if( (user.exp*1000) < new Date()){
    console.log("User token is now expired at "+new Date(user.exp*1000))
    console.log("Removing Access Token from Local Storage")
    // localStorage.removeItem("access_token")
    console.log("Trying to refresh token")

    if(refresh_token == null) {
      console.log("ERROR Not have refresh Token")
      next("login")
    } 

    const res = await axios.get(`${backend_url}/user/token/refresh`, { headers: { 'Authorization': `Bearer ${refresh_token}` } }).catch(function (error) {
      if (error) {
          console.log(error);
          console.log("Removing Refresh Token and redirect to Login page")
          // localStorage.removeItem("refresh_token")
          console.log("Removing State User and other data")
          store.dispatch("removeUser")
          next('login')
      }
    })
    const data = await res.data
    access_token = data.access_token
    refresh_token = data.refresh_token
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    user = jwt_decode(access_token)
    console.log('Set new Auth Token in Local Storage, Decoding new access token')
  }

  if( store.state.user != null && store.state.expiryDate != null && store.state.user.username == user.sub && store.state.expiryDate.getTime() == user.exp*1000){
    console.log("Validate token's username and username are matching then skipping store new User")
    console.log(store.state.expiryDate)
    next()
  } else {
    await store.dispatch('fetchUser', {user, access_token} )
    console.log("printing user/ role/ exp")
    console.log(store.state.user)
    console.log(store.state.role)
    console.log(store.state.expiryDate)
    next()
  }
} 
  )

export default router