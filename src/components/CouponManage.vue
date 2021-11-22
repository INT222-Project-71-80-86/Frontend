<template>
    <div class="flex justify-center mx-auto">
        <div v-if="!addNew">
            <button
                class="border-2 border-red-500 px-3 py-3 mt-4"
                @click="enableviewADD()"
            >Add New Coupon</button>
        </div>
        <div v-else>
            <button class="border-2 border-red-500 px-3 py-3 mt-4" @click="disableviewADD()">Cancel</button>
        </div>

        <div v-if="!addNew">
            <div v-for="coupon in coupons" :key="coupon.couponcode">
                <!-- All coupon -->
                <div class="border-2 border-pink-500 px-2 py-5 m-5">
                    <!-- Coupon's details -->
                    <div v-if="couponcode != coupon.couponcode">
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
                    <!-- if edit -->
                    <div v-else>
                        <div v-if="couponcode == coupon.couponcode">
                            <!-- Edit Coupon's Form  -->
                            <div>
                                <label class="pr-3 pb-3">Name</label>
                                <input type="text" class="border-2" v-model="name" required />
                            </div>
                            <p
                                v-if="invalidname"
                                class="text-red-500 text-sm font-semibold uppercase"
                            >Enter coupon name</p>

                            <div>
                                <label class="pr-3 pb-3">couponcode</label>
                                <input type="text" class="border-2" v-model="couponcode" required />
                            </div>
                            <p
                                v-if="invalidcouponcode"
                                class="text-red-500 text-sm font-semibold uppercase"
                            >Enter coupon code</p>
                            <div>
                                <label class="pr-3 pb-3">description</label>
                                <textarea
                                    type
                                    class="border-2 w-full"
                                    v-model="description"
                                    required
                                ></textarea>
                            </div>
                            <p
                                v-if="invaliddescription"
                                class="text-red-500 text-sm font-semibold uppercase"
                            >Enter coupon description</p>
                            <div>
                                <label class="pr-3 pb-3">expdate</label>
                                <input type="date" class="border-2" v-model="expdate" required />
                            </div>
                            <p
                                v-if="invalidexpdate"
                                class="text-red-500 text-sm font-semibold uppercase"
                            >Enter coupon expdate</p>
                            <div>
                                <label class="pr-3 pb-3">ispercent</label>
                                <input type="text" class="border-2" v-model="ispercent" required />
                            </div>
                            <p
                                v-if="invalidispercent"
                                class="text-red-500 text-sm font-semibold uppercase"
                            >Enter coupon ispercent</p>
                            <div>
                                <label class="pr-3 pb-3">value</label>
                                <input type="text" class="border-2" v-model="value" required />
                            </div>
                            <p
                                v-if="invalidvalue"
                                class="text-red-500 text-sm font-semibold uppercase"
                            >Enter coupon value</p>
                            <div>
                                <label class="pr-3 pb-3">maxusage</label>
                                <input type="number" class="border-2" v-model="maxusage" required />
                            </div>
                            <p
                                v-if="invalidmaxusage"
                                class="text-red-500 text-sm font-semibold uppercase"
                            >Enter coupon max Useage</p>
                            <div>
                                <label class="pr-3 pb-3">maxdiscount</label>
                                <input type="text" class="border-2" v-model="maxdiscount" required />
                            </div>
                            <p
                                v-if="invalidmaxdiscount"
                                class="text-red-500 text-sm font-semibold uppercase"
                            >Enter coupon max discount</p>
                            <div>
                                <label class="pr-3 pb-3">minprice</label>
                                <input type="text" class="border-2" v-model="minprice" required />
                            </div>
                            <p
                                v-if="invalidminprice"
                                class="text-red-500 text-sm font-semibold uppercase"
                            >Enter coupon min price</p>
                        </div>
                    </div>

                    <!-- Option Buttons -->
                    <div v-if="couponcode != coupon.couponcode">
                        <button
                            @click="editcoupon(coupon)"
                            class="font-bold py-1 px-3 rounded text-xs bg-blue-500 flex float-right"
                        >Edit Coupon</button>
                    </div>

                    <!-- Action when edit -->
                    <div v-if="couponcode == coupon.couponcode">
                        <button
                            @click="checkForm()"
                            class="font-bold m-2 py-1 px-3 rounded text-xs bg-blue-500 flex float-right"
                        >Save</button>
                        <button
                            @click="cancelcoupon"
                            class="font-bold m-2 py-1 px-3 rounded text-xs bg-blue-500 flex float-right"
                        >cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Form for add new coupon -->
        <div v-else>
            <div class="border-2 px-2 py-2 mx-4 my-4">
                <div>
                    <label class="pr-3 pb-3">Name</label>
                    <input type="text" class="border-2" v-model="name" required />
                </div>
                <p
                    v-if="invalidname"
                    class="text-red-500 text-sm font-semibold uppercase"
                >Enter coupon name</p>

                <div>
                    <label class="pr-3 pb-3">couponcode</label>
                    <input type="text" class="border-2" v-model="couponcode" required />
                </div>
                <p
                    v-if="invalidcouponcode"
                    class="text-red-500 text-sm font-semibold uppercase"
                >Enter coupon code</p>
                <div>
                    <label class="pr-3 pb-3">description</label>
                    <textarea type class="border-2 w-full" v-model="description" required></textarea>
                </div>
                <p
                    v-if="invaliddescription"
                    class="text-red-500 text-sm font-semibold uppercase"
                >Enter coupon description</p>
                <div>
                    <label class="pr-3 pb-3">expdate</label>
                    <input type="date" class="border-2" v-model="expdate" required />
                </div>
                <p
                    v-if="invalidexpdate"
                    class="text-red-500 text-sm font-semibold uppercase"
                >Enter coupon expdate</p>
                <div>
                    <label class="pr-3 pb-3">ispercent: </label>
                    <input type="radio" class="border-2" v-model="ispercent" value="1" id="ispercent" required />
                    <label class="pr-3 pb-3">Yes </label>
                    <input type="radio" class="border-2" v-model="ispercent" value="0" id="isnotpercent" cheked required />
                    <label class="pr-3 pb-3">No </label>

                </div>
                <p
                    v-if="invalidispercent"
                    class="text-red-500 text-sm font-semibold uppercase"
                >Enter coupon ispercent</p>
                <div>
                    <label class="pr-3 pb-3">value</label>
                    <input type="text" class="border-2" v-model="value" max="100" min="0" required />
                </div>
                <p
                    v-if="invalidvalue"
                    class="text-red-500 text-sm font-semibold uppercase"
                >Enter coupon value</p>
                <div>
                    <label class="pr-3 pb-3">maxusage: </label>
                    <input type="radio" class="border-2" v-model="maxusage" value="1" id="ismaxusage" required />
                    <label class="pr-3 pb-3">Yes </label>
                    <input type="radio" class="border-2" v-model="maxusage" value="0" id="isnotmaxusage" required />
                    <label class="pr-3 pb-3">No </label>
                    <input v-if="maxusage > 0" type="number" class="border-2" v-model="maxusage" required />
                </div>
                <p
                    v-if="invalidmaxusage"
                    class="text-red-500 text-sm font-semibold uppercase"
                >Enter coupon max Useage</p>
                <div>
                    <label class="pr-3 pb-3">maxdiscount</label>
                    <input type="text" class="border-2" v-model="maxdiscount" required />
                </div>
                <p
                    v-if="invalidmaxdiscount"
                    class="text-red-500 text-sm font-semibold uppercase"
                >Enter coupon max discount</p>
                <div>
                    <label class="pr-3 pb-3">minprice</label>
                    <input type="text" class="border-2" v-model="minprice" required />
                </div>
                <p
                    v-if="invalidminprice"
                    class="text-red-500 text-sm font-semibold uppercase"
                >Enter coupon min price</p>
            </div>
            <button class="border-2 border-red-500 px-2 py-2" @click="checkForm()">Save</button>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
    name: 'CouponManage',
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
            addNew: false,
            edit: false,
            couponcode: '',
            description: '',
            expdate: '',
            ispercent: 0,
            name: '',
            value: 0.00,
            maxusage: 0,
            maxdiscount: 0.00,
            minprice: 0.00,

            invalidcouponcode: false,
            invaliddescription: false,
            invalidexpdate: false,
            invalidispercent: false,
            invalidname: false,
            invalidvalue: false,
            invalidmaxusage: false,
            invalidmaxdiscount: false,
            invalidminprice: false
        }
    },
    methods: {
        enableviewADD() {
            this.addNew = true
        },
        disableviewADD() {
            this.addNew = false
            this.invalidcouponcode= false,
            this.invaliddescription= false,
            this.invalidexpdate= false,
            this.invalidispercent= false,
            this.invalidname= false,
            this.invalidvalue= false,
            this.invalidmaxusage= false,
            this.invalidmaxdiscount= false,
            this.invalidminprice= false
        },
        cancelcoupon() {
            this.edit = false
            this.couponcode = ''
            this.description = ''
            this.expdate = ''
            this.ispercent = ''
            this.name = ''
            this.value = ''
            this.maxusage = ''
            this.maxdiscount = ''
            this.minprice = ''

            this.invalidcouponcode= false,
            this.invaliddescription= false,
            this.invalidexpdate= false,
            this.invalidispercent= false,
            this.invalidname= false,
            this.invalidvalue= false,
            this.invalidmaxusage= false,
            this.invalidmaxdiscount= false,
            this.invalidminprice= false
        },
        editcoupon(coupon) {
            this.edit = true
            this.couponcode = coupon.couponcode
            this.description = coupon.description
            this.expdate = coupon.expdate
            this.ispercent = coupon.ispercent
            this.name = coupon.name
            this.value = coupon.value
            this.maxusage = coupon.maxusage
            this.maxdiscount = coupon.maxdiscount
            this.minprice = coupon.minprice
        },
        checkForm(){
            this.invalidname =this.name === null || this.name.trim() === "" ? true: false;
            this.invalidcouponcode =this.couponcode === null || this.couponcode.trim() === "" ? true: false
            this.invaliddescription = this.description === "" || this.description.trim()=== "" ? true: false
            this.invalidexpdate =this.expdate === null || this.expdate.trim() === "" ? true: false;
            this.invalidispercent = this.ispercent < 0 || this.ispercent > 1 ? true : false;
            this.invalidmaxusage = this.maxusage < 0 ? true : false;
            this.invalidmaxdiscount = this.maxdiscount < 0 ? true : false;
            this.invalidminprice = this.minprice < 0 ? true : false;
            
            if(this.ispercent){

                if(this.value <= 0 || this.value > 100){
                    this.invalidvalue = true
                } else {
                    this.invalidvalue = false
                }

            } else {

                if(this.value <= 0){
                    this.invalidvalue = true
                } else {
                    this.invalidvalue = false
                }
                
            }
            if(!this.invalidname
            && !this.invalidcouponcode 
            && !this.invaliddescription 
            && !this.invalidexpdate 
            && !this.invalidispercent
            && !this.invalidmaxdiscount 
            && !this.invalidmaxusage 
            && !this.invalidminprice
            && !this.invalidvalue)
            {
                this.makeForm()
            }
        },
        async makeForm() {
            if(this.maxusage == 0){
                this.maxusage = null
            }
            if(this.maxdiscount == 0){
                this.maxdiscount = null
            }
            if(this.minprice == 0){
                this.minprice = null
            }
            let coupon = {
                couponcode: this.couponcode,
                description: this.description,
                expdate: this.expdate,
                ispercent: this.ispercent,
                name: this.name,
                value: this.value,
                maxusage: this.maxusage,
                maxdiscount: this.maxdiscount,
                minprice: this.minprice
            }
            if (!this.edit) {
                await this.saveNewCoupon(coupon)
            } else {
                this.saveEditCoupon(coupon)
            }
            
        },
        saveEditCoupon(coupon) {
            let temp = localStorage.getItem("access_token")
            const res = axios.put(`${this.backend_url}/coupon/edit`, coupon, { headers: { 'Authorization': `Bearer ${temp}` } }).then(() => {
                alert("Edit Coupon Successfully")

            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    alert(error.response.data.message)
                    console.log(error.response.status);
                    console.log(error.response.headers);

                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            console.log(res)

        },
        async saveNewCoupon(coupon) {
            let temp = localStorage.getItem("access_token")
            const res = axios.post(`${this.backend_url}/coupon/save`, coupon, { headers: { 'Authorization': `Bearer ${temp}` } }).then(() => {
                alert("Add New Coupon Successfully")
                this.disableviewADD()
                this.$store.dispatch("fetchCoupons")
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    alert(error.response.data.message)
                    console.log(error.response.status);
                    console.log(error.response.headers);

                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            console.log(res)
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