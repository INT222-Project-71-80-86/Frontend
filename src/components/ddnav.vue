<template>

<span v-for="category in categories" :key="category.catid" class="ml-10">
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

</template>
<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
    export default{
        name: 'ddnav',
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
        }
    }
</script>