<template>
  <nav-bar />
<body class="bg-gray-900 h-full">
  
<div class="container-fluid mt-2 mb-3" v-if="product">
    <div class="row no-gutters">
        <div class="col-md-5 pr-2 mt-3 mb-3">
            <!-- <div class="card w-full"> -->
            <div class="card w-2/5 fixed">
                <div class="demo">
                    <div class=""><img :src="getImageUrl(product.image)" /></div>
                </div>
            </div>
            <!-- <base-review v-if="reviews" :reviews="reviews"></base-review> -->
        </div>
        <div class="col-md-7">
            <div class="card mt-3 ">
            <div class="tracking-wider space-y-1">
                <div class="d-flex flex-row align-items-center">
                   <div class="space-y-2 text-center "> <span class="font-bold text-3xl italic">— {{ product.name }} —</span> 
                   </div>
                </div>
                <h1 class="font-semibold text-xl">{{ pricenumber(product.price) }} THB.-</h1>
                 <div class="flex"><span class="mt-1 mr-2 text-xl tracking-wide">RATING:</span> <star-rating v-if="reviews && calAvgRating > 0" :rating="calAvgRating" :increment="0.01" :read-only="true" :star-size="24" :show-rating="false" :glow="1"></star-rating><p v-else class="pt-1 text-xl">No Rating</p></div>     
                <hr class="mt-3 mb-2" />
                </div>
                
                <div class="product-description tracking-wider">
                    <div class="mt-2">
                        <!-- <span class="font-semibold">— Description —</span> -->
                        <p class="mt-1 text-lg italic">{{ product.description }}</p>
                    </div>
                     <!-- <div class="flex space-x-2 space-y-1"><span class="font-semibold mt-2">Color — </span> 
                        <div class="flex items-center" v-for="c in product.productcolor" :key="c.cid">
                                <button class=" w-7 h-7 border-2 border-transparent duration-300 focus:ring-2 focus:ring-red-600 focus:border-transparent" :style="{ backgroundColor: c.color.code }"></button>
                            </div>
                     </div> -->
                    <div class="flex-row align-items-center mt-2"> 
                        <span class="text-xs font-semibold">Category: </span> <span class="text-xs"> {{ product.category.name }} </span><br />
                        <span class="text-xs font-semibold">Brand: </span> <span class="text-xs"> {{ product.brand.name }} </span> <br />
                        <span class="text-xs font-semibold">Release Date:</span> <span class="text-xs tracking-widest">{{product.releaseDate}}</span> <br /> 
                        <span class="text-xs font-semibold">Warranty:</span> <span class="tracking-widest text-xs">{{product.warranty}} year</span>
                    </div>
                    <div class="flex font-semibold mt-2 text-lg" v-if="productColorFilter(product.productcolor).length > 0 && product.deleted != 1">
                        <span>Color</span>
                        <span v-if="product.productcolor.length > 1">s</span>
                        <span v-if="selectedProductColor.color.cid > 0">: {{ selectedProductColor.color.name }}</span>
                    </div>
                    <div v-if="product.deleted != 1" class="flex space-x-2 mb-2">
                        <div class="flex items-center" v-for="c in productColorFilter(product.productcolor)" :key="c.cid">
                            <button @click="selectColor(c)" class=" w-10 h-10 border-2 border-transparent duration-300" 
                                    :class="{'ring-2 ring-red-600 border-transparent': (selectedProductColor.color.cid == c.color.cid)}" :style="{ backgroundColor: c.color.code }"></button>
                        </div>
                     </div>
                     <div id="product-amount" v-if="selectedProductColor.color.cid > 0 && role == 'ROLE_CUSTOMER' && product.deleted != 1">
                         <p class="font-semibold">Amount</p>
                         <input class="w-1/6 h-10 border rounded px-2" type="number" v-model="selectQuantity" min="1" :max="selectedProductColor.amount">
                         <div v-if="invalidQuantity" class="text-red-500">The amount must be <span v-if="selectedProductColor.amount == 1">1</span><span v-else>in range of 1-{{selectedProductColor.amount}}</span></div>
                     </div>
                     <div v-if="product.deleted == 1"> <button disabled class="border-2 cursor-not-allowed border-black pl-5 pr-5 pt-2 pb-2 cart mt-3 bg-red-500 text-white font-bold duration-500 uppercase">Product deleted</button>  </div>
                     <div v-else-if="productColorFilter(product.productcolor).length<1"> <button disabled class="border-2 cursor-not-allowed border-black pl-5 pr-5 pt-2 pb-2 cart mt-3 bg-red-500 text-white font-bold duration-500 uppercase">Out of stock</button>  </div>
                     <div v-else-if="!role"> <button @click="sendToLogin" class="border-2 border-black pl-5 pr-5 pt-2 pb-2 cart mt-3 hover:bg-gray-300 hover:text-black font-bold duration-500 uppercase">Login to order</button>  </div>
                     <div v-else-if="role == 'ROLE_CUSTOMER' && !inCart"> <button @click="addToCart" class="border-2 border-black pl-5 pr-5 pt-2 pb-2 cart mt-3 hover:bg-red-600 hover:text-white font-bold duration-500 uppercase">Add to Cart</button>  </div>
                     <div v-else-if="role == 'ROLE_CUSTOMER' && inCart"> <button disabled class="border-2 cursor-not-allowed border-gray-300 pl-5 pr-5 pt-2 pb-2 cart mt-3 font-bold uppercase bg-gray-300 text-gray-500">Already in cart</button>  </div>
                    <div v-if="invalidColor" class="text-red-500">Please select the color</div>
                    <div class="d-flex flex-row align-items-center mt-3"> 
                        <router-link :to="{ name: 'showproducts', params: { type: 'all', value: '1' } }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-left-square-fill duration-500" viewBox="0 0 16 16">
                                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
                            </svg>
                        </router-link>
                        <div class="d-flex flex-column ml-1 comment-profile ">
                            <div class="shopping-more"> </div> <span class="username">NPN | SHOP</span> <small class="followers animate-bounce">Shopping more...</small>
                        </div>
                    </div>
                   
                </div>
            </div>
            <!-- Similar item-->
            <!-- <div class="card mt-2 border text-center"> <span>Similar items:</span>
                <div class="similar-products mt-2 d-flex flex-row justify-center space-x-3">
                    <div class="card border p-1" style="width: 9rem;margin-right: 3px;"> <img src="https://i.imgur.com/KZpuufK.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title">$1,999</h6>
                        </div>
                    </div>
                    <div class="card border p-1" style="width: 9rem;margin-right: 3px;"> <img src="https://i.imgur.com/GwiUmQA.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title">$1,699</h6>
                        </div>
                    </div>
                    <div class="card border p-1" style="width: 9rem;margin-right: 3px;"> <img src="https://i.imgur.com/c9uUysL.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title">$2,999</h6>
                        </div>
                    </div>
                    <div class="card border p-1" style="width: 9rem;margin-right: 3px;"> <img src="https://i.imgur.com/kYWqL7k.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title">$3,999</h6>
                        </div>
                    </div>
                    <div class="card border p-1" style="width: 9rem;"> <img src="https://i.imgur.com/DhKkTrG.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title">$999</h6>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- end similar items -->
            <div class="card mt-2 mb-3">
                
            
            <span class="mb-2 text-xl font-bold uppercase tracking-wide">Share Your Review:</span>
            <base-add-review v-if="user && role && reviews" :reviews="reviews" :user="user" :role="role" @userreview="makeReview"></base-add-review>
            <div v-else> <!-- redesign this part tee kub --> 
                <p>Please <router-link :to="{ name: 'login'}">Login</router-link> First</p>
            </div>
            <div>
                <base-review v-if="reviews" :reviews="reviews" :user="user" @delete="deleteReview"></base-review>
            </div>
          </div>
        </div>
      </div>
    </div>
    
