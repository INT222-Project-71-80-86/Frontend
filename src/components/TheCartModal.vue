<template>
  <div id="cartDetailModal" class="modal fade" tabindex="-1" aria-labelledby="cartDetailModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-2xl font-semibold" id="exampleModalLabel">Cart Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="cart.length > 0">
                            <div id="bodyHeader" class="row text-xl font-semibold border-b border-black mx-2 pb-2">
                                <div class="col-2">Image</div>
                                <div class="col-5">Product</div>
                                <div class="col">Quantity</div>
                                <div class="col">Price</div>
                                <div class="col">Total</div>
                            </div>
                            <div id="bodyDetail" class="row mx-2 py-3 border-b" v-for="c in cart" :key="c.productColor.id">
                                <div class="col-2"><img :src="getImage(c.product.image)" style="max-height: 120px; width:auto;"></div>
                                <div class="col-3"><button data-bs-dismiss="modal" type="button" @click="reRouting('singleProduct', c.product.pid)">{{c.product.name}}</button></div>
                                <div class="col-2">
                                    <div class="color-circle border-2 border-black rounded-full w-7 h-7" :style="{ backgroundColor: c.productColor.color.code }" />
                                    {{c.productColor.color.name}}
                                </div>
                                <div class="col">{{c.amount}}</div>
                                <div class="col">{{c.product.price}}</div>
                                <div class="col">{{calTotal(c.amount, c.product.price)}}</div>
                            </div>
                            
                        </div>
                        <div v-else>
                            No Item in cart.
                        </div>
                    </div>
                    <div id="bodyFooter" class="mx-2 py-3 row"  v-if="cart.length > 0">
                        <div class="col-8"></div>
                        <div class="col">Total price:</div>
                        <div class="col">{{computedPrice}} Baht</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger"  v-if="cart.length > 0">Clear cart</button>
                        <button type="button" class="btn btn-primary"  v-if="cart.length > 0">Save changes</button>
                    </div>
                    </div>
                </div>
        </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
export default {
    name: "TheCartModal",
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
        }
    },
    methods: {
        calTotal(amount, price) {
            return (Math.round((amount * price) * 100)/100).toFixed(2);
        },
        getImage(image) {
            return `${this.backend_url}/file/${image}`;
        },
        reRouting(routeName, param){
            this.$emit("routing", {routeName, param})
        }
    },
    setup(){
        const store = useStore();
        return {
            user: computed(() => store.state.user),
            role: computed(() => store.state.role),
            cart: computed(() => store.state.cart)
        }
    },
    computed: {
        computedPrice() {
            let price = 0.0;
            this.cart.forEach(item => {
                price += parseFloat(this.calTotal(item.amount, item.product.price))
            });
            return (Math.round( price * 100 )/100).toFixed(2)
        }
    }
}
</script>