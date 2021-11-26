<template>
    <div class="mx-auto w-4/6 space-y-3">
        <div id="couponHeader" class="flex justify-end">
            <button @click="toggleAdd" type="button" class="m-2 px-2 py-1 transition duration-200 bg-green-300 rounded-lg border hover:bg-green-400">Add</button>
        </div>

        <div id="couponAddEdit" v-if="isAddEdit">
            <add-edit-coupon @add-coupon="addCoupon"></add-edit-coupon>
        </div>

        <div id="couponList" v-if="coupons">
            <div id="couponListHeader" class="row">
                <div class="col">Coupon Code</div>
                <div class="col-2">Name</div>
                <div class="col-3">Description</div>
                <div class="col">Expire Date</div>
                <div class="col">Discount</div>
                <div class="col">Max Discount</div>
                <div class="col">Min Price</div>
                <div class="col">Max Usage</div>
            </div>
            <hr/>
            <div class="row" v-for="coupon in coupons" :key="coupon.couponcode">
                <div class="col uppercase">{{ coupon.couponcode }}</div>
                <div class="col-2">{{ coupon.name }}</div>
                <div class="col-3">{{ coupon.description }}</div>
                <div class="col">{{ coupon.expdate }}</div>
                <div class="col">{{ coupon.value }}{{ coupon.ispercent ? '%': '' }}</div>
                <div class="col">{{ coupon.maxdiscount ? coupon.maxdiscount : 'N/A' }}</div>
                <div class="col">{{ coupon.minprice ? coupon.minprice : 'N/A' }}</div>
                <div class="col">{{ coupon.maxusage ? coupon.maxusage : 'N/A' }}</div>
            </div>
        </div>

        <div id="couponPage">

        </div>

    </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import AddEditCoupon from './AddEditCoupon.vue'
import axios from 'axios'

export default {
    name: 'CouponManageV2',
    components: {
        AddEditCoupon
    },
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
            isAddEdit: false,
        }
    },
    methods: {
        toggleAdd(){
            this.isAddEdit = !this.isAddEdit
        },
        async addCoupon(coupon){
            const access_token = localStorage.getItem("access_token")
            const response = await axios.post(`${this.backend_url}/coupon/save`, coupon, {headers: {"Authorization": `Bearer ${access_token}`}})
                .catch(function(error) {
                    if(error){
                        alert(error.response.data.message)
                    }
                })

            if(response != undefined && response.status == 200){
                 this.$store.dispatch("fetchCoupons")
            }
        }
    },
    setup() {
        const store = useStore();
        store.dispatch("fetchCoupons");
        console.log(store.state.coupons);
        return {
            coupons: computed(() => store.state.coupons)
        }
    },



}
</script>