<template>
  <nav-bar></nav-bar>
    <ul class=" list-reset flex justify-center items-center space-x-2">     

        <li class="mr-1">
            <button 
                @click="this.case=1"
                class="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold border hover:shadow-inner" 
                :class="{'bg-green-500': this.case == 1, 'bg-white': this.case != 1}"
            >Brand Manage</button>
        </li>

         <li class="mr-1">
            <button
            @click="this.case=2"
                class="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold border hover:shadow-inner"
                :class="{'bg-green-500': this.case == 2, 'bg-white': this.case != 2}"
            >Color Manage</button>
        </li>

        <li class="mr-1">
            <button
            @click="this.case=3"
                class="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold border hover:shadow-inner"
                :class="{'bg-green-500': this.case == 3, 'bg-white': this.case != 3}"
            >Role Manage</button>

        </li>
        <li class="mr-1">
            <button
            @click="this.case=4"
                class="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold border hover:shadow-inner"
                :class="{'bg-green-500': this.case == 4, 'bg-white': this.case != 4}"
            >Coupon Manage</button>
        </li>

    </ul>

  
  <component :is="selectedComponent()"></component>
  

</template>
<script>

import addbrand from "@/components/Addbrand"
import addcolor from "@/components/Addcolor"
import rolemanage from "@/components/RoleManage"
import couponmanage from "@/components/CouponManageV2"

export default {
    name: 'AdminPage',
    components: {
       addbrand,
       addcolor,
       rolemanage,
       couponmanage
    },

    data() {
        return {
            case: 0,
            stage: ''

        }
    },
    methods: {

        selectedComponent() {
            if (this.case == 1) { this.stage = 'addbrand' }
            else if (this.case == 2) { this.stage = 'addcolor' }
            else if (this.case == 3){ this.stage = 'rolemanage'}
            else if (this.case == 4){ this.stage = 'couponmanage'}
            return this.stage
        }

    },

}


</script>
