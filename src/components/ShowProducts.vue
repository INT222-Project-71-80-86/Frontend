<template>
  <nav-bar></nav-bar>
          <!-- test div -->
          <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap border-b-2 mt-5 border-gray-800" v-for="item in showproducts"
      :key="item.pid">
        <img alt="ecommerce" class="bg-cover lg:w-80 w-full lg:h-80 h-32 object-cover object-center rounded" :src="getImages(item.image)">
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">{{ item.brand.name }}</h2>
          <h1 class="text-white text-3xl title-font font-medium mb-1 italic">{{ item.name }}</h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              
              <span class="ml-3"><span class="font-semibold">Release Date:</span> {{ item.releaseDate }}</span>
            </span>
            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 space-x-2">
            <span class=""> <span class="font-semibold">Warranty: </span> {{ item.warranty }} years </span>
            </span>
          </div>
          <p class="leading-relaxed">{{ item.description }}</p>
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5 space-x-1">
            <span class="mr-3 font-semibold">Color </span>
            <div class="flex" v-for="c in item.productcolor" :key="c.color.cid">
              <div class="border-2 border-gray-800 rounded-full w-6 h-6 focus:outline-none " :style="{'background-color': c.color.code}"></div>
            </div>
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-white">{{ pricenumber(item.price) }} THB.</span>
            <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded duration-500">Add to Cart</button>
            <button class="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center ml-4 hover:bg-red-500 duration-500"  @click="deleteProduct(item.pid)">
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
      </div>
    </div>
    <!-- Paging -->
      <div id="paging" class="mb-5 -mt-8">
          <div class="flex space-x-5 justify-center">
            <button @click="fetchProduct(i)" v-for="i in pageTotal" :key="i" 
                    class=" w-10 h-8 align-middle text-white border " 
                    :class="{ 'bg-green-400': checkCurrentPage(i) }">{{i}}</button>
          </div>   
        </div>
      <!-- End Paging -->
  </section>
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
      const res = await fetch(`${this.urlproduct}/product?pageNo=${pageNo-1}&size=5`);
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
      if(confirm("Do you really want to remove the product?")){
        try {
          const res = await fetch(`${this.urlproduct}/product/delete/${pid}`, {
            method: 'DELETE'
          });
          if(res.status === 200){
            this.showproducts = this.showproducts.filter((product) => product.pid !== pid)
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