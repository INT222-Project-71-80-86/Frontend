<template>
  <nav-bar class="z-50" />
<body class="bg-gray-900 h-full">
  
<div class="container-fluid mt-2 mb-3" v-if="product">
    <div class="row no-gutters">
        <div class="col-md-5 pr-2 mt-2 mb-3">
            <div class="card w-full">
                <div class="demo">
                    <div class=""><img :src="getImageUrl(product.image)" /></div>
                </div>
            </div>
            <base-review v-if="reviews" :reviews="reviews"></base-review>
        </div>
        <div class="col-md-7">
            <div class="card mt-3 ">
            <div class="tracking-wider space-y-1">
                <div class="d-flex flex-row align-items-center">
                    <div class="flex"><span class="mt-1 mr-2 text-xl tracking-wide">RATING:</span> <star-rating v-if="reviews" :rating="calAvgRating" :increment="0.01" :read-only="true" :star-size="24" :show-rating="false" :glow="1"></star-rating></div>
                </div>
                <div class="space-y-2 text-center "> <span class="font-bold text-xl italic">— {{ product.name }} —</span> <span> | </span> <span class="text-gray-600"> {{ product.category.name }} </span><span> | </span> <span class="text-gray-600"> {{ product.brand.name }} </span>
                    <h1 class="font-semibold text-right">{{ pricenumber(product.price) }} THB.-</h1>
                </div>
                <hr class="mt-3 mb-2" />
                </div>
                
                <div class="product-description tracking-wider">
                    <div class="flex space-x-2 space-y-1"><span class="font-semibold mt-2">Color — </span> 
                        <div class="flex items-center" v-for="c in product.productcolor" :key="c.cid">
                                <div class="color-circle rounded-full w-7 h-7 border-2 border-transparent hover:border-gray-900 duration-300" :style="{ backgroundColor: c.color.code }"></div>
                            </div>
                                </div>
                    <div class="flex-row align-items-center mt-2"> <span class="font-semibold">Release Date:</span> <span class="text-sm tracking-widest">{{product.releaseDate}}</span> <span> | </span> <span class="font-semibold">Warranty:</span> <span class="tracking-widest text-sm">{{product.warranty}} year</span></div>
                    <div class="mt-2"> <span class="font-semibold">— Description —</span>
                        <p class="text-center">{{ product.description }}</p>
                       
                    </div>
                    <div class="mt-2"> <span class="font-weight-bold">STORE</span> </div>
                    <div class="d-flex flex-row align-items-center"> <router-link :to="{ name: 'showproducts', params: { type: 'all', value: '1' } }"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-left-square-fill duration-500" viewBox="0 0 16 16">
  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
</svg></router-link>
                        <div class="d-flex flex-column ml-1 comment-profile">
                            <div class="shopping-more"> </div> <span class="username">NPN | SHOP</span> <small class="followers animate-bounce">Shopping more...</small>
                        </div>
                    </div>
                    <div> <button class="border-2 border-black pl-5 pr-5 pt-2 pb-2 cart mt-3 hover:bg-green-400 hover:text-white duration-500">Add to Cart</button>  </div>
                </div>
            </div>
            <!--Similar item-->
            <div class="card mt-2 border text-center"> <span>Similar items:</span>
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
            </div>
            <!-- end similar items -->
            <div class="card mt-2 mb-3">
                
            
            <span class="mb-2 text-xl font-bold uppercase tracking-wide">Share Your Review:</span>
            <base-add-review v-if="user && role && reviews" :reviews="reviews" :user="user" :role="role" @userreview="makeReview"></base-add-review>
            
            <div>
                
                
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
import axios from "axios";
import StarRating from 'vue-star-rating';
import BaseReview from '../components/BaseReviewV2.vue';
import BaseAddReview from '../components/BaseAddReviewV2.vue'
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

export default {
  components: { BaseReview, StarRating, BaseAddReview },
  name: "singleProduct",
  props: ["singleProd"],
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
      product: null,
      avgRating: 0,
      reviews: null
    };
  },
    methods: {
        async fetchProduct(pid) {
      const res = await axios.get(`${this.backend_url}/product/${pid}`);
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
  }, 

  async created() {
    await this.fetchProduct(this.singleProd)
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
      }
  },
  setup(){
    const store = useStore();
    return {
    user: computed(() => store.state.user),
    role: computed(() => store.state.role)
    }
  } 
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