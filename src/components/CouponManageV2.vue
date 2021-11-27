<template>
    <div class="mx-auto w-5/6 space-y-3 ">
        <div id="couponHeader" class="flex justify-end">
            <button @click="toggleAdd" type="button" class="m-2 px-2 py-1 transition duration-200 rounded-lg border "
                :class="{'bg-green-300 hover:bg-green-400': !isAddEdit, 'bg-red-300 hover:bg-red-400': isAddEdit}">
                <span v-if="!isAddEdit">Add Coupon</span>
                <span v-else>Cancel Add</span>
            </button>
        </div>

        <div id="couponAddEdit" v-if="isAddEdit">
            <add-edit-coupon @add-coupon="addCoupon"></add-edit-coupon>
        </div>

        <div id="couponList" v-if="coupons">
            <div id="couponListHeader" class="row bg-gray-600 py-2 text-white rounded-t-lg">
                <div class="col-1">Coupon Code</div>
                <div class="col-2">Name</div>
                <div class="col-3">Description</div>
                <div class="col-1">Expire Date</div>
                <div class="col-1">Discount</div>
                <div class="col-1">Max Discount</div>
                <div class="col-1">Min Price</div>
                <div class="col-1">Max Usage</div>
                <div class="col-1">Actions</div>
            </div>
            <div class="row py-2" v-for="(coupon,index) in coupons" :key="coupon.couponcode" :class="{'text-red-500': (calExpireDate(coupon.expdate) || coupon.maxusage == -1), 'bg-gray-200': index%2 == 0}">
                <div class="col-1 uppercase">{{ coupon.couponcode }}</div>
                <div class="col-2">{{ coupon.name }}</div>
                <div class="col-3">{{ coupon.description }}</div>
                <div class="col-1" :class="{'text-red-500': calExpireDate(coupon.expdate)}">{{ coupon.expdate }}</div>
                <div class="col-1">{{ coupon.value }}{{ coupon.ispercent ? '%': '' }}</div>
                <div class="col-1">{{ coupon.maxdiscount ? coupon.maxdiscount : 'N/A' }}</div>
                <div class="col-1">{{ coupon.minprice ? coupon.minprice : 'N/A' }}</div>
                <div class="col-1" :class="{'text-red-500': coupon.maxusage == -1}">{{ coupon.maxusage ? coupon.maxusage : "N/A" }}</div>
                <div class="col-1">    
                    <!-- <button>
                        <span class="material-icons transition duration-200 text-green-400 hover:text-green-500">edit</span>
                    </button> -->
                    <button type="button" v-if="coupon.maxusage != -1 && !calExpireDate(coupon.expdate)" @click="invalidatedCoupon(coupon.couponcode)">
                        <span class="material-icons transition duration-200 text-red-500 hover:text-red-600">cancel</span>
                    </button>
                    <span class="text-red-500" v-else-if="coupon.maxusage == -1">Invalidated</span>
                    <span class="text-red-500" v-else-if="calExpireDate(coupon.expdate)">Expired</span>
                </div>
            </div>
        </div>

        <div id="paging" class="mt-8 pb-3">
            <div class="flex space-x-5 justify-center">
            <button
                @click="fetchCoupons(i)"
                v-for="i in pageTotal"
                :key="i"
                class="w-10 h-8 align-middle text-black border"
                :class="{ 'bg-green-400': checkCurrentPage(i) }"
            >{{ i }}</button>
            </div>
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
        checkCurrentPage(i){
            return this.pageInfo.pageNumber+1 == i 
        },
        calExpireDate(expdate){
            let expireDate = new Date(expdate)
            let now = new Date()
            expireDate.setHours(0,0,0,0)
            now.setHours(0,0,0,0)
            return now >= expireDate
        },
        fetchCoupons(pageNo = 1) {
            this.$store.dispatch('fetchCoupons', pageNo)
            return {
                coupons: computed(() => this.$store.state.pagingItems.content)
            }
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
                alert("Successfully Add coupon: "+ response.data.couponcode)
                 this.$store.dispatch("fetchCoupons", 1)
                 this.isAddEdit = false
            }
        },
        async invalidatedCoupon(couponcode){
            if(confirm("Do you want to invalidate this coupon")){
                const access_token = localStorage.getItem("access_token")
                const response = await axios.delete(`${this.backend_url}/coupon/delete/${couponcode}`, {headers: {"Authorization": `Bearer ${access_token}`}})
                    .catch(function(error) {
                        if(error){
                            alert(error.response.data.message)
                        }
                    })
    
                if(response != undefined && response.status == 200){
                    alert("Successfully invalidate coupon: "+ response.data.couponcode)
                     this.$store.dispatch("fetchCoupons", this.currentPage)
                }
            }
        }
    },
    setup() {
        const store = useStore();
        store.dispatch("fetchCoupons", 1);
        return {
            coupons: computed(() => store.state.pagingItems.content),
            pageInfo: computed(() => store.state.pagingItems.pageable),
            pageTotal: computed(() => store.state.pagingItems.totalPages),
            currentPage: computed(() => store.state.currentPage),
            pageSize: computed(() => store.state.pagingItems.numberOfElements),
            allSize: computed(() => store.state.pagingItems.totalElements),
        }
    },



}
</script>