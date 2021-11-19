<template>
    <nav-bar />
    <div class="w-1/2 mx-auto">
        <div v-if="!viewADD" class="flex mt-5 justify-end">
            <button @click="enableviewADD()">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    class="bi bi-plus-circle-fill hover:text-purple-600 duration-150"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                    />
                </svg>
            </button>
        </div>
        <div class="flex space-x-3 justify-end" v-if="viewADD">
            <button @click="disableviewADD()">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    class="bi bi-arrow-left-circle-fill hover:text-purple-600 duration-150"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                    />
                </svg>
            </button>

            <p>
                <input
                    v-model="this.colorname"
                    require
                    type="text"
                    placeholder="color — Name"
                    class="py-1 px-1 border-2 mt-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <br />
                
                <span
                    v-if="invalidcolorname"
                    class="text-red-500 text-sm font-semibold uppercase"
                >— Require color Name —</span>
                <br />
                <span
                    v-if="duplicatedcolorname"
                    class="text-red-500 text-sm font-semibold uppercase"
                >— Duplicate color Name —</span>
            </p>
            <input type="color" id="colorInput" v-model="colorpicker"  class="bg-white colorbutton">
            <div>
                <button
                    class="text-white font-bold px-2 rounded bg-blue-500 hover:bg-blue-600 duration-300 buttonAdd py-2"
                    @click="FilteraddColor"
                >Add</button>
            </div>
            <div>
                <button
                    class="text-white font-bold px-2 rounded bg-green-500 hover:bg-green-600 duration-300 buttonAdd py-2"
                    type="reset"
                    @click="resetdata"
                >Clear</button>
            </div>
            
        </div>

        <div class="bg-white shadow-md roundewd my-6">
            <table class="text-left w-full border-collapse">
                <thead>
                    <tr>
                        <th
                            class="py-4 px-6 bg-grey-lightest font-bold uppercase text-3xl text-grey-dark border-b border-grey-light"
                        >color</th>
                        <th
                            class="py-4 px-6 bg-grey-lightest font-bold uppercase text-3xl text-grey-dark border-b border-grey-light"
                        >Actions</th>
                    </tr>
                </thead>
                <tr class="hover:bg-grey-lighter"></tr>
                <tbody v-for="item in colors" :key="item.cid">
                    <tr v-if="editing != item.cid" class="hover:bg-grey-lighter">
                        
                        <td class="py-4 px-6 border-b border-grey-light font-bold flex space-x-2">
                            <div class="w-7 h-7 border-2 border-transparent" :style="{ backgroundColor: item.code }"></div><span>{{ item.name }}</span></td>
                        <td class="py-4 px-6 border-b border-grey-light space-x-2 text-white">
                            <button
                                class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-500 hover:bg-blue-600 duration-300"
                                @click="enableEditing(item)"
                            >Edit</button>
                            <button
                                href="#"
                                class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-600 duration-300"
                                @click="deleteColor(item.cid)"
                            >Delete</button>
                        </td>
                    </tr>
                    <tr v-if="editing == item.cid" class="hover:bg-grey-lighter">
                        <td class="py-4 px-6 border-b border-grey-light font-bold flex space-x-3">
                            <input type="color" v-model="editcolorpicker" class="mt-2 w-7 h-7 border-2 border-transparent" :style="{ backgroundColor: item.code }">
                           
                            <input
                                v-model="editcolor"
                                require
                                type="text"
                                class="py-1 px-1 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent duration-200"
                            />
                        </td>
                        <td class="py-4 px-6 border-b border-grey-light space-x-2 text-white">
                            <button
                                class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-500 hover:bg-blue-600 duration-300"
                                @click="editColor"
                            >Save</button>
                            <button
                                href="#"
                                class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-600 duration-300"
                                @click="disableEditing"
                            >Cancel</button>
                        </td>
                    </tr>
                    <p
                        v-if="editing == item.cid && editDuplicatedcolorName"
                        class="text-red-600"
                    >Duplicate color name</p>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import axios from 'axios';
