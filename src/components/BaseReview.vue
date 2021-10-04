<template>
  <base-add-review @userreview="makeReview"></base-add-review>
  <div class="border rounded-lg px-4 py-3" >
    <div v-for="review in reviews" :key="review">
        <p>Anonymous</p> <!-- For Username -->
        <div>
          <star-rating :rating="review.rating" :read-only="true" :star-size="24" :show-rating="false" :glow="1"></star-rating>
          <!-- <span class="material-icons" v-for="i in 5" :key="i" :class="[i <= review.rating ? 'text-yellow-400': 'text-gray-500']">star</span> -->
        </div>
        <p>{{review.review}}</p>
        <div class="w-full border my-2"></div>
    </div>
  </div>
</template>

<script>
import BaseAddReview from './BaseAddReview.vue';
import StarRating from 'vue-star-rating';
import axios from "axios";
export default {  
  name: "BaseReview",
  components: {
    StarRating,
    BaseAddReview
  },
  props: ["pid"],
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
      reviews: [],
    };
  },
  methods: {
    async fetchReviews(pid) {
      const res = await axios.get(`${this.backend_url}/review/${pid}`);
      this.reviews = res.data;

      this.$emit("calculate",this.reviews)
    },
    makeReview(review){
        let newreview={reviewid:review.reviewid, review:review.review, rating:review.rating, product:{pid: this.pid} }
        this.addReview(newreview)
    },
    async addReview(r) {
            try {
                const res = await axios.post(`${this.backend_url}/review/save`, r)
                const review = res.data
                if (res.status != 200) {
                    alert("An Unexpected Error Occured. Response Status: " + res.status)
                } else {
                    alert("Successfully Review the Product.")
                    this.reviews.push(review)
                    this.$emit("calculate",this.reviews)
                }
            } catch (error) {
                console.log(error)
            }
        },
  },
  created() {
    this.fetchReviews(this.pid);
    
  },
};
</script>

<style>
</style>