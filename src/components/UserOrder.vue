<template>
    <nav-bar />
    <div id="userOrder" class="mx-auto w-4/5 px-5 py-3 rounded-xl shadow-lg border border-black">
        <div id="userOrderHeader" class="text-3xl font-semibold mb-3">
            Your Orders
        </div>
        <div id="userOrderDetail">
            <div class="accordion" id="ordersAccordion" v-if="orders">
                <div class="accordion-item" v-for="o in orders" :key="o.oid">
                    <h2 class="accordion-header -mr-3" :id="'heading'+o.oid">
                        <button class="accordion-button collapsed row" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+o.oid" aria-expanded="false" :aria-controls="'collapse'+o.oid">
                            <div class="col-6">Order No #{{o.oid}}</div>
                            <div class="col-2"><span class="">{{toDateTime(o.date)}}</span></div>
                            <div class="col">Total: <span class="text-green-500">{{o.totalprice}}฿</span></div>
                            <div class="col capitalize">{{o.status}}</div>
                        </button>
                    </h2>
                    <div :id="'collapse'+o.oid" class="accordion-collapse collapse" :aria-labelledby="'heading'+o.oid" data-bs-parent="#ordersAccordion">
                        <div class="accordion-body max-h-96 overflow-auto">
                            <div v-for="(od, index) in o.orderdetail" :key="od.id" class="orderDetail row">
                                <div class="col-1">{{ index+1 }}</div>
                                <div class="col-2"><img :src="getImage(od.product.image)" :alt="od.product.name" style="max-height: 120px; width:auto;"></div>
                                <div class="col-3 text-left"><a href="#" @click="reRouting(od.product.pid)">{{od.product.name}}</a></div>
                                <div class="col">
                                    <div class="border-2 border-black w-7 h-7 hover:border-gray-500 transform duration-200" :style="{ backgroundColor: od.color.code }" />
                                </div>
                                <div class="col">&times;{{od.amount}}</div>
                                <div class="col">{{toFixed(od.priceeach, od.amount)}}฿</div>
                            </div>
                            <div v-if="o.coupon">
                                <div>Coupon: <span class="uppercase">{{o.coupon.couponcode}}</span></div>
                                <div>Discount 
                                    <span v-if="o.coupon.ispercent">{{o.coupon.value}}% <span v-if="o.coupon.maxdiscount">Max {{o.coupon.maxdiscount}} Baht</span></span>
                                    <span v-else>{{o.coupon.value}} Baht</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="userOrderFooter">
            <div id="userOrderPaging" class="mb-5 mt-8">
                <div class="flex space-x-5 justify-center">
                    <button @click="fetchOrder(i)" v-for="i in totalPages" :key="i" class="w-10 h-8 align-middle text-black border" :class="{ 'bg-green-400': checkCurrentPage(i) }"
                    >{{ i }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
export default {
    name: "UserOrder",
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
        }
    },
    methods: {
        getImage(image){
            return `${this.backend_url}/file/${image}`;
        },
        toFixed(price, amount){
            return (Math.round((amount * price) * 100)/100).toFixed(2);
        },
        toDateTime(dateTime) {
            let m = new Date(dateTime)
            return m.getFullYear() +"/"+ (m.getMonth()+1) +"/"+ m.getDate() + " " + 
                        (m.getHours()<10?'0'+m.getHours():m.getHours()) + ":" + 
                        (m.getMinutes()<10?'0'+m.getMinutes():m.getMinutes()) + ":" +
                        (m.getSeconds()<10?'0'+m.getSeconds():m.getSeconds());
            // return m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
        },
        checkCurrentPage(i){
            return this.pageInfo.pageNumber+1 == i  
        },
        fetchOrder(i = 1){
            console.log(i)
            const access_token = localStorage.getItem('access_token')
            this.$store.dispatch('fetchOrder', {token: access_token, pageNo: i})
        },
        reRouting(param){
            this.$router.push({ name: 'singleProduct', params: { singleProd: param } })
        }
    },
    created() {
        
    },
    setup() {
        const store = useStore();
        let access_token = localStorage.getItem("access_token")
        let detail = {token: access_token, pageNo: 1}
        store.dispatch('fetchOrder', detail)
        return {
            user: computed(() => store.state.user),
            role: computed(() => store.state.role),
            orders: computed(() => store.state.orders.content),
            currentPage: computed(() => store.state.currentPage),
            totalPages: computed(() => store.state.orders.totalPages),
            pageInfo: computed(() => store.state.orders.pageable),
        }
    },

}
</script>
