import { createStore } from 'vuex'
import axios from 'axios'

const backend_url = process.env.VUE_APP_BACKEND_URL

export default createStore({
  state: {
    products: [],
    brands: [],
    colors: [],
    categories: [],
    currentPage: 1
  },
  mutations: {
    setProducts(state, p){
      state.products = p.product
      state.currentPage = p.pages
      console.log(state.products)
      console.log(p)
    },
    setBrands(state, brands){
      state.brands = brands
    },
    setColors(state, colors){
      state.colors = colors
    },
    setCategories(state, categories){
      state.categories = categories
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
    async fetchAllColors({commit}){
      const res = await axios.get(`${backend_url}/color`)
      commit('setColors', res.data)
    },
    async fetchAllCategories({commit}){
      const res = await axios.get(`${backend_url}/cats`)
      commit('setCategories', res.data)
    },
    async fetchSearchProduct({commit},search){
      const res = await axios.get(`${backend_url}/product/query?searchValue=${search.q}&pageNo=${search.p-1}`)
      const product = res.data
      const pages = search.p
      console.log(product)
      commit('setProducts',{product, pages})
    }
  },
  modules: {

  }
})