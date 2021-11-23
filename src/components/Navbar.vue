<template>

  <div class="flex flex-wrap place-items-center sticky top-0 z-10 shadow-md mb-3">
  <section class="mx-auto ">
      <!-- navbar -->
    <nav class="flex justify-between bg-gray-900 text-white w-screen">
      <div class="px-5 xl:px-12 py-6 flex w-full items-center">
        <router-link to="/"><a class="text-3xl font-bold font-heading hover:text-gray-300 duration-300">
          NPN SHOP
        </a></router-link>
        
        <!-- Nav Links -->
        <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <router-link to="/"><li><a class="hover:text-gray-200" href="#">Home</a></li></router-link>
          <li><a class="hover:text-gray-200" href="#"><dd-nav :mode="'cat'" /></a></li>
          <li><a class="hover:text-gray-200" href="#"><dd-nav :mode="'brand'"/></a></li>
          <router-link :to="{ name: 'showproducts', params: { type: 'all', value: '1' } }"><li><a class="hover:text-gray-200" href="#">Collections</a></li></router-link>
          <router-link to="/About"><li><a class="hover:text-gray-200" href="#">Team</a></li></router-link>
        </ul>
        <!-- Header Icons -->
        <div class="hidden xl:flex items-center space-x-5">
          <input
                class="rounded-full px-6 py-2 text-gray-700 focus:outline-none"
                @keyup.enter="pushProduct('query')"
                id="search"
                type="text"
                placeholder="Search"
                v-model="searchProduct"
              />
              <div>
               
              </div>
          <button v-if="role == 'ROLE_CUSTOMER' && currentRoute != 'Order'" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" data-bs-target="#cartDetailDropdown">
            <a class="flex items-center hover:text-gray-200"  href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="flex absolute -mt-5 ml-4">
                <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </a>
          </button>
          <the-cart-dropdown />
          <!-- Sign In / Register      -->
          <a class="flex items-center hover:text-gray-200 dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          </a>
          <ul id="menu"
              class="dropdown-menu dropdown-menu-dark mt-2 tracking-widest"
              aria-labelledby="dropdownMenuButton1"
            >
            <router-link to="/Profile" v-if="user">
                <li>
                  <a class="text-white dropdown-item font-semibold"><span class="font-semibold">My Profile</span></a>
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
              <router-link to="/AdminPage" v-if="role == 'ROLE_ADMIN'">
                <li>
                  <a class="dropdown-item font-semibold"><span class="text-white">ShopManage</span></a>
                </li>
              </router-link>
              <hr class="dropdown-divider" v-if="role == 'ROLE_ADMIN'" />
              <router-link to="/Addproduct" v-if="role == 'ROLE_ADMIN' || role == 'ROLE_STAFF'">
                <li>
                  <a class="text-white dropdown-item font-semibold">AddProduct</a>
                </li>
              </router-link>
              <hr class="dropdown-divider" v-if="role == 'ROLE_ADMIN' || role == 'ROLE_STAFF'"/>
              <router-link to="/Login" v-if="user" @click="logout" >
                <li>
                  <a class="dropdown-item font-semibold "><span class="text-red-500 font-semibold">Logout</span></a>
                </li>
              </router-link>
            </ul>
        </div>
      </div>
      <!-- Responsive navbar -->
      <a class="xl:hidden flex mr-6 items-center" href="#">
        <router-link to="/Cart">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg></router-link>
        <span class="flex absolute -mt-5 ml-4">
          <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
          </span>
        </span>
      </a>
      <button class="self-center mr-12 xl:hidden cursor-pointer" @click="BurgerOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
      </button>
    </nav>
  </section>
