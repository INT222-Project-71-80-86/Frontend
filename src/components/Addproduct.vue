<template>
    <nav-bar></nav-bar>
    <div class="flex bg-gray-200 items-center justify-center">
        <div class="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2 mt-5 mb-5">
            <div class="flex justify-center py-4">
                <div class="flex bg-purple-300 rounded-full md:p-4 p-2 border-4 border-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"
                        />
                    </svg>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="flex">
                    <h1 class="text-black font-bold md:text-2xl text-xl">ADD PRODUCT</h1>
                </div>
            </div>
            <form @submit.prevent="submitForm" enctype="multipart/form-data">
                <div class="grid grid-cols-1 mt-5 mx-7">
                    <label
                        class="uppercase md:text-sm text-xs text-black text-light font-semibold"
                    >Product Name</label>
                    <input
                        class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        v-model="name"
                        require
                        type="text"
                        placeholder="Product — Name"
                    />
                    <p
                        v-if="invalidNameInput"
                        class="text-red-500 text-sm font-semibold uppercase"
                    >— &nbsp;&nbsp;Enter Product Name&nbsp;&nbsp; —</p>
                </div>
             
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-5 mx-7">
                    <div class="grid grid-cols-1">
                        <label
                            class="uppercase md:text-sm text-xs text-black text-light font-semibold"
                        >Release Date</label>
                        <input
                            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            type="date"
                            id="date"
                            name="date"
                            v-model="releaseDate"
                        />
                        <p
                            v-if="invalidDateInput"
                            class="text-red-500 text-sm font-semibold uppercase"
                        >— &nbsp;&nbsp;Choose Release Date&nbsp;&nbsp; —</p>
                    </div>
                    <div class="grid grid-cols-1">
                        <label
                            class="uppercase md:text-sm text-xs text-black text-light font-semibold"
                        >Price</label>
                        <input
                            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            type="number"
                            placeholder="Price — THB."
                            step="0.01"
                            min="0"
                            max="10000000"
                            name="price"
                            id="price"
                            v-model="price"
                        />
                        <p
                            v-if="invalidPriceInput"
                            class="text-red-500 text-sm font-semibold uppercase"
                        >— &nbsp;&nbsp;Enter Product Price&nbsp;&nbsp; —</p>
                    </div>
                    <div class="grid grid-cols-1">
                        <label
                            class="uppercase md:text-sm text-xs text-black text-light font-semibold"
                        >Quantity</label>
                        <input
                            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            type="number"
                            v-model="Quantity"
                            placeholder="Quantity — Number"
                        />
                        <p
                            v-if="invalidQuantity"
                            class="text-red-500 text-sm font-semibold uppercase"
                        >— &nbsp;&nbsp;Enter Product Quantity&nbsp;&nbsp; —</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-5 mx-7">
                    <div class="grid grid-cols-1">
                        <label
                            class="uppercase md:text-sm text-xs text-black text-light font-semibold"
                        >CATEGORY</label>
                        <select
                            id="category"
                            name="categoryid"
                            v-model="category"
                            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        >
                            <option disabled value>CATEGORY</option>
                            <option
                                class="duration-200"
                                v-for="category in categories"
                                :key="category.catid"
                                :value="category"
                            >{{ category.name }}</option>
                            
                        </select>
                        
                        <p
                            v-if="invalidCategoryInput"
                            class="text-red-500 text-sm font-semibold uppercase"
                        >— &nbsp;&nbsp;Choose Product Category&nbsp;&nbsp; —</p>
                    </div>
                    <div class="grid grid-cols-1">
                        <label
                            class="uppercase md:text-sm text-xs text-black text-light font-semibold"
                        >BRAND</label>
                        <select
                            id="brand"
                            name="brandid"
                            v-model="brand"
                            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        >
                            <option disabled value>BRAND</option>
                            <option
                                v-for="brand in brands"
                                :key="brand.bid"
                                :value="brand"
                            >{{ brand.name }}</option>
                        </select>
                        <p
                            v-if="invalidBrandInput"
                            class="text-red-500 text-sm font-semibold uppercase"
                        >— &nbsp;&nbsp;Choose Product Brand&nbsp;&nbsp; —</p>
                    </div>
                    <div class="grid grid-cols-1">
                        <label
                            class="uppercase md:text-sm text-xs text-black text-light font-semibold"
                        >Warranty</label>
                        <select
                            id="warranty"
                            name="warranty"
                            v-model="warranty"
                            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        >
                            <option disabled value>Warranty</option>
                            <option value="0">None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <p
                            v-if="invalidWarrantyInput"
                            class="text-red-500 text-sm font-semibold uppercase"
                        >— &nbsp;&nbsp;Choose Product Warranty&nbsp;&nbsp; —</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 mt-5 mx-7">
                    <label
                        class="uppercase md:text-sm text-xs text-black text-light font-semibold"
                    >Color</label>
                    <div class="grid grid-cols-2 md:grid-cols-3 mt-1">
                        <div
                            class="flex items-center space-x-2 space-y-1"
                            v-for="color in colorsDB"
                            :key="color.cid"
                        >
                            <input
                                class="w-6 h-6"
                                type="checkbox"
                                v-model="colors"
                                :value="color.cid"
                            />
                            <div
                                class="color-circle rounded-full w-7 h-7"
                                :style="{ backgroundColor: color.code }"
                            ></div>
                            <span
                                class="uppercase md:text-sm text-xs text-black text-light font-semibold w-48"
                            >{{ color.name }}</span>
                        </div>
                    </div>
                    <p
                        v-if="invalidColorsInput"
                        class="text-red-500 text-sm font-semibold uppercase"
                    >— &nbsp;&nbsp;Choose Product Color&nbsp;&nbsp; —</p>
                </div>

                <div class="grid grid-cols-1 mt-5 mx-7">
                    <label
                        class="uppercase md:text-sm text-xs text-black text-light font-semibold"
                    >Product Description</label>
                    <textarea
                        rows="5"
                        name="description"
                        id="description"
                        v-model="description"
                        placeholder="Enter Description"
                        class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    ></textarea>
                    <p
                        v-if="invalidDescInput"
                        class="text-red-500 text-sm font-semibold uppercase"
                    >— &nbsp;&nbsp;Enter Product Description&nbsp;&nbsp; —</p>
                </div>

                <div class="grid grid-cols-1 mt-5 mx-7">
                    <label
                        class="uppercase md:text-sm text-xs text-black text-light font-semibold mb-1"
                    >Upload Photo</label>
                    <div v-if="!image" class="flex items-center justify-center w-full">
                        <label
                            class="flex flex-col border-4 border-dashed w-full h-64 hover:bg-gray-100 hover:border-purple-300 group duration-300"
                        >
                            <div class="flex flex-col items-center justify-center pt-24">
                                <svg
                                    class="w-10 h-10 text-purple-400 group-hover:text-purple-600 duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <p
                                    class="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider duration-300"
                                >Select a photo</p>
                            </div>
                            <input
                                type="file"
                                class="hidden"
                                id="upload-file"
                                accept="image/*"
                                name="file"
                                @change="loadFile"
                            />
                        </label>
                    </div>
                    <div v-else class="grid items-center justify-center border-4 border-dashed hover:border-purple-500 hover:bg-gray-100 duration-500">
                        <img class="rounded h-96 w-96 mx-auto my-8" :src="getImageUrl(image)" />
                        <button
                            @click="removeimg"
                            class="bg-blue-600 hover:bg-red-500 text-white font-bold py-2 focus:outline-none px-4 rounded-full duration-300 mb-4"
                        >Remove Photo</button>
                    </div>
                    <p
                        v-if="invalidFileInput"
                        class="text-red-500 text-sm font-semibold uppercase"
                    >— &nbsp;&nbsp;Upload Photo of the Product&nbsp;&nbsp; —</p>
                </div>

                <div class="flex items-center justify-center md:gap-8 gap-4 pt-5 pb-5">
                    <router-link :to="{ name: 'showproducts', params: { type: 'all', value: '1' } }">
                        <button
                            class="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2 duration-300"
                        >Cancel</button>
                    </router-link>
                    <button
                        type="submit"
                        class="w-auto bg-purple-500 hover:bg-green-500 rounded-lg shadow-xl font-medium text-white px-4 py-2 duration-300"
                    >Create</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import axios from 'axios';
