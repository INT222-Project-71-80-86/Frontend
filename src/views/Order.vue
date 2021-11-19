<template>

    <nav-bar />
    <div class="w-full" style="background-image: url('https://i.pinimg.com/564x/db/87/3d/db873daadf558f81f80b59bfec9495d8.jpg');">
        <div class="flex justify-center my-6 pt-4 pb-4">
            <div class="flex flex-col p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5 rounded-2xl mt-14">
                <div class="flex-1">
                    <div v-if="cart.length > 0">
                        <div id="bodyHeader" class="row text-xl font-semibold border-b border-black mx-2 pb-2 pt-2">
                            <div class="col-1">No</div>
                            <div class="col-2">Image</div>
                            <div class="col-4">Product</div>
                            <div class="col">Quantity</div>
                            <div class="col">Price</div>
                            <div class="col">Total</div>
                            <div class="col">123</div>
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
                                <div class="col">{{c.amount}}</div>
                                <div class="col">{{c.product.price}}</div>
                                <div class="col">{{calTotal(c.amount, c.product.price)}}</div>
                                <div class="col">E/D</div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="m-3 text-4xl font-semibold">
                        NO ITEM IN CART
                    </div>
                    <!-- coupon  -->
                    <hr class="pb-6 mt-6" />
                    <div class="my-4 mt-6 -mx-2 lg:flex">
                        <div class="lg:px-2 lg:w-1/2">
                            <div class="p-4 bg-gray-100 rounded-full">
                                <h1 class="ml-2 font-bold uppercase">Coupon Code</h1>
                            </div>

                            <!-- apply Coupon -->
                            <div class="p-4">
                                <div class="justify-center md:flex">
                                    <div class="flex items-center w-full h-13 pl-3 bg-gray-100 border rounded-full">
                                        <input type="coupon" name="code" id="coupon" placeholder="Use your coupon ♥♥" class="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"/>
                                        <button type="submit" class="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none">
                                            <svg aria-hidden="true" data-prefix="fas" data-icon="gift" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path fill="currentColor" d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"/>
                                            </svg>
                                            <span class="ml-5 font-medium">Apply</span>
                                        </button>
                                    </div>
                                </div>

                                <!-- sussess message -->
                                <div
                                    class="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-green-100 bg-green-700 border border-green-700"
                                >
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle w-5 h-5 mx-2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </div>
                                    <div class="text-xl font-normal max-w-full flex-initial">
                                        <div class="py-2">success</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- back -->
                        <div class="absolute -bottom-20 md:flex">
                            <router-link to="/">
                                <button class=" bg-red-500 tracking-wide text-gray-800 font-bold rounded border-b-2 hover:text-green-500 py-3 px-40">
                                    <span class="text-white">Continue Shopping...</span>
                                </button>
                            </router-link>
                        </div>
                        <!-- Statement -->

                        <!-- order details -->
                        <div class="ml-16 pt-10 bg-gray-800 rounded-t-2xl lg:px-2 lg:w-1/2">
                            <div class="p-4 bg-gray-100 rounded-full">
                                <h1 class="ml-2 font-bold uppercase">Order Details</h1>
                            </div>
                            <div class="p-4">
                                <!-- subtoltal -->
                                <div class="flex justify-between border-b">
                                    <div
                                        class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-100"
                                    >Subtotal</div>
                                    <div
                                        class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-100"
                                    >ราคารวม</div>
                                </div>

                                <!-- coupon -->
                                <div class="flex justify-between pt-4 border-b">
                                    <div class="flex lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-100">
                                        <svg class="w-4 mr-5 text-gray-100 hover:text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M11 24h-9v-12h9v12zm0-18h-11v4h11v-4zm2 18h9v-12h-9v12zm0-18v4h11v-4h-11zm4.369-6c-2.947 0-4.671 3.477-5.369 5h5.345c3.493 0 3.53-5 .024-5zm-.796 3.621h-2.043c.739-1.121 1.439-1.966 2.342-1.966 1.172 0 1.228 1.966-.299 1.966zm-9.918 1.379h5.345c-.698-1.523-2.422-5-5.369-5-3.506 0-3.469 5 .024 5zm.473-3.345c.903 0 1.603.845 2.342 1.966h-2.043c-1.527 0-1.471-1.966-.299-1.966z"/>
                                        </svg>
                                        Coupon
                                    </div>
                                    <div
                                        class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-700"
                                    >...</div>
                                </div>

                                <!-- new total -->
                                <div class="flex justify-between pt-4 border-b">
                                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-100">
                                        New Subtotal
                                    </div>
                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-100">
                                        ราคารวมหักคูปอง
                                    </div>
                                </div>

                                <!-- tax -->
                                <div class="flex justify-between pt-4 border-b">
                                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-100">
                                        Tax
                                    </div>
                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-100">
                                        (option)
                                    </div>
                                </div>

                                <!-- total price -->
                                <div class="flex justify-between pt-4 border-b">
                                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-100">
                                        Total
                                    </div>
                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-100">
                                        ยอดรวม
                                    </div>
                                </div>

                                <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-700 rounded-full shadow item-center hover:bg-gray-500 focus:shadow-outline focus:outline-none">
                                    <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" >
                                        <path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/>
                                    </svg>
                                    <span class="ml-2 mt-5px">Checkout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    name: 'Order',
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
        };
    },
    methods: {
        calTotal(amount, price) {
            return (Math.round((amount * price) * 100)/100).toFixed(2);
        },
        getImage(image) {
            return `${this.backend_url}/file/${image}`;
        },
        reRouting(param){
            this.$router.push({ name: 'singleProduct', params: { singleProd: param } })
        },
    },
    setup(){
        const store = useStore();
        return {
            user: computed(() => store.state.user),
            role: computed(() => store.state.role),
            cart: computed(() => store.state.cart)
        }
    },
}

</script>