<template>
    <div id="addEditCoupon" class="px-5 py-3 border rounded-xl space-y-3">
        <div class="row">
            <div class="col-4">
                <label for="couponCode">Coupon&nbsp;Code: </label>
                <input type="text" class="form-control" id="couponCode" placeholder="6-10 Characters" maxlength="10" minlength="6" v-model="couponcode" />
                <p v-if="invalidCouponCode" class="text-sm text-red-500 font-bold">Coupon Code must consist of (a-z/A-Z/0-9)</p>
            </div>
            <div class="col">
                <label for="couponName">Coupon&nbsp;Name: </label>
                <input type="text" class="form-control" id="couponName" placeholder="Up to 100 Characters" minlength="1" v-model="name" />
                <p v-if="invalidCouponName" class="text-sm text-red-500 font-bold">Coupon name must in the range of 1 to 100 characters</p>
            </div>
        </div>

        <div class="grid grid-col-1">
            <label for="couponDesc">Coupon&nbsp;Description: </label>
            <textarea rows="2" name="description" id="couponDesc" v-model="description" placeholder="Enter Description (Up to 200 Characters)" maxlength="200" class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"></textarea>
            <p v-if="invalidCouponDesc" class="text-sm text-red-500 font-bold">Description must be up to 200 characters</p>
        </div>

        <div class="row">
            <div class="col flex space-x-3">
                <label for="couponPercent" class="">Is&nbsp;Percent</label>
                <input @change="checkInvalidValue" class="w-8 h-8" type="checkbox" id="couponPercent" v-model="ispercent"/>
                <input class="h-8 form-control" type="number" min="0.01" :max="ispercent ? '100': '100000000'" step="0.01" :placeholder="ispercent ? 'Value (1-100)': 'Value Between 1 and 100,000,000'" v-model="value"/>
            </div>
            <div class="col flex space-x-3">
            <label for="couponExpDate" class="">Expire&nbsp;Date</label>
                <input class="h-8 form-control" id="couponExpDate" type="date" v-model="expdate"/>
            </div>
        </div>
        <div v-if="invalidValue || invalidExpDate" id="invalidPercentExpDate" class="row">
            <div class="col">
                <p v-if="invalidValue" class="text-sm text-red-500 font-bold">Value must be 
                    <span v-if="ispercent">in range of 1 - 100</span>
                    <span v-else>between 1 and 100,000,000</span>
                </p>
            </div>
            <div class="col">
                <p v-if="invalidExpDate" class="text-sm text-red-500 font-bold">Expire date must be newer than current date</p>
            </div>
        </div>

        <div class="row">
            <div class="col flex flex-col">
                <div class="space-x-3">
                    <input class="w-8 h-8" type="checkbox" id="couponMaxUsage" v-model="isMaxUsage"/>
                    <label for="couponMaxUsage">Set max usage?</label>
                </div>
                <input class="h-8 form-control" :disabled="!isMaxUsage" type="number" min="1" step="1" placeholder="Max usage" v-model="maxusage"/>
                <p v-if="invalidMaxUsage" class="text-sm text-red-500 font-bold">Max usage can't be less than 1</p>
            </div>
            <div class="col flex flex-col">
                <div class="space-x-3">
                    <input class="w-8 h-8" type="checkbox" id="couponMinPrice" v-model="isMinPrice"/>
                    <label for="couponMinPrice">Set minimum price?</label>
                </div>
                <input class="h-8 form-control" :disabled="!isMinPrice" type="number" min="1" max="100000000" step="0.01" placeholder="Minimum price" v-model="minprice"/>
                <p v-if="invalidMinPrice" class="text-sm text-red-500 font-bold">Minimum price must be between 0 and 100,000,000</p>
            </div>
            <div class="col flex flex-col" v-if="ispercent">
                <div class="space-x-3">
                    <input class="w-8 h-8" type="checkbox" id="couponMaxDiscount" v-model="isMaxDiscount"/>
                    <label for="couponMaxDiscount">Set max discount?</label>
                </div>
                <input class="h-8 form-control" :disabled="!isMaxDiscount" type="number" min="1" max="100000000" step="0.01" placeholder="Max discount" v-model="maxdiscount"/>
                <p v-if="invalidMaxDiscount" class="text-sm text-red-500 font-bold">Max discount must be between 0 and 100,000,000</p>
            </div>
        </div>

        <div class="flex justify-end space-x-3">
            <button type="button" @click="makeCoupon" class="px-3 py-2 transition duration-200 bg-green-300 rounded-xl hover:bg-green-400">Save</button>
            <button type="button" @click="clearForm" class="px-3 py-2 transition duration-200 bg-red-300 rounded-xl hover:bg-red-400" >Clear</button>
        </div>

    </div>