<!-- <star-rating :rating="calAvgRating" :increment="0.01" :read-only="true" :star-size="24" :show-rating="false" :glow="1"></star-rating> -->
<!--<div><p> name - {{product.name}} </p></div>
<div><p> desc - {{product.description}} </p></div>
<div><p> warranty - {{product.warranty}} </p></div>
<div><p> release date - {{product.releaseDate}} </p></div>
<div><p> quantity/amount - {{product.amount}} </p></div>
<div><p> category - {{product.category.name}} </p></div>
<div><p> brand - {{product.brand.name}} </p></div>
<div><p> price - {{ pricenumber(product.price) }} </p></div>
<div class="flex items-center space-x-2 space-y-1" v-for="c in product.productcolor" :key="c.cid">
     <div class="color-circle rounded-full w-7 h-7" :style="{ backgroundColor: c.color.code }"></div>
        <span class="uppercase md:text-sm text-xs text-black text-light font-semibold w-48">{{ c.color.name }}</span>
</div>
<div><img :src="getImageUrl(product.image)" /></div>-->
</body>
</template>
<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import axios from "axios";
import StarRating from 'vue-star-rating';
import BaseReview from '../components/BaseReviewV2.vue';
import BaseAddReview from '../components/BaseAddReviewV2.vue'
export default {
  components: { BaseReview, StarRating, BaseAddReview },
  name: "singleProduct",
  props: ["singleProd"],
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
      product: null,
      avgRating: 0,
      reviews: null,
      selectedProductColor: {id: {cid: -1}, color: {cid: -1}, amount: -1},
      selectQuantity: 1,

      invalidColor: false,
      invalidQuantity: false,

      inCart: false
    };
  },
  methods: {
    resetProperties(){
      this.product = null,
      this.avgRating = 0,
      this.reviews = null,
      this.selectedProductColor = {id: {cid: -1}, color: {cid: -1}, amount: -1},
      this.selectQuantity = 1,

      this.invalidColor = false,
      this.invalidQuantity = false,

      this.inCart = false
    },
    selectColor(color){
        this.selectedProductColor = color
        this.selectQuantity = 1
        this.invalidColor = false
        this.invalidQuantity = false
        this.checkAlreadyInCart()
    },
    addToCart(){
        let productColor = this.selectedProductColor
        if(productColor.color.cid <= 0){
            this.invalidColor = true
            return
        }
        if(this.selectQuantity <= 0 || this.selectQuantity > productColor.amount){
            this.invalidQuantity = true
            return
        }
        this.invalidColor = false
        this.invalidQuantity = false
        let addProduct = {
            product: this.product,
            amount: this.selectQuantity,
            productColor: productColor
        }
        this.$store.dispatch("addItemToCart", addProduct)
        this.checkAlreadyInCart()
    },
    sendToLogin(){
        this.$router.push({ name: 'login'})
    },
    async fetchProduct(pid) {
        let self = this
      const res = await axios.get(`${this.backend_url}/product/${pid}`).catch(function (error) {
          alert(error.response.data.message)
          self.$router.push({ name: 'showproducts', params: { type: 'all', value: '1' } })
      })
      this.product = res.data;
    },
      getImageUrl(image) {
      return `${this.backend_url}/file/${image}`;
    },
     pricenumber(price){
     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }, 
    async fetchReviews(pid) {
      const res = await axios.get(`${this.backend_url}/review/${pid}`);
      this.reviews = res.data;
    },
    makeReview(review){
        let newreview={reviewid:review.reviewid, review:review.review, rating:review.rating, product:{pid: this.singleProd} }
        this.addReview(newreview)
    },
    async addReview(r) {
        r.id = {uid: this.user.uid, pid: this.singleProd}
            const access_token = localStorage.getItem("access_token")
            const res = await axios.post(`${this.backend_url}/review/save`, r, { headers: { 'Authorization': `Bearer ${access_token}` } } ).catch(function (error) {
                if (error) {
                    alert("Unexpected Error occur. Cannot add new review.")
                    return
                }
            })
            const review = res.data
            if (res.status != 200) {
                alert("An Unexpected Error Occured. Response Status: " + res.status)
            } else {
                this.reviews.push(review)
            }
    },
    async deleteReview(r){
            const access_token = localStorage.getItem("access_token")
            const res = await axios.delete(`${this.backend_url}/review/delete`, { headers: { 'Authorization': `Bearer ${access_token}` } , data: { pid: r.pid, uid: r.uid}} ).catch(function (error) {
                if (error) {
                    alert(error.response.data.message)
                    console.log(error.response)
                    return
                }
            })
            if (res != undefined && res.status == 200) {
                const data = res.data
                alert("Successfully delete review.")
                this.reviews = this.reviews.filter(r => !(r.id.pid == data.id.pid && r.id.uid == data.id.uid))
            } 
    },
    productColorFilter(productColor){
        return productColor.filter( pc => pc.amount > 0)
    },
    checkAlreadyInCart(){
        let check = false
        this.cart.forEach(item => {
            if(item.productColor.id.pid == this.selectedProductColor.id.pid && item.productColor.id.cid == this.selectedProductColor.id.cid){
                check = true
            }
        });
        this.inCart = check
    },
    async updateShowProduct(){
        this.resetProperties()
        const singleProd = this.$route.params.singleProd
        await this.fetchProduct(singleProd)
        await this.fetchReviews(singleProd);
    },
  },

  async created() {
    await this.fetchProduct(this.singleProd);
    await this.fetchReviews(this.singleProd);
  },
  computed: {
      calAvgRating(){
          let filterReviews = this.reviews.filter( s => (s.rating != 0))
          let sum = 0.0
        filterReviews.forEach(review => {
            sum += review.rating
        });
        return sum/filterReviews.length
      },
      
  },
    setup(){
          const store = useStore();
            return {
                    user: computed(() => store.state.user),
                    role: computed(() => store.state.role),
                    cart: computed(() => store.state.cart)
            }
        },
    watch: {
        "$route.params.singleProd"() {
            if(this.$route.name == "singleProduct"){
                this.updateShowProduct()
            }
            
        },
        "$store.state.cart"(){
            this.checkAlreadyInCart()
        }
    },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

body {
    font-family: "Poppins", sans-serif
}
.card {
    background-color: white;
    padding: 14px;
    border: none
}

.demo {
    width: 100%
}

img {
    display: block;
    height: auto;
    width: 100%
}


hr {
    color: #d4d4d4
}

.badge {
    padding: 5px !important;
    padding-bottom: 6px !important
}

.badge i {
    font-size: 10px
}

.profile-image {
    width: 35px
}

.comment-ratings i {
    font-size: 13px
}

.username {
    font-size: 12px
}

.comment-profile {
    line-height: 17px
}

.date span {
    font-size: 12px
}


.followers {
    font-size: 9px;
    color: #d6d4d4
}

.store-image {
    width: 42px
}

.card-body {
    padding: 0.3rem 0.3rem 0.2rem
}

</style>