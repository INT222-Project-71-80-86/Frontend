<template>
  <nav-bar></nav-bar>
    <div
        class="flex items-center min-h-screen mt-2"
        style="background-image: url('https://images.unsplash.com/photo-1493514789931-586cb221d7a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80');"
    >
        <div class="flex justify-center container mx-auto">
            <div class="md:w-4/5 lg:w-2/5 rounded-2xl my-10 bg-white p-3 shadow-sm">
                <div class="m-5">
                    <form @submit.prevent="submitForm" enctype="multipart/form-data">
                        <!-- prod Name -->
                        <div class="mb-6">
                            <label
                                for="name"
                                class="block mb-2 text-sm text-black font-medium"
                            >Product Name</label>
                            <input
                                type="text"
                                name="name"
                                v-model="name"
                                id="name"
                                class=" px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                require
                            />
                            <p v-if="invalidNameInput" class="text-red-500">Please, Enter your Name</p>
                        </div>

                        <!-- prod Date -->
                        <div class="mb-6">
                            <label
                                for="date"
                                class="block mb-2 text-sm text-black font-medium"
                            >Release Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                min="2021-01-01"
                                max="2028-12-31"
                                v-model="releaseDate"
                            />
                            <p
                                v-if="invalidDateInput"
                                class="text-red-500"
                            >Please, Enter your Release Date</p>
                        </div>

                        <!-- prod Amount -->
                        <div class="mb-6">
                            <label
                                for="date"
                                class="block mb-2 text-sm text-black font-medium"
                            >Quantity</label>
                        <input
                            type="number"
                            value="Quantity"
                            class=" font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black"
                        />
                        </div>
                        <!-- prod Description -->
                        <div class="mb-6">
                            <label
                                for="description"
                                class="block mb-2 text-sm text-black font-medium"
                            >Product Description</label>
                            <textarea
                                rows="5"
                                name="description"
                                id="description"
                                v-model="description"
                                placeholder="Enter Description"
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                            ></textarea>

                            <p
                                v-if="invalidDescInput"
                                class="text-red-500"
                            >Please, Enter your Description</p>
                        </div>

                        <!-- brand -->
                        <div>
                            <div class="relative inline-flex pb-6">
                                <svg
                                    class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 412 232"
                                >
                                    <path
                                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                        fill="#648299"
                                        fill-rule="nonzero"
                                    />
                                </svg>
                                <select
                                    id="brand"
                                    name="brandid"
                                    v-model="brandid"
                                    class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                >
                                    <option selected disabled hidden>Brand</option>
                                    <option
                                        v-for="brand in brandsDB"
                                        :key="brand.brandid"
                                        :value="brand.brandid"
                                    >{{ brand.name }}</option>
                                </select>
                            </div>
                            <p
                                v-if="invalidBrandInput"
                                class="text-red-500"
                            >Please, Enter your Brand</p>
                        </div>

                        <!-- choose file -->
                        <div id="mb-6 ">
                            <div v-if="!image">
                                <label
                                    class="block mb-2 text-sm text-black font-medium pb-5"
                                    for="file"
                                >Upload Image</label>
                                <div id="preview">
                                    <img
                                        class="rounded h-48 w-48 mx-auto my-8"
                                        v-if="image"
                                        :src="getImageUrl(image)"
                                    />
                                </div>
                                <input
                                    type="file"
                                    id="upload-file"
                                    accept="image/*"
                                    name="file"
                                    class="text-gray-600 h-10 pl-5 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                    @change="loadFile"
                                />
                            </div>
                            <div v-else>
                                <img
                                    class="rounded h-48 w-48 mx-auto my-8"
                                    :src="getImageUrl(image)"
                                />
                                <button
                                    @click="removeimg"
                                    class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 focus:outline-none px-4 border-b-4 border-blue-dark hover:border-blue rounded"
                                >Remove image</button>
                            </div>
                            <p v-if="invalidFileInput" class="text-red-500">Please, Enter your File</p>
                        </div>

                        <!-- price -->
                        <div class="flex justify-center items-center my-6 text-black font-medium">
                            <label
                                for="price"
                                class="pl-4 block mb-2 text-sm text-black font-medium"
                            >Price</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="10000000"
                                name="price"
                                id="price"
                                v-model="price"
                                class="mx-10 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                            />
                        </div>
                        <p v-if="invalidPriceInput" class="text-red-500">Please, Enter your Price</p>

                        <!-- warranty -->
                        <div class="flex flex-col my-4">
                            <p class="flex justify-start text-sm text-black font-medium">Warranty</p>
                            <label class="inline-flex items-center mt-3">
                                <input
                                    type="radio"
                                    class="form-checkbox h-5 w-5 text-gray-600"
                                    id="warranty"
                                    v-model="warranty"
                                    value="0"
                                />
                                <span class="ml-2 text-gray-700">None</span>
                            </label>
                            <label class="inline-flex items-center mt-3">
                                <input
                                    type="radio"
                                    class="form-checkbox h-5 w-5 text-gray-600"
                                    id="warranty1"
                                    v-model="warranty"
                                    value="1"
                                />
                                <span class="ml-2 text-gray-700">1 Year</span>
                            </label>
                            <label class="inline-flex items-center mt-3">
                                <input
                                    type="radio"
                                    class="form-checkbox h-5 w-5 text-gray-600"
                                    id="warranty2"
                                    v-model="warranty"
                                    value="2"
                                />
                                <span class="ml-2 text-gray-700">2 Years</span>
                            </label>
                            <p
                                v-if="invalidWarrantyInput"
                                class="text-red-500"
                            >Please, Select warranty</p>
                        </div>

                        <!-- Color -->

                        <div class>
                            <span class="mr-3 block mb-2 text-sm text-black font-medium">Color</span>
                            <div class="flex flex-col space-y-3 justify-items-start">
                                <div
                                    class="flex items-center justify-start space-x-3"
                                    v-for="color in colorsDB"
                                    :key="color.colorid"
                                >
                                    <input
                                        class="w-6 h-6"
                                        type="checkbox"
                                        v-model="colors"
                                        :value="color.colorid"
                                    />
                                    <div
                                        class="color-circle rounded-full w-8 h-8 border-2 border-black"
                                        :style="{ backgroundColor: color.colorcode }"
                                    ></div>
                                    <span>{{ color.name }}</span>
                                </div>
                                <p
                                    v-if="invalidColorsInput"
                                    class="text-red-500"
                                >Please, Select at least one color.</p>
                            </div>
                        </div>

                        <!-- submit -->
                        <div class="mb-6 my-6 space-x-3">
                            <button
                                type="submit"
                                class="w-40 px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                            >Apply</button>
                            <router-link to="/"><button
                                class="w-40 px-3 py-4 text-white bg-red-500 rounded-md hover:bg-red-700"
                            >Cancel</button></router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    name: 'AddProducts',

    data() {
        return {
            urlJson: "http://",
            pid: 0, //product code
            image: null,
            name: '',
            releaseDate: null,
            description: '',
            price: 0,
            brandid: 0,
            warranty: 0,
            Quantity:0,
            colors: [],

            brandsDB: [],
            colorsDB: [],
            isLocal: false,

            invalidNameInput: false,
            invalidDateInput: false,
            invalidDescInput: false,
            invalidPriceInput: false,
            invalidBrandInput: false,
            invalidFileInput: false,
            invalidWarrantyInput: false,
            invalidColorsInput: false,
            uploadFile: null
        };
    },
    methods: {
        getImageUrl(filename) {
            if (this.isLocal) {
                return this.image
            }
            return `http://52.148.79.33:8083/files/${filename}`
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
            this.invalidBrandInput = this.brandid === 'Brand' ? true : false;
            this.invalidFileInput = this.image === null ? true : false;
            this.invalidWarrantyInput = (this.warranty === null || this.warranty < 0) ? true : false;
            this.invalidColorsInput = (this.colors.length < 1) ? true : false;

            if ((!this.invalidNameInput && !this.invalidDateInput && !this.invalidDescInput && !this.invalidPriceInput && !this.invalidBrandInput && !this.invalidFileInput && !this.invalidWarrantyInput && !this.invalidColorsInput)) {
                {
                    this.makeDataForm();
                }

                this.id = null
                this.name = ''
                this.releaseDate = null
                this.description = ''
                this.price = 0
                this.brandid = 'Brand'
                this.warranty = 0
                this.colors = []
                this.image = null

            }
        },
          makeDataForm(){
            // Make product object to send to backend
            let product = { pid: this.pid,
                            name: this.name,
                            releaseDate: this.releaseDate,
                            description: this.description,
                            price: this.price,
                            brandid: this.brandid,
                            warranty: this.warranty,
                            image: '',
                            productcolors: [] }
            // Add Colors to productcolors
            this.colors.forEach(c => {
                let color = { colors: {colorid: c} }
                product.productcolors.push(color)
            });

            const jsonProduct = JSON.stringify(product)
            const blob = new Blob([jsonProduct], {
                type: 'application/json'
            })

            let formData = new FormData()
            formData.append('file', this.uploadFile) // Add image file
            formData.append('product', blob) // Add blob json file

            // Split to POST or PUT
            if(this.isedit){
                // If editing go PUT
                this.saveEditProduct(formData);
            } else {
                // Else go POST
                this.saveAddProduct(formData);
            }
        },
        async getAllBrands() {
            try {
                const res = await fetch(`${this.urlJson}/brands`)
                const data = await res.json()
                return data
            } catch (error) {
                console.log(`Can not get brands.`)
            }
        },
        async getAllColors() {
            try {
                const res = await fetch(`${this.urlJson}/colors`)
                const data = await res.json()
                return data
            } catch (error) {
                console.log(`Can not get colors.`)
            }
        },
        async saveAddProduct(formData) {
            try {
                const res = await fetch(`${this.urlJson}/save`, {
                    method: 'POST',
                    body: formData
                })
                if (res.status != 200) {
                    alert("An Unexpected Error Occured. Response Status: " + res.status)
                } else {
                    alert("Successfully Add Product.")
                }
                this.back();
            } catch (error) {
                console.log(error)
            }
        },
    },
    async created() {
        if (this.product != null) {
            this.fillForm(this.product);
        }
        this.brandsDB = await this.getAllBrands()
        this.colorsDB = await this.getAllColors()
    }

}

</script>
