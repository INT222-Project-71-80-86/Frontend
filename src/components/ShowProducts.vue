<template>
  <nav-bar></nav-bar>
  <!-- test div -->
  <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div
        class="lg:w-4/5 mx-auto flex flex-wrap border-b-2 mt-5 border-gray-800"
        v-for="item in products"
        :key="item.pid"
      >
        <img
          alt="ecommerce"
          class="bg-cover lg:w-80 w-full lg:h-80 h-32 object-cover object-center rounded"
          :src="getImages(item.image)"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <div class="flex space-x-2">
          <h2 class="text-xl title-font text-white tracking-widest uppercase font-extrabold">{{ item.brand.name }}</h2>
          <h2 class="text-xl title-font text-white tracking-widest uppercase font-light">— {{ item.category.name }}</h2>
          </div>
          <h1 class="text-white text-3xl title-font font-medium mb-1 italic">{{ item.name }}</h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              <span class="">
                <span class="font-semibold">Release Date:</span>
                {{ item.releaseDate }}
              </span>
            </span>
            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 space-x-2">
              <span class>
                <span class="font-semibold">Warranty:</span>
                {{ item.warranty }} years
              </span>
            </span>
          </div>
          <p class="leading-relaxed">{{ item.description }}</p>
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5 space-x-1">
            <span class="mr-1 font-semibold italic text-white">Color —</span>
            <div class="flex" v-for="c in item.productcolor" :key="c.color.cid">
              <div
                class="border-2 border-gray-800 rounded-full w-6 h-6 focus:outline-none"
                :style="{ 'background-color': c.color.code }"
              ></div>
            </div>
          </div>
          <div class="flex">
            <span
              class="title-font font-medium text-2xl text-white"
            >{{ pricenumber(item.price) }} THB.</span>
            <button
              class="flex ml-auto rounded-full w-10 h-10 bg-gray-800 p-0 border-0  items-center justify-center  hover:bg-indigo-500 duration-500"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>
            </button>
                        <router-link :to="{ name: 'EditProduct', params: { editProduct: item.pid } }">
              <button
                class="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center ml-4 hover:bg-green-500 duration-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
            </router-link>
            <button
              class="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center ml-4 hover:bg-red-500 duration-500"
              @click="deleteProduct(item.pid)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"
                />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>
    <!-- Paging -->
    <div id="paging" class="mb-5 -mt-8">
      <div class="flex space-x-5 justify-center">
        <button
          @click="fetchProduct(i)"
          v-for="i in pageTotal"
          :key="i"
          class="w-10 h-8 align-middle text-white border"
          :class="{ 'bg-green-400': checkCurrentPage(i) }"
        >{{ i }}</button>
      </div>
    </div>
    <!-- End Paging -->
  </section>
  <footer-com />
</template>
<script>

import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: "showProducts",
  props: ['searchProduct'],
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
    };
  },
  methods: {
    fetchProduct(pageNo = 1) {
      if(this.searchProduct){
        this.$store.dispatch('fetchSearchProduct',{q:this.searchProduct,p:pageNo})
      } else {
        this.$store.dispatch('fetchAllProducts', pageNo)
      }
      
      this.currentPage = pageNo;
      return {
        products: computed(() => this.$store.state.products.content)
      } 
    },
    async deleteProduct(pid){
      if(confirm("Do you really want to remove the product?")){
        try {
          const res = await axios.delete(`${this.backend_url}/product/delete/${pid}`)
          if(res.status === 200){
            this.$store.dispatch('fetchAllProducts', this.currentPage)
            alert("Successfully Remove the product")
          } else {
            alert("Error Removing Product")
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        return
      } 
    },
    getImages(image){
      return `${this.backend_url}/file/${image}`
    }, 
    checkCurrentPage(i){
    return this.pageInfo.pageNumber+1 == i 
  },     
     pricenumber(price){
     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  setup(props){
    const store = useStore();
    console.log(props)
    if(props.searchProduct){
      store.dispatch('fetchSearchProduct',{q:props.searchProduct,p:1})
    } else {
      store.dispatch('fetchAllProducts',1)
    }
    
    store.dispatch('fetchAllBrands')
    store.dispatch('fetchAllCategories')

    return {
      products: computed(() => store.state.products.content),
      pageInfo: computed(() => store.state.products.pageable),
      pageTotal: computed(() => store.state.products.totalPages),
      brands: computed(() => store.state.brands),
      categories: computed(() => store.state.categories),
      currentPage: computed(() => store.state.currentPage)
    }
  }
}
</script>

<style scoped>
.zoom {
  transition: transform 0.3s;
}
.zoom:hover {
  transform: scale(1.07);
}
</style>