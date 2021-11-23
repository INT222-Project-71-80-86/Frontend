<template>
<!-- <div class="hidden xl:flex">
<span v-for="category in categories" :key="category.catid" class="ml-5 md:flex-row items-center text-ms">
    <button  class="dropdown-toggle hover:text-green-500" type="button" id="dropdownMouse" data-bs-toggle="dropdown" aria-expanded="false"><span class="hover:text-green-500 text-md font-bold">{{ category.name }}</span></button>
              <ul class="dropdown-menu dropdown-menu-dark p-2 m-2 -mt-3" aria-labelledby="dropdownMouse">
                <span v-for="brand in brands" :key="brand.bid">
                    <li>
                      <router-link :to="{ name: 'showproducts', params: { type: category.catid, value: brand.bid } }">
                      <a class="text-white dropdown-item font-semibold ">
                      {{ brand.name }}
                      </a>
                      </router-link>
                    </li>
                </span>
              </ul>
</span>
</div> -->
<!-- <div class="xl:hidden cat-menu">
  <p class="cat-hover -mt-3 text-xl cursor-pointer uppercase">Category</p>
  <div class="dropdown-menu hidden z-1 relative">
    <ul v-for="category in categories" :key="category.catid" class="dropdown">
        <li class="text-white text-md font-bold tracking-widest cursor-pointer hover:bg-gray-500 hover:text-white p-1 border-b-2 border-gray-700 hover:border-red-500">{{ category.name }}</li>
        <ul v-for="brand in brands" :key="brand.bid" class="hidden sub-dropdown">
          <li>
            <router-link :to="{name: 'showproducts', params: {type: category.catid, value: brand.bid}}">{{brand.name}}</router-link>
          </li>
        </ul>
    </ul>
  </div>
</div> -->
<ul class="dropdown" v-if="categories && mode == 'cat'">
  <li ><a href="#" class=" text-white "><span class=" duration-300">Category</span></a>
      <ul>
          <li v-for="category in categories" :key="category.catid" class="hover:bg-gray-500">
            <router-link :to="{name: 'showproducts', params: {type: category.catid, value: 0}}">{{category.name}}</router-link>
              <ul >
                  <li v-for="brand in brands" :key="brand.bid" class="hover:bg-gray-500">
                    <router-link :to="{name: 'showproducts', params: {type: category.catid, value: brand.bid}}">{{brand.name}}</router-link></li>
              </ul>
          </li>
      </ul>
  </li>
</ul>

<ul class="dropdown" v-if="brands && mode == 'brand'">
  <li ><a href="#" class=" text-white "><span class=" duration-300">Brand</span></a>
      <ul>
          <li v-for="brand in brands" :key="brand.bid" class="hover:bg-gray-500">
            <router-link :to="{name: 'showproducts', params: {type: 'brand', value: brand.bid}}">{{brand.name}}</router-link>
          </li>
      </ul>
  </li>
</ul>
</template>
<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
    export default{
        name: 'ddnav',
        props: ['mode'],
        data(){
          return{
          openCat: false,
          }
        },
        setup(){
          const store = useStore();
          store.dispatch('fetchAllBrands')
          store.dispatch('fetchAllCategories')
          return {
            brands: computed(() => store.state.brands),
            categories: computed(() => store.state.categories)
    }
        },
        methods: {
          enableCat(){
            this.openCat = true
          },
          disableCat(){
            this.openCat = false
          }
        },
        
    }
</script>

<style scoped>

.dropdown {
          clear: both;
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
            line-height: normal;
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
            color: #ffffff;
        }

        .dropdown li ul li ul {
            left: 100%;
            top: 0;
        }

        ul li:hover>ul {
            display: block;
        }
  
</style>
