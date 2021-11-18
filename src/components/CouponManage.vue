<template>
    <div class="flex justify-center mx-auto">
        <div v-for="coupon in coupons" :key="coupon.couponcode">

            <!-- All coupon -->
            <div class="border-2 border-pink-500 px-2 py-5 m-5">
                
                <!-- Coupon's details -->
                <div v-if="!edit">
                    <h2 class="text-sm pb-2">Coupon Name: {{ coupon.name }}</h2>
                    <h2 class="text-sm pb-2">Coupon Code: {{ coupon.couponcode }}</h2>
                    <h2 class="text-sm pb-2">Coupon Description: {{ coupon.description }}</h2>
                    <h2 class="text-sm pb-2">Coupon Expiration Date: {{ coupon.expdate }}</h2>
                    <h2 class="text-sm pb-2">Coupon Percent: {{ coupon.percent }}</h2>
                    <h2 class="text-sm pb-2">Coupon Value: {{ coupon.value }}</h2>
                    <h2 class="text-sm pb-2">Coupon Max Useage: {{ coupon.maxusage }}</h2>
                    <h2 class="text-sm pb-2">Coupon Max Discount: {{ coupon.discount }}</h2>
                    <h2 class="text-sm pb-2">Coupon Mininum Price: {{ coupon.minprice }}</h2>
                </div>
                <div v-else>

                    <!-- Edit Coupon's Form  -->
                    <div>
                        <label class="pr-3 pb-3">Name</label>
                        <input type="text" class="border-2" v-model="name" />
                    </div>

                    <div>
                        <label class="pr-3 pb-3">couponcode</label>
                        <input type="text" class="border-2" v-model="couponcode" />
                    </div>

                    <div>
                        <label class="pr-3 pb-3">description</label>
                        <textarea type="" class=" border-2 w-full" v-model="description" ></textarea>
                    </div>

                    <div>
                        <label class="pr-3 pb-3">expdate</label>
                        <input type="date" class="border-2" v-model="expdate" />
                    </div>

                    <div>
                        <label class="pr-3 pb-3">ispercent</label>
                        <input type="text" class="border-2" v-model="ispercent" />
                    </div>

                    <div>
                        <label class="pr-3 pb-3">value</label>
                        <input type="text" class="border-2" v-model="value" />
                    </div>

                    <div>
                        <label class="pr-3 pb-3">maxusage</label>
                        <input type="number" class="border-2" v-model="maxusage" />
                    </div>

                    <div>
                        <label class="pr-3 pb-3">maxdiscount</label>
                        <input type="text" class="border-2" v-model="maxdiscount" />
                    </div>

                    <div>
                        <label class="pr-3 pb-3">minprice</label>
                        <input type="text" class="border-2" v-model="minprice" />
                    </div>
                </div>

                    <!-- Option Buttons -->
                <div v-if="!edit">
                    <button
                        @click="editcoupon"
                        class="font-bold py-1 px-3 rounded text-xs bg-blue-500 flex float-right"
                    >Edit Coupon</button>
                </div>
                <div v-else>
                    <button
                        @click="this.edit = false"
                        class="font-bold m-2 py-1 px-3 rounded text-xs bg-blue-500 flex float-right"
                    >cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    name: 'CouponManage',
    data() {
        return {
            edit: false,
            couponcode: '',
            description: '',
            expdate: '',
            ispercent: 0,
            name: '',
            value: 0.00,
            maxusage: 0,
            maxdiscount: 0.00,
            minprice: 0.00
        }
    },

    methods: {
        editcoupon() {
            this.edit = true

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