</div>
<div class="navbar-menu relative z-50" v-if="OpenBurger">
		<div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
		<nav class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
			<div class="flex items-center mb-8">
        <router-link to="/" class="mr-auto text-3xl font-bold leading-none">
					NPN SHOP
				</router-link>
				<button class="navbar-close" @click="BurgerClose">
					<svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>
			<div>
				<ul>
          <input
                class="px-6 py-2 text-gray-700 focus:outline-none border-2 focus:border-blue-500 mb-3"
                @keyup.enter="pushProduct('query')"
                id="search"
                type="text"
                placeholder="Search"
                v-model="searchProduct"
              />
					<router-link to="/Profile" v-if="user"><li class="mb-1">
						<a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">My Profile</a>
					</li></router-link>
					<ul class="mb-1 dropdown">
						<li class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded cursor-pointer">Category
                          <ul>
                <li v-for="category in categories" :key="category.catid" class="hover:bg-gray-500"><a><span class="hover:text-red-600">{{category.name}}</span></a>
                    <ul >
                        <li v-for="brand in brands" :key="brand.bid" class="hover:bg-gray-500">
                          <router-link :to="{name: 'showproducts', params: {type: category.catid, value: brand.bid}}">{{brand.name}}</router-link></li>
                    </ul>
                </li>
            </ul>
            </li>
					</ul>
					<router-link :to="{ name: 'showproducts', params: { type: 'all', value: '1' } }"><li class="mb-1">
						<a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Collections</a>
					</li></router-link>
          <router-link to="/Addproduct" v-if="role == 'ROLE_STAFF' || role == 'ROLE_ADMIN'">
					<li class="mb-1">
						<a class="flex p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" fill="currentColor" class="bi bi-plus plus-sign" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>Add Product</a>
					</li></router-link>
          <router-link to="/Addcolor" v-if="role == 'ROLE_STAFF' || role == 'ROLE_ADMIN'">
					<li class="mb-1">
						<a class="flex p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"><svg xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" fill="currentColor" class="bi bi-plus plus-sign" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>Add Color</a>
					</li></router-link>
          <router-link to="/Addbrand" v-if="role == 'ROLE_STAFF' || role == 'ROLE_ADMIN'">
					<li class="mb-1">
						<a class="flex p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" fill="currentColor" class="bi bi-plus plus-sign" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
              Add Brand</a>
					</li></router-link>
          <router-link to="/About">
					<li class="mb-1">
						<a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Team</a>
					</li></router-link>
           

				</ul>
			</div>
			<div class="mt-auto">
				<div class="pt-6">
					<router-link to="/Login" v-if="!user"><a class="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl">Sign In</a></router-link>
					<router-link to="/Register" v-if="!user"><a class="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl">Sign Up</a></router-link>
					<router-link to="/Login" v-if="user"><a class="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-red-600 hover:bg-red-700  rounded-xl">LOGOUT</a></router-link>
				</div>
				<p class="my-4 text-xs text-center text-gray-400">
					
				</p>
			</div>
		</nav>
	</div>
 
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import TheCartDropdown from './TheCartDropdown.vue'

export default {
  name: 'Navbar',
  components: {
    TheCartDropdown
  },
  data(){
    return {
      searchProduct: "",
      OpenBurger: false,
    }
  },
  methods: {
    pushProduct(searchType){
      this.$router.push({ name: 'showproducts', params: {type: searchType , value: this.searchProduct}})
    },
    logout(){
      this.$store.dispatch("removeUser")
    },
    BurgerOpen(){
      this.OpenBurger = true
    },
    BurgerClose(){
      this.OpenBurger = false
    }
  },
  
  setup(){
    const store = useStore();
    store.dispatch('fetchAllBrands')
    store.dispatch('fetchAllCategories')
    return {
      user: computed(() => store.state.user),
      role: computed(() => store.state.role),
      brands: computed(() => store.state.brands),
      categories: computed(() => store.state.categories)
    }
  },
  computed: {
    currentRoute(){
      return this.$route.name
    }
  }
}
</script>
<style scoped>
  .plus-sign {
    margin-top: 2px;
  }
  .dropdown {
          margin-top: -10px;
        }

        .dropdown li {
            position: relative;
        }

        .dropdown li a {
            color: #ffffff;
            text-align: center;
            text-decoration: none;
            display: block;
            padding: 10px;
        }

        .dropdown li ul {
            position: absolute;
            top: 100%;
            margin: 0;
            padding: 0;
            list-style: none;
            display: none;
            background-color: #262626;
        }

        .dropdown li ul li a {
            text-align: left;
            color: #ffffff;
            font-size: 16px;
            padding: 10px;
            display: block;
            white-space: nowrap;
        }

        .dropdown li ul li a:hover {
            color: #ff0000;
        }

        .dropdown li ul li ul {
            left: 100%;
            top: 0;
        }

        ul li:hover>ul {
            display: block;
        }
  
</style>
