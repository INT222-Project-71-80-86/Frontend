<template>
  <nav class="sticky top-0 pl-6 pr-6 border-b shadow-md mb-4 bg-white w-screen">
    <div class="flex justify-between items-center">
      <div class="flex justify-between items-center w-80">
      <router-link to="/">
        <h1 class="ml-2 pr-6 border-r-2 text-2xl font-bold text-black">NPN SHOP</h1>
      </router-link>
      <router-link :to="{ name: 'showproducts', params: { type: 'all', value: '1' } }">
            <a>
              <span class="text-md font-semibold hover:text-green-500 ml-4 md:w-auto text-2xl">PRODUCTS</span>
            </a>
            </router-link>
            </div>
      <div class="flex justify-between flex-grow md:flex md:w-auto">
        <div class="flex justify-between ml-6 items-center">
          <ul class="space-x-10 pr-6 font-bold">
           <ddnav />
          </ul>
        </div>
        <div class="md:flex space-x-6 sm:flex">
          <div class="p-8">
            <div class="bg-white flex items-center rounded-full shadow-sm -mt-3 border">
              <input
                class="rounded-l-full w-full px-6 py-3 text-gray-700 leading-tight focus:outline-none"
                @keyup.enter="pushProduct('query')"
                id="search"
                type="text"
                placeholder="Search"
                v-model="searchProduct"
              />
              <div>
                <button
                  class="bg-blue-500 text-white rounded-full mr-3 hover:bg-blue-400 focus:outline-none w-10 h-10 flex items-center justify-center"
                  @click="pushProduct('query')"
                >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                      />
                    </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-2">
            <div id="cart">
              <div id="cartIcon" v-if="role == 'ROLE_CUSTOMER' && currentRoute != 'Order'" style="width:50px ;">
                  <!-- <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cartDetailModal"><img src="@/assets/images/icons/shopping_cart_black_24dp.svg"/></button> -->
                  <button type="button" class="btn" data-bs-toggle="dropdown" data-bs-auto-close="outside" data-bs-target="#cartDetailDropdown"><img src="@/assets/images/icons/shopping_cart_black_24dp.svg"/></button>
                  <the-cart-dropdown /> 
              </div>
            </div>
          </div>
          <!-- dropdown button account -->
          <div class=" dropdown mt-4">
            <button
              class="dropdown-toggle mr-5"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </button>
            <ul
              class="dropdown-menu dropdown-menu-dark p-2 m-2 -mt-3"
              aria-labelledby="dropdownMenuButton1"
            >
            <router-link to="/Profile" v-if="user">
                <li>
                  <a class="text-white dropdown-item font-semibold"><span class="text-green-300 font-semibold">Profile</span></a>
                </li>
              </router-link>
             <li>
                <hr class="dropdown-divider" v-if="user"/>
              </li>
              <router-link to="/" v-if="!user">
                <li>
                  <a class="text-white dropdown-item font-semibold"><span class="text-green-300 font-semibold">Register</span></a>
                </li>
              </router-link>
              <li>
                <hr class="dropdown-divider" v-if="!user"/>
              </li>
              <router-link to="/Login" v-if="!user">
                <li>
                  <a class="text-white dropdown-item font-semibold">Login</a>
                </li>
              </router-link>
              <li v-if="!user">
                <hr class="dropdown-divider" />
              </li>
              <router-link to="/order" v-if="role == 'ROLE_CUSTOMER'">
                <li>
                  <a class="text-white dropdown-item font-semibold">Order</a>
                </li>
              </router-link>
              <li v-if="role == 'ROLE_CUSTOMER'">
                <hr class="dropdown-divider" />
              </li>
              <router-link to="/Addproduct" v-if="role == 'ROLE_STAFF' || role == 'ROLE_ADMIN'">
                <li>
                  <a class="text-white dropdown-item font-semibold">Addproduct</a>
                </li>
              </router-link>
              <hr class="dropdown-divider" v-if="role == 'ROLE_STAFF' || role == 'ROLE_ADMIN'" />
              <router-link to="/Addcolor" v-if="role == 'ROLE_ADMIN'">
                <li>
                  <a class="text-white dropdown-item font-semibold">Addcolor</a>
                </li>
              </router-link>
              <hr class="dropdown-divider" v-if="role == 'ROLE_ADMIN'"/>
              <router-link to="/Addbrand" v-if="role == 'ROLE_ADMIN'">
                <li>
                  <a class="text-white dropdown-item font-semibold">Addbrand</a>
                </li>
              </router-link>
              <li>
                <hr class="dropdown-divider" v-if="role == 'ROLE_ADMIN'"/>
              </li>
              <router-link to="/About" >
                <li>
                  <a class="text-white dropdown-item font-semibold">About</a>
                </li>
              </router-link>
              <li v-if="user">
                <hr class="dropdown-divider"/>
              </li>
              <router-link to="/Login" v-if="user" @click="logout" >
                <li>
                  <a class="dropdown-item font-semibold "><span class="text-red-500 font-semibold">Logout</span></a>
                </li>
              </router-link>
            </ul>
          </div>
          <!-- end dropdown button account -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import ddnav from './ddnav.vue'
import TheCartDropdown from './TheCartDropdown.vue'

export default {
  components: { 
    ddnav,
    TheCartDropdown
  },
  name: 'Navbar',
  data(){
    return {
      searchProduct:""
    }
  },
  methods: {
    pushProduct(searchType){
      this.$router.push({ name: 'showproducts', params: {type: searchType , value: this.searchProduct}})
    },
    logout(){
      this.$store.dispatch("removeUser")
    },
  },
  setup(){
    const store = useStore();
    return {
      user: computed(() => store.state.user),
      role: computed(() => store.state.role)
    }
  },
  computed: {
    currentRoute(){
      return this.$route.name
    }
  }
}
</script>