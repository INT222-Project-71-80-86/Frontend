<template>
    <div id="cartDetailDropdown" aria-labelledby="dropdownMenuClickableInside" class="dropdown-menu w-7/12 rounded-xl shadow-md" aria-hidden="true">
        <div id="contentHeader" class="px-3 py-2 border-b">
            <h5 class="text-2xl font-semibold" id="exampleDropdownLabel">Cart Details</h5>
        </div>
        <div id="dropdownBody" class="">
            <div v-if="cart.length > 0">
                <div id="bodyHeader" class="row text-xl font-semibold border-b border-black mx-2 pb-2 pt-2">
                    <div class="col-1">No</div>
                    <div class="col-2">Image</div>
                    <div class="col-4">Product</div>
                    <div class="col-2">Quantity</div>
                    <div class="col">Price</div>
                    <div class="col">Total</div>
                    <div class="col"></div>
                </div>
                <div  class="overflow-auto h-96">
                    <div id="bodyDetail" class="row mx-2 py-3 border-b" v-for="(c, index) in cart" :key="c.productColor.id">
                        <div class="col-1">{{index+1}}</div>
                        <div class="col-2"><img :src="getImage(c.product.image)" style="max-height: 120px; width:auto;"></div>
                        <div class="col-3"><button data-bs-dismiss="dropdown" type="button" @click="reRouting(c.product.pid)">{{c.product.name}}</button></div>
                        <div class="col-1">
                            <div class="color-circle border-2 border-black rounded-full w-7 h-7" :style="{ backgroundColor: c.productColor.color.code }" />
                            <!-- {{c.productColor.color.name}} -->
                        </div>
                        <div class="col-2">
                            <button @click="decrement(c)">
                                <span class="material-icons">
                                    remove_circle_outline
                                </span>
                            </button>
                            {{c.amount}}
                            <button @click="increment(c)">
                                <span class="material-icons">
                                    add_circle_outline
                                </span>
                            </button>
                        </div>
                        <div class="col">{{c.product.price}}</div>
                        <div class="col">{{calTotal(c.amount, c.product.price)}}</div>
                        <div class="col">
                            <button @click="removeFromCart(c)">
                                <span class="material-icons text-red-500">
                                    delete
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="m-3 text-4xl font-semibold">
                NO ITEM IN CART
            </div>
        </div>
        <div id="bodyFooter" class="mx-2 py-3 row border-t"  v-if="cart.length > 0">
            <div class="col-8"></div>
            <div class="col">Total price:</div>
            <div class="col">{{computedPrice}} Baht</div>
        </div>
        <div id="dropdownFooter" class="flex justify-end mx-4 space-x-3 ">
            <button type="button" class="btn btn-danger" v-if="cart.length > 0" @click="clearCart">Clear cart</button>
            <button type="button" class="btn btn-primary" v-if="cart.length > 0" @click="toOrder">Place order</button>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
export default {
    name: "TheCartDropdown",
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
            confirmClear: false,
        }
    },
    methods: {
        close(){
            console.log("close")
        },
        calTotal(amount, price) {
            return (Math.round((amount * price) * 100)/100).toFixed(2);
        },
        getImage(image) {
            return `${this.backend_url}/file/${image}`;
        },
        reRouting(param){
            this.$router.push({ name: 'singleProduct', params: { singleProd: param } })
        },
        toOrder(){
            this.$router.push({ name: 'Order' })
        },
        clearCart(){
            if(confirm("Do you want to clear cart?")){
                this.$store.dispatch("clearCart")
            }
        },
        removeFromCart(c){
            this.$store.dispatch("removeCartItem", c.productColor.id)
        },
        increment(item){
            if(item.amount == item.productColor.amount){
                return
            }
            item.amount++
            this.$store.dispatch('saveCart',this.cart)
        },
        decrement(item){
            if(item.amount == 1){
                return
            }
            item.amount--
            this.$store.dispatch('saveCart', this.cart)
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