<template>
  <!--<div class="border rounded-lg px-4 py-3" >
    <div v-for="review in reviews" :key="review">
        <p>Anonymous</p>
        <div>
          <star-rating :rating="review.rating" :read-only="true" :star-size="24" :show-rating="false" :glow="1"></star-rating>

        </div>
        <p>{{review.review}}</p>
        <div class="w-full border my-2"></div>
    </div>
  </div> -->
  <div class="card mt-2 h-auto" > 
                <h6 class="font-semibold tracking-wider">User Reviews</h6>
                <div class="d-flex flex-row">
                </div>
                <hr class="mt-2 mb-2">
                <div class="badges"> <span class="badge bg-dark ">All Reviews ({{reviews.length}})</span>  </div>
                <hr class="mt-2 mb-2">
                <div class="comment-section mt-2" v-for="review in reviews" :key="review">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-row align-items-center"> <img :src="getLocalImage('user_icon.png')" class="rounded-circle profile-image">
                            <div class="d-flex flex-column ml-1 comment-profile">
                              <star-rating  v-if="review.rating > 0" :rating="review.rating" :read-only="true" :star-size="18" :show-rating="false" :glow="1"></star-rating> 
                                <div class="comment-ratings"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div> <span class="username">{{ review.user.fname }} {{ review.user.lname }}</span>
                                <p class="text-sm container w-96" >{{review.review}}</p>
                            </div>
                        </div>
                      
                        <div class="date flex flex-col align-items-end"> 
                          <button v-if="user && (review.id.uid == user.uid || user.role == 'ROLE_ADMIN')" @click="deleteReview(review.id)">
                            <img :src="getLocalImage('icons/delete_black_24dp.svg')" />
                          </button>
                          <span class="text-muted">{{ toDateTime(review.datetime) }}</span>
                        </div>
                        
                    </div>
                    <hr class="mt-3">
                </div>
            </div>
</template>

<script>
import StarRating from 'vue-star-rating';
export default {  
  name: "BaseReview",
  components: {
    StarRating,
  },
  props: ["reviews", "user"],
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
    };
  },
  methods: {
    toDateTime(dateTime) {
      let m = new Date(dateTime)
      return m.getFullYear() +"/"+ (m.getMonth()+1) +"/"+ m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();
      // return m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
    },
    getLocalImage(filename){
      return require(`@/assets/images/${filename}`)
    },
    async deleteReview(r){
      if(confirm("Do you want to delete this review?")){
        this.$emit('delete', r)
      }
    }
  },
  created() {

  },
  computed:{
    
  }
};
</script>


<style>
</style>