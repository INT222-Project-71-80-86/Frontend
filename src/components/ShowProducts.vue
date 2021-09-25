<template>
  <nav-bar></nav-bar>
<div>
  <div class="container mx-auto flex items-start flex-wrap pt-4 pb-12 md:flex">
    <div
      class="w-full md:w-1/2 lg:w-1/4 p-6 flex flex-col "
      v-for="item in showproducts"
      :key="item.pid"
    >
  <div>
      <img class="hover:grow hover:shadow-lg zoom w-80 h-80" :src="getImages(item.image)" />
      
      <div class="pt-5 flex items-center justify-between">
        <p class="text-lg font-semibold italic">{{ item.name }}</p>
      </div>
      <p class="text-base font-semibold italic">{{ item.brand.name }}</p>
      
      <p class="text-sm text-gray-400 italic">{{ item.description }}</p>
      <p class="text-base font-semibold italic">Warranty - {{ item.warranty }} years.</p>
      <p class="text-base font-semibold italic">Release Date - {{ item.releaseDate }}</p>
      <p class="text-base font-semibold italic">฿ {{ pricenumber(item.price) }}</p>
      <div class="flex space-x-1 items-center mt-1 mb-1"><span class="text-base font-semibold italic">Color </span>
        <span class="text-xl font-semibold italic"> [ </span>
        <div class="" v-for="c in item.productcolor" :key="c.color.cid">
          <div
          :style="{'background-color': c.color.code}"
            class="rounded-full w-6 h-6 focus:outline-none border-2 border-black" 
          ></div>
        </div>
        <span class="text-xl font-semibold italic"> ] </span>
      </div>
  </div>
      <div class="flex">
        <button
          class="inline-flex items-center justify-center w-10 h-10 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200"
         >
          <!-- <router-link :to="{name: 'edit', params: {id: showproducts.pid}}" class="btn btn-success">
             Edit <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5 17l1.006-4.036 3.106 3.105-4.112.931zm5.16-1.879l-3.202-3.202 5.841-5.919 3.201 3.2-5.84 5.921z" />
          </svg>
        </router-link> -->
        </button>
        <button
          class="inline-flex items-center justify-center w-10 h-10 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200"
          @click="deleteProduct(item.pid)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"
            />
          </svg>
        </button>
      </div>
    </div>
   
    <!-- Paging -->
  </div>
  <div id="paging" class="mb-5 -mt-8">
          <div class="flex space-x-5 justify-center">
            <button @click="fetchProduct(i)" v-for="i in pageTotal" :key="i" 
                    class=" w-10 h-8 align-middle bg-gray-400" 
                    :class="{ 'bg-green-400': checkCurrentPage(i) }">{{i}}</button>
          </div>   
        </div>
      
          </div>
          <footer-com />
</template>
<script>


export default {
  name: "showProducts",

  data() {
    return {
      urlproduct: "http://localhost:8083/api",
      showproducts: [],
      pageInfo: null,
      brandCode: [],
      colorCode: [],
      pageTotal: null,
      editingProduct: null
    };
  },
  methods: {
    async fetchProduct(pageNo = 1) {
      const res = await fetch(`${this.urlproduct}/product?pageNo=${pageNo-1}`);
      const data = await res.json();
      this.showproducts = data.content;
      this.pageInfo = data.pageable;
      this.pageTotal = data.totalPages;
      this.sortColors(this.showproducts);
      // console.log(this.showproducts)
      // console.log(this.pageInfo)
      // console.log(this.pageTotal)
      // parses JSON response into native JavaScript objects
      return;
    },
    async fetchBrands(){
      const res = await fetch(`${this.urlproduct}/brand`);
      const data = await res.json();
      this.brandCode = data;
      // console.log(this.brandCode)
      // parses JSON response into native JavaScript objects
      return;
    },
      async fetchColors(){
      const res = await fetch(`${this.urlproduct}/color`);
      const data = await res.json();
      this.colorCode = data;
      // console.log(this.colorCode)
      // parses JSON response into native JavaScript objects
      return;
    },
    async deleteProduct(pid){
      if(confirm("Do you really want to delete this product?")){
        try {
          const res = await fetch(`${this.urlproduct}/product/delete/${pid}`, {
            method: 'DELETE'
          });
          if(res.status === 200){
            this.showproducts = this.showproducts.filter((product) => product.pid !== pid)
            alert("Successfully Remove the product")
          } else {
            alert("Error Deleting Product")
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        return
      } 
    },
    // filterBrand(e){
    //   if(this.showproducts=e.brand.bid){
        
    //   }
    // },
    getImages(image){
      return `${this.urlproduct}/file/${image}`
    }, 
    sortColors(product){
      product.forEach(p => {
        p.productcolor.sort(function(a, b){return a.color.cid - b.color.cid});
      });
    },
    checkCurrentPage(i){
    return this.pageInfo.pageNumber+1 == i 
  },     
    // getBrandName(bid){
    //   for (let i = 0; i < this.brandCode.length; i++) {
    //     if(this.brandCode[i].brandid == bid){
    //       return this.brandCode[i].name;
    //     }
    //   }
    // },
     pricenumber(price){
     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  async created() {
    await this.fetchBrands();
    await this.fetchColors();
    await this.fetchProduct();
  }, 
  
 
 
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