</template>
<script>
export default {
    name: 'AddEditCoupon',
    props: ['coupon'],
    data() {
        return {
            couponcode: '',
            name: '',
            description: '',
            ispercent: false,
            value: null,
            expdate: null,
            maxusage: 0,
            maxdiscount: 0,
            minprice: 0,

            isMaxUsage: false,
            isMinPrice: false,
            isMaxDiscount: false,

            invalidCouponCode: false,
            invalidCouponName: false,
            invalidCouponDesc: false,
            invalidValue: false,
            invalidExpDate: false,
            invalidMaxUsage: false,
            invalidMaxDiscount: false,
            invalidMinPrice: false,
            
        }
    },
    methods: {
        makeCoupon(){
            if(this.validateCoupon()){
                let isPercent = this.ispercent ? 1 : 0
                let maxUsage = this.isMaxUsage ? this.maxusage : null
                let minPrice = this.isMinPrice ? this.minprice : null
                let maxDiscount = this.isMaxDiscount ? this.maxdiscount : null

                let coupon = {
                    couponcode:     this.couponcode,
                    name:           this.name,
                    description:    this.description,
                    expdate:        this.expdate,
                    ispercent:      isPercent,
                    value:          this.value,
                    maxusage:       maxUsage,
                    minprice:       minPrice,
                    maxdiscount:    maxDiscount
                }
                
                this.$emit('addCoupon', coupon)

                this.clearForm()
            }
        },
        clearForm(){
            this.couponcode = this.name = this.description = ''
            this.value = this.expdate = null
            this.maxusage = this.minprice = this.maxdiscount = 0
            this.isMaxUsage = this.isMinPrice = this.isMaxDiscount = this.ispercent = false
            this.resetInvalid()
        },
        validateCoupon(){
            this.resetInvalid()

            this.invalidCouponCode = this.couponcode.trim() == '' || this.checkCouponCode()
            this.invalidCouponName = this.name.trim() == '' || this.name.length > 100 
            this.invalidCouponDesc = this.description.length > 200 
            this.checkInvalidValue()
            this.invalidValue = this.value == null
            this.invalidExpDate = this.expdate == null || this.checkInvalidDate() 
            if(this.isMaxUsage){
                this.invalidMaxUsage = this.maxusage <= 0 
            }
            if(this.isMinPrice){
                this.invalidMinPrice = this.minprice <= 0 || this.minprice >= 100000000
            }
            if(this.ispercent && this.isMaxDiscount){
                this.invalidMaxDiscount = this.maxdiscount <= 0 || this.maxdiscount >= 100000000 
            }

            if(!(this.invalidCouponCode || this.invalidCouponName || this.invalidCouponDesc || this.invalidValue || this.invalidExpDate
            || this.invalidMaxUsage || this.invalidMaxDiscount || this.invalidMinPrice)){
                return true
            }

            return false
        },
        checkCouponCode(){
            let pattern = /^(?=.{6,10}$)([a-zA-Z0-9]+)+$/
            let result = pattern.test(this.couponcode)
            return !result
        },
        checkInvalidValue(){
            let check = false
            if(!this.value){
                return
            }
            if(this.ispercent){
                    check = this.value <= 0 || this.value > 100
            } else {
                    check = this.value <= 0 || this.value > 10000000
            }
            this.invalidValue = check
        },
        checkInvalidDate(){
            let dateNow = new Date()
            let expdate = new Date(this.expdate)
            dateNow.setHours(0,0,0,0)
            expdate.setHours(0,0,0,0)
            return dateNow >= expdate ? true : false
        },
        resetInvalid() {
            this.invalidCouponCode = this.invalidCouponName = this.invalidCouponDesc = 
            this.invalidValue = this.invalidExpDate = this.invalidMaxUsage = this.invalidMaxDiscount = this.invalidMinPrice = false
        }
    },

}
</script>

<style>

</style>