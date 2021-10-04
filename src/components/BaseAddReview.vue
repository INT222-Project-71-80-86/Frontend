<template>
  <div class="border-2 border-purple-300 rounded-lg px-3 py-3">
    <form @submit.prevent="submitReview()">
      <p class="tracking-wide">Select Your Ratings:</p>
      <star-rating v-model:rating="rating" :star-size="36" :animate="true" :glow="2" active-color="#FFD500"></star-rating>
      <p class="mt-2 mb-1 tracking-wide">Comments:</p>
      <textarea class="border-3 border-purple-100 w-96 py-1 px-2 hover:border-purple-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Review this product here." v-model="review" rows="5" maxlength="200"></textarea>
      <p
                        v-if="invalidreview"
                        class="text-red-500 text-sm font-semibold uppercase mb-2"
                    >— &nbsp;&nbsp;Review can't blank on both field&nbsp;&nbsp; —</p>
      <div class="flex space-x-52">
        <button class="px-3 border-1 border-indigo-900 bg-green-500 hover:bg-green-500 hover:text-white duration-500 text-lg font-semibold rounded-lg">Submit</button>
        <button class="px-3 border-1 border-black hover:text-white bg-red-500 hover:bg-red-500 duration-500 text-lg font-semibold rounded-lg" type="reset" @click="resetdata">Reset</button>
      </div>
    </form>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
export default {
  name: "BaseAddReview",
  components: {
    StarRating,
  },
  data(){
    return {
      review: '',
      rating: 0,
      invalidreview: false,
    }
  },
  methods: {
    submitReview(){
        this.invalidreview = (this.rating < 1 && this.review.trim() === '') ? true : false;
        if (!this.invalidreview){
            let review = {reviewid: 0, rating: this.rating, review: this.review}
            this.resetdata()
            this.$emit("userreview",review)
        }

    },

    
    resetdata(){
        this.invalidreview = false
        this.rating = 0
        this.review = ''
    },
  }
}
</script>

<style>

</style>