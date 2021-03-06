import { createStore } from 'vuex'
import axios from 'axios'

const backend_url = process.env.VUE_APP_BACKEND_URL

export default createStore({
  state: {
    products: [],
    brands: [],
    colors: [],
    categories: [],
    orders: [],
    currentPage: 1,
    user: null,
    role: '',
    expiryDate: null,
    coupons:[],
    cart: [],
    pagingItems: []
  },
  mutations: {
    setProducts(state, p){
      state.products = p.product
      state.currentPage = p.pages
    },
    setBrands(state, brands){
      state.brands = brands
    },
    setColors(state, colors){
      state.colors = colors
    },
    setCategories(state, categories){
      state.categories = categories
    },
    setUser(state, user){
      state.user = user.user
      state.role = user.role
      state.expiryDate = user.exp
    },
    setCoupons(state,coupons){
      state.pagingItems = coupons
      state.currentPage = (coupons.pageable.pageNumber) + 1
    },
    setOrder(state, orders){
      state.orders = orders.orders
      state.currentPage = orders.page
    },
    addColor(state, color){
      state.colors.push(color)
      state.colors.sort( (a,b) => (a.cid > b.cid) ? 1 : ((a.cid < b.cid) ? -1 : 0) ) //Sort color
    },
    removeColor(state, color){
      state.colors = state.colors.filter(c => c.cid != color.cid)
    },
    addToCart(state, product){
      state.cart.push(product)
    },
    clearCart(state){
      state.cart = []
    },
    removeFromCart(state, rmid){
      state.cart = state.cart.filter(item => !(item.productColor.id.pid == rmid.pid && item.productColor.id.cid == rmid.cid))
    },
    saveCart(state, cart){
      state.cart = cart
    },
    setBrandsPaging(state, brands){
      state.pagingItems = brands
      state.currentPage = (brands.pageable.pageNumber) + 1
    },
    setColorsPaging(state, colors){
      state.pagingItems = colors
      state.currentPage = (colors.pageable.pageNumber) + 1
    },
    setAllUsers(state, users){
      state.pagingItems = users
      state.currentPage = (users.pageable.pageNumber) + 1
    },
    removePagingItem(state){
      state.pagingItems = []
      state.currentPage = 1
    }
  },
  actions: {
    async fetchAllProducts({commit},pages){
      const res = await axios.get(`${backend_url}/product?pageNo=${pages-1}&size=5`)
      const product = res.data
      commit('setProducts', {product, pages})
    },
    async fetchAllBrands({commit}){
      const res = await axios.get(`${backend_url}/brand`)
      commit('setBrands', res.data)
    },
    async fetchAllBrandsPaging({commit}, pageNo){
      const res = await axios.get(`${backend_url}/brand/get?pageNo=${pageNo-1}&size=5`)
      const brands = res.data
      commit('setBrandsPaging', brands)
    },
    async fetchAllColors({commit}){
      const res = await axios.get(`${backend_url}/color`)
      commit('setColors', res.data)
    },
    async fetchAllColorsPaging({commit}, pageNo){
      const res = await axios.get(`${backend_url}/color/get?pageNo=${pageNo-1}&size=5`)
      const colors = res.data
      commit('setColorsPaging', colors)
    },
    async fetchAllCategories({commit}){
      const res = await axios.get(`${backend_url}/cats`)
      commit('setCategories', res.data)
    },
    async fetchSearchProduct({commit},search){
      const res = await axios.get(`${backend_url}/product/query?searchValue=${search.q}&pageNo=${search.p-1}`)
      const product = res.data
      const pages = search.p
      commit('setProducts',{product, pages})
    },
    async fetchTypebyBrand({commit},tb){
      let res
      if ( tb.value == 0 ) {
        res = await axios.get(`${backend_url}/product/cat?id=${tb.type}&pageNo=${tb.page-1}`)
      } else {
        res = await axios.get(`${backend_url}/product/brandcat?bid=${tb.value}&catid=${tb.type}&pageNo=${tb.page-1}`)
      }
      
      const product = res.data
      const pages = tb.pageNo
      commit('setProducts',{product,pages})
    },
    async fetchProductByBrand({commit},brand){
      const res = await axios.get(`${backend_url}/product/brand?id=${brand.id}&pageNo=${brand.page-1}`)
      const product = res.data
      const pages = brand.pageNo
      commit('setProducts',{product,pages})
    },
    async fetchUser({commit}, userTokenDetail){
      const res = await axios.get(`${backend_url}/user/get`, { headers: { 'Authorization': `Bearer ${userTokenDetail.access_token}` }} ).catch(function (error) {
        if(error){
          console.log(error.response)
        }
      })
      const user = res.data
      const role = userTokenDetail.user.roles[0]
      const exp = new Date(userTokenDetail.user.exp * 1000)
      commit('setUser', {user,role,exp})
    },
    async fetchOrder({commit}, detail){
      const response = await axios.get(`${backend_url}/order/get/username?size=5&pageNo=${detail.pageNo - 1}`, { headers: { 'Authorization': `Bearer ${detail.token}` } }).catch( function (error) {
          if (error) {
              alert(`status: ${error.response.status} \nmessage: ${error.response.data.message}`)
          }
      })
      let orders = response.data
      commit('setOrder', {orders, page: detail.pageNo})
  },
    removeUser({commit}){
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      const user = null
      const role = ''
      const exp = null
      commit('setUser', {user,role,exp})
    },
    async fetchCoupons({commit}, pageNo){
      const res = await axios.get(`${backend_url}/coupon/allcoupons/paging?pageNo=${pageNo-1}&size=5`,{ headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` }})
      const coupons = res.data
      commit('setCoupons',coupons)
    },
    changeColor({commit}, colorManage){
      const color = colorManage.color
      switch (colorManage.mode) {
        case "add":
          commit('addColor', color)
        break;
        case "remove":
          commit('removeColor', color)
        break;
        default:
          break;
      }
    },
    addItemToCart({commit}, addProduct){
      const productColor = addProduct.productColor
      const item = this.state.cart.filter(item => (item.productColor.id.pid == productColor.id.pid && item.productColor.id.cid == productColor.id.cid))
      if(item.length > 0){
        return
      }
      commit('addToCart', addProduct)
    },
    clearCart({commit}){
      commit('clearCart')
    },
    removeCartItem({commit},id){
      commit('removeFromCart', id)
    },
    saveCart({commit}, cart){
      commit('saveCart', cart)
    },
    async fetchAllUsers({commit}, pageNo){
      const access_token = localStorage.getItem("access_token")
      const res = await axios.get(`${backend_url}/user/allusers?pageNo=${pageNo-1}&size=10`,{ headers: { 'Authorization': `Bearer ${access_token}` }})
      const users = res.data
      commit('setAllUsers', users)
    },
    removePagingItem({commit}){
      commit('removePagingItem')
    }
  },
  modules: {

  }
})