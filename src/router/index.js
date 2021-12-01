import { createRouter, createWebHistory } from 'vue-router'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
// Import Views
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'
import Addproduct from '../views/AddproductV2.vue'
import About from '../views/About.vue'
import singleProduct from '../views/singleProduct.vue'
// Import Components
import ShowProducts from '../components/ShowProducts.vue'
import EditProduct from '../views/EditProductV2.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'
import store from '../store/index.js'
import AdminPage from '../components/AdminPage.vue'
import Register from '../components/Register.vue'
import UserOrder from '../components/UserOrder.vue'

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
    path: '/order',
    name: 'Order',
    component: Order
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
    props: true
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
       path:'/Register',
       name:'Register',
       component: Register
      },
      {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/user/order",
      name: "UserOrder",
      component: UserOrder
    }
]

// Each role access components name
const staff = ["Addproduct", "EditProduct", "Profile"]
const customer = ["cart", "Profile", "Order", "UserOrder"]
const admin = ["Addproduct", "EditProduct", "Profile", "AdminPage"]
const all = ["Home", "About", "showproducts", "singleProduct", "RoleManage"]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const backend_url = process.env.VUE_APP_BACKEND_URL

router.beforeEach(async (to, from, next) => {

  if(to.name == "NotFound"){
    next("")
  }

  let access_token = localStorage.getItem("access_token")
  let refresh_token = localStorage.getItem("refresh_token")

  if(access_token == null){
    // Check if not have access_token but user is store in store
    if(store.state.user != null || store.state.role != ''){
      store.dispatch('removeUser')
      next("login")
    }
    // Check list of path whether user can route to or not
    else if (all.includes(to.name) || to.name == "login" || to.name == "Register") {
      next()
    } else {
      next("")
    }
  }

  let user = jwt_decode(access_token)

  if( (user.exp*1000) < new Date()){

    if(refresh_token == null) {
      // Not have refresh Token
      next("login")
    } 

    const res = await axios.get(`${backend_url}/user/token/refresh`, { headers: { 'Authorization': `Bearer ${refresh_token}` } }).catch(function (error) {
      if (error) {
          // Removing Refresh Token and redirect to Login page
          // Removing State User and other data
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
    // Set new Auth Token in Local Storage, Decoding new access token
  }
  

  if( store.state.user != null && store.state.expiryDate != null && store.state.user.username == user.sub && store.state.expiryDate.getTime() == user.exp*1000){
    if(checkValidRole(user, to.name)){
      // Validate token's username and username are matching then skipping store new User
      next()
    } else {
      next("")
    }
  } else {
    await store.dispatch('fetchUser', {user, access_token} )
    if(checkValidRole(user, to.name)){
      next()
    } else {
      next("")
    }
  }
} 
  )
  
  function checkValidRole(user, toPathName) {
    if(all.includes(toPathName)){
      return true;
    }
    const role = user.roles[0]
    switch (role) {
      case "ROLE_CUSTOMER":
        return customer.includes(toPathName)?true:false;
      case "ROLE_STAFF":
        return staff.includes(toPathName)?true:false;
      case "ROLE_ADMIN":
        return admin.includes(toPathName)?true:false;
      default:
        return false;
    }
  }

export default router