export default {
    name: "Addcolor",
    data() {
        return {
            colorname: '',
            invalidcolorname: false,
            duplicatedcolorname: false,
            editDuplicatedcolorName: false,
            backend_url: process.env.VUE_APP_BACKEND_URL,
            editing: -1,
            editcolor: null,
            viewADD: false,
            colorpicker: '#FFFFFF',
            editcolorpicker: '#FFFFFF'
            
        };
    },
    methods: {
        FilteraddColor() {
            this.invalidcolorname = (this.colorname === null || this.colorname.trim() === '') ? true : false;
            if (!this.invalidcolorname) {
                this.addColor()
            }
        },
        resetdata() {
            this.invalidcolorname = false
            this.colorname = ''
            this.duplicatedcolorname = false
            document.getElementById('colorInput').value = '#FFFFFF'
        },
        enableEditing(color) {
            this.editing = color.cid
            this.editcolor = color.name
            this.editcolorpicker = color.code
        },
        disableEditing() {
            this.editcolor = '';
            this.editing = -1;
            this.editDuplicatedcolorName = false;
        },
        enableviewADD() {
            this.viewADD = true
        },
        disableviewADD() {
            this.viewADD = false
        },
        async addColor() {
            let color = { cid: 0, name: this.colorname,code: this.colorpicker, deleted: 0 }
            let check = false;
            let access_token = localStorage.getItem("access_token")
            const res = await axios.post(`${this.backend_url}/color/save`, color, { headers: { 'Authorization': `Bearer ${access_token}` } }).catch(function (error) {
                if (error) {
                    console.log("ERROR HERE")
                    console.log(error.request)
                    console.log(error.response.data.message);
                    alert(error.response.data.message)
                    check = true;
                }
            })
            if (res) {
                alert("Successfully Add color.")
                console.log(res.data)
                this.$store.dispatch('fetchAllColors')
            }
            this.duplicatedcolorname = check
        },
        async editColor() {
            let color = { cid: this.editing, name: this.editcolor, code: this.editcolorpicker, deleted: 0 }
            let check = false;
            let access_token = localStorage.getItem("access_token")
            const res = await axios.put(`${this.backend_url}/color/edit`, color, { headers: { 'Authorization': `Bearer ${access_token}` } }).catch(function (error) {
                if (error) {
                    console.log("ERROR HERE")
                    console.log(error)
                    console.log(error.response);
                    alert("An Unexpected Error Occured. Response Status: " + error.response.status)
                    check = true;
                }
            })
            if (res) {
                alert("Successfully Edit color.")
                console.log(res.data)
                this.$store.dispatch('fetchAllColors')
                this.disableEditing()
            }
            this.editDuplicatedcolorName = check
        },
        async deleteColor(colorId) {
            let check = confirm("Do you want to delete this color");
            if (!check) { return }
            let access_token = localStorage.getItem("access_token")
            const res = await axios.delete(`${this.backend_url}/color/delete/${colorId}`, { headers: { 'Authorization': `Bearer ${access_token}` } }).catch(function (error) {
                if (error) {
                    console.log("ERROR HERE")
                    console.log(error)
                    console.log(error.response);
                    alert("An Unexpected Error Occured. Response Status: " + error.response.status)
                    check = true;
                }
            })
            if (res) {
                alert("Successfully Delete color.")
                console.log(res.data)
                this.$store.dispatch('fetchAllColors')
            }
        }
    },
    setup() {
        const store = useStore();
        store.dispatch('fetchAllColors')
        return {
            colors: computed(() => store.state.colors),
            user: computed(() => store.state.user),
            role: computed(() => store.state.role)
        }
    },
}
</script>
<style scoped>
.buttonAdd {
    margin-top: 22px;
}
.colorbutton {
    position: relative;
    margin-top: 28px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>