<template>
  <nav-bar class="z-50" />
<body>
  
<div class="container-fluid mt-2 mb-3">
    <div class="row no-gutters">
        <div class="col-md-5 pr-2 mt-2 mb-3">
            <div class="card w-full">
                <div class="demo">
                    <div class=""><img :src="getImageUrl(product.image)" /></div>
                </div>
            </div>
            <div class="card mt-2">
                <h6>Reviews</h6>
                <div class="d-flex flex-row">
                    <div class="stars"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div> <span class="ml-1 font-weight-bold">4.6</span>
                </div>
                <hr>
                <div class="badges"> <span class="badge bg-dark ">All (230)</span> <span class="badge bg-dark "> <i class="fa fa-image"></i> 23 </span> <span class="badge bg-dark "> <i class="fa fa-comments-o"></i> 23 </span> <span class="badge bg-warning"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <span class="ml-1">2,123</span> </span> </div>
                <hr>
                <div class="comment-section">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-row align-items-center"> <img src="https://i.imgur.com/o5uMfKo.jpg" class="rounded-circle profile-image">
                            <div class="d-flex flex-column ml-1 comment-profile">
                                <div class="comment-ratings"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div> <span class="username">Lori Benneth</span>
                            </div>
                        </div>
                        <div class="date"> <span class="text-muted">2 May</span> </div>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-row align-items-center"> <img src="https://i.imgur.com/tmdHXOY.jpg" class="rounded-circle profile-image">
                            <div class="d-flex flex-column ml-1 comment-profile">
                                <div class="comment-ratings"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div> <span class="username">Timona Simaung</span>
                            </div>
                        </div>
                        <div class="date"> <span class="text-muted">12 May</span> </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-7">
            <div class="card mt-10 ">
            <div class="tracking-wider mb-2">
                <div class="d-flex flex-row align-items-center">
                    <div class="p-ratings">** Wating for Rating ** </div>
                </div>
                <div class="border-b"> <span class="font-weight-bold"> {{ product.name }} </span> <span> | </span> <span> {{ product.category.name }} </span><span> | </span> <span> {{ product.brand.name }} </span>
                    <h4 class="font-weight-bold">{{ pricenumber(product.price) }} THB.-</h4>
                </div>
                </div>
                
                <div class="product-description">
                    <div class="flex space-x-2 space-y-1"><span class="font-weight-bold mt-2">Color — </span> 
                        <div class="flex items-center" v-for="c in product.productcolor" :key="c.cid">
                                <div class="color-circle rounded-full w-7 h-7" :style="{ backgroundColor: c.color.code }"></div>
                            </div>
                                </div>
                    <div class="my-color">  </div>
                    <div class=" flex-row align-items-center"> <i class="fa fa-calendar-check-o"></i> <span>Release Date: {{product.releaseDate}} </span><span> | </span> <span>Warranty: {{product.warranty}} </span></div>
                    <div class="mt-2"> <span class="font-weight-bold">— Description —</span>
                        <p>— {{ product.description }}</p>
                       
                    </div>
                    <div class="mt-2"> <span class="font-weight-bold">STORE</span> </div>
                    <div class="d-flex flex-row align-items-center"> <router-link :to="{ name: 'showproducts', params: { type: 'all', value: '1' } }"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
</svg></router-link>
                        <div class="d-flex flex-column ml-1 comment-profile">
                            <div class="comment-ratings"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div> <span class="username">NPN | SHOP</span> <small class="followers">Shopping more...</small>
                        </div>
                    </div>
                    <div class="buttons "> <button class="btn btn-outline-warning btn-long cart">Add to Cart</button>  </div>
                </div>
            </div>
            <div class="card mt-2"> <span>Similar items:</span>
                <div class="similar-products mt-2 d-flex flex-row">
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
            <div class="card mt-2"> <span>Review:</span>
                text field
            </div>
        </div>
    </div>
</div>
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
export default {
    
    name: 'singleProduct',
    props: ["singleProd"],
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
            product: {},
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
    }
  },
  
  async created() {
    await this.fetchProduct(this.singleProd)
    console.log(this.product)
  },
   
  
  
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

body {
    background-color: #eee;
    font-family: "Poppins", sans-serif
}
.card {
    background-color: #fff;
    padding: 14px;
    border: none
}

.demo {
    width: 100%
}

ul {
    list-style: none outside none;
    padding-left: 0;
    margin-bottom: 0
}

li {
    display: block;
    float: left;
    margin-right: 6px;
    cursor: pointer
}

img {
    display: block;
    height: auto;
    width: 100%
}

.stars i {
    color: #f6d151
}

.stars span {
    font-size: 13px
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

.p-ratings i {
    color: #f6d151;
    font-size: 12px
}

.btn-long {
    padding-left: 35px;
    padding-right: 35px
}

.buttons {
    margin-top: 15px
}

.buttons .btn {
    height: 46px
}

.buttons .cart {
    border-color: #ff7676;
    color: #ff7676
}

.buttons .cart:hover {
    background-color: #e86464 !important;
    color: #fff
}

.buttons .buy {
    color: #fff;
    background-color: #ff7676;
    border-color: #ff7676
}

.buttons .buy:focus,
.buy:active {
    color: #fff;
    background-color: #ff7676;
    border-color: #ff7676;
    box-shadow: none
}

.buttons .buy:hover {
    color: #fff;
    background-color: #e86464;
    border-color: #e86464
}

.buttons .wishlist {
    background-color: #fff;
    border-color: #ff7676
}

.buttons .wishlist:hover {
    background-color: #e86464;
    border-color: #e86464;
    color: #fff
}

.buttons .wishlist:hover i {
    color: #fff
}

.buttons .wishlist i {
    color: #ff7676
}

.comment-ratings i {
    color: #f6d151
}

.followers {
    font-size: 9px;
    color: #d6d4d4
}

.store-image {
    width: 42px
}

.dot {
    height: 10px;
    width: 10px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px
}

.bullet-text {
    font-size: 12px
}

.my-color {
    margin-top: 10px;
    margin-bottom: 10px
}

label.radio {
    cursor: pointer
}

label.radio input {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none
}

label.radio span {
    border: 2px solid #8f37aa;
    display: inline-block;
    color: #8f37aa;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    text-transform: uppercase;
    transition: 0.5s all
}

label.radio .red {
    background-color: red;
    border-color: red
}

label.radio .blue {
    background-color: blue;
    border-color: blue
}

label.radio .green {
    background-color: green;
    border-color: green
}

label.radio .orange {
    background-color: orange;
    border-color: orange
}

label.radio input:checked+span {
    color: #fff;
    position: relative
}

label.radio input:checked+span::before {
    opacity: 1;
    content: '\2713';
    position: absolute;
    font-size: 13px;
    font-weight: bold;
    left: 4px
}

.card-body {
    padding: 0.3rem 0.3rem 0.2rem
}
</style>