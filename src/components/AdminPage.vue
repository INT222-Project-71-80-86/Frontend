<template>
  <nav-bar></nav-bar>
    <ul class=" list-reset flex border-b justify-center items-center">      
        <li class="mr-1">
           
            <button 
                @click="this.case=1"
                class="bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold"
                
            >Add Brand</button>
        </li>
         <li class="mr-1">
            <button
            @click="this.case=2"
                class="bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold"
                
            >Add Color</button>
        </li>
        <li class="mr-1">
            <button
            @click="this.case=3"
                class="bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold"
                
            >Role Manage</button>
        </li>
        <li class="mr-1">
            <button
            @click="this.case=4"
                class="bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold"
                
            >Coupon Manage</button>
        </li>
    </ul>

  
  <component :is="selectedComponent()"></component>
  

</template>
<script>

import addbrand from "@/components/Addbrand"
import addcolor from "@/components/Addcolor"
import rolemanage from "@/components/RoleManage"
import couponmanage from "@/components/CouponManage"

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
            console.log('test')
            console.log(this.case)
            if (this.case == 1) { this.stage = 'addbrand' }
            else if (this.case == 2) { this.stage = 'addcolor' }
            else if (this.case ==3){ this.stage = 'rolemanage'}
            else if (this.case ==4){ this.stage = 'couponmanage'}
            return this.stage
        }

    },

}


</script>