export default {
    name: 'AddProducts',

    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
            pid: 0, //product code
            image: null,
            name: '',
            releaseDate: null,
            description: '',
            price: 0,
            brand: null,
            warranty: 0,
            Quantity:0,
            colors: [],
            category: null,
            isLocal: false,

            invalidNameInput: false,
            invalidDateInput: false,
            invalidDescInput: false,
            invalidPriceInput: false,
            invalidBrandInput: false,
            invalidFileInput: false,
            invalidWarrantyInput: false,
            invalidColorsInput: false,
            invalidCategoryInput: false,
            uploadFile: null,
            invalidQuantity: false,
        };
    },
    methods: {
        getImageUrl(filename) {
            if (this.isLocal) {
                return this.image
            }
            return `${this.backend_url}/files/${filename}`
        },
        loadFile(e) {
            this.isLocal = true;
            let file = e.target.files[0];
            let data = new FormData();
            data.append("file", file, file.name);
            this.uploadFile = data.get("file")
            this.image = URL.createObjectURL(this.uploadFile);
        },
        removeimg() {
            this.image = null;
        },
        async submitForm() {
            this.invalidNameInput = (this.name === null || this.name.trim() === '') ? true : false;
            this.invalidDateInput = this.releaseDate === null ? true : false;
            this.invalidDescInput = (this.description === "" || this.description.trim() === '') ? true : false;
            this.invalidPriceInput = (this.price <= 0) ? true : false;
            this.invalidQuantity = (this.Quantity <= 0) ? true : false;
            this.invalidBrandInput = this.brand === null ? true : false;
            this.invalidFileInput = this.image === null ? true : false;
            this.invalidWarrantyInput = (this.warranty === null || this.warranty < 0) ? true : false;
            this.invalidColorsInput = (this.colors.length < 1) ? true : false;
            this.invalidCategoryInput = this.category === null ? true : false;
            
            
            if ((!this.invalidNameInput && !this.invalidDateInput && !this.invalidDescInput && !this.invalidPriceInput && !this.invalidBrandInput && !this.invalidFileInput && !this.invalidWarrantyInput && !this.invalidColorsInput && !this.invalidCategoryInput && !this.invalidQuantity)) {
                {
                    this.makeDataForm();
                }

                this.id = null
                this.name = ''
                this.releaseDate = null
                this.description = ''
                this.price = 0
                this.brand = null
                this.warranty = 0
                this.colors = []
                this.image = null
                this.category = null
                
            }
        },
          makeDataForm(){
            // Make product object to send to backend
            let product = { pid: this.pid,
                            name: this.name,
                            releaseDate: this.releaseDate,
                            description: this.description,
                            price: this.price,
                            warranty: this.warranty,
                            image: '',
                            brand: this.brand,
                            category: this.category,
                            amount: this.Quantity,
                            productcolor: [] }
            // Add Colors to productcolors
            this.colors.forEach(c => {
                let color = { color: {cid: c} }
                product.productcolor.push(color)
            });

            const jsonProduct = JSON.stringify(product)
            const blob = new Blob([jsonProduct], {
                type: 'application/json'
            })

            let formData = new FormData()
            formData.append('photo', this.uploadFile) // Add image file
            formData.append('product', blob) // Add blob json file
            console.log(formData)
            console.log(product)
    
                this.saveAddProduct(formData);
                setTimeout(() => this.$router.push({ name: 'showproducts', params: { type: 'all', value: '1' } }), 1000);
        },
        async saveAddProduct(formData) {
            try {
                const res = await axios.post(`${this.backend_url}/product/save`, formData)
                if (res.status != 200) {
                    alert("An Unexpected Error Occured. Response Status: " + res.status)
                } else {
                    alert("Successfully Add Product.")
                }
                
            } catch (error) {
                console.log(error)
            }
        },
    },
    setup() {
    const store = useStore();
    store.dispatch("fetchAllBrands");
    store.dispatch("fetchAllCategories");
    store.dispatch("fetchAllColors");

    return {
      brands: computed(() => store.state.brands),
      categories: computed(() => store.state.categories),
      colorsDB: computed(() => store.state.colors),
    };
  },
}

</script>
