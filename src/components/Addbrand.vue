<template>
<nav-bar />
    <div class="w-1/2 mx-auto">
    <div v-if="!viewADD" class="flex mt-5 justify-end">
    <button @click="enableviewADD()"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-circle-fill hover:text-purple-600 duration-150" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
</svg></button>
</div>
    <div class="flex space-x-3 justify-end" v-if="viewADD">
     <button @click="disableviewADD()"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle-fill hover:text-purple-600 duration-150" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg></button>
<p>
  <input v-model="brandname" require type="text" placeholder="Brand — Name" class="py-1 px-1 border-2 mt-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
        <br /><span v-if="invalidbrandname" class="text-red-500 text-sm font-semibold uppercase">— Require Brand Name —</span>
        <br /><span v-if="duplicatedbrandname" class="text-red-500 text-sm font-semibold uppercase">— Duplicate Brand Name —</span>
          </p>
            <div><button class="text-white font-bold px-2 rounded bg-blue-500 hover:bg-blue-600 duration-300 buttonAdd py-2" @click="FilteraddBrand">Add</button></div>
            <div><button class="text-white font-bold px-2 rounded bg-green-500 hover:bg-green-600 duration-300 buttonAdd py-2" type="reset" @click="resetdata">Clear</button></div>
          </div>
  <div class="bg-white shadow-md rounded my-6">
    <table class="text-left w-full border-collapse">
      <thead>
        <tr>
          <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-3xl text-grey-dark border-b border-grey-light">Brand</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-3xl text-grey-dark border-b border-grey-light">Actions</th>
        </tr>
      </thead>
       <tr class="hover:bg-grey-lighter" >
        </tr>
      <tbody v-for="item in brands" :key="item.bid">
        <tr v-if="editing != item.bid" class="hover:bg-grey-lighter">
          <td class="py-4 px-6 border-b border-grey-light font-bold">{{item.name}}</td>
          <td class="py-4 px-6 border-b border-grey-light space-x-2 text-white">
            <button class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-500 hover:bg-blue-600 duration-300" @click="enableEditing(item.bid, item.name)">Edit</button>
            <button href="#" class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-600 duration-300" @click="deleteBrand(item.bid)">Delete</button>
          </td>
        </tr>
        <tr v-if="editing == item.bid" class="hover:bg-grey-lighter">
          <td class="py-4 px-6 border-b border-grey-light font-bold"><input v-model="editbrand" require type="text" class="py-1 px-1 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent duration-200"/></td>
          <td class="py-4 px-6 border-b border-grey-light space-x-2 text-white">
            <button class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-500 hover:bg-blue-600 duration-300" @click="editBrand(item.bid)">Save</button>
            <button href="#" class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-600 duration-300" @click="disableEditing">Cancel</button>
          </td>
        </tr>
        <p v-if="editing == item.bid && editDuplicatedBrandName" class="text-red-600">Duplicate Brand name</p>
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
    
    name: "Addbrand",
    data() {
    return {
      brandname: '',
      invalidbrandname: false,
      duplicatedbrandname: false,
      editDuplicatedBrandName: false,
      backend_url: process.env.VUE_APP_BACKEND_URL,
      editing: -1,
      editbrand: null,
      viewADD: false,
    };
  },

  methods:{
     FilteraddBrand(){
         this.invalidbrandname = (this.brandname === null || this.brandname.trim() === '') ? true : false;
          if(!this.invalidbrandname){
            this.addBrand()
          }
        
      },

   resetdata(){
       this.invalidbrandname = false
       this.brandname = ''
   },
   enableEditing(pid, name){
      this.editing = pid
      this.editbrand = name
   },
   disableEditing(){
      this.editbrand = '';
      this.editing = -1;
      this.editDuplicatedBrandName = false;
   },
   enableviewADD(){
     this.viewADD = true
   },
   disableviewADD(){
     this.viewADD = false
   },
   async addBrand() {
      let brand = { bid:0, name:this.brandname, deleted:0 }
      let check = false;
       let access_token = localStorage.getItem("access_token")
                const res = await axios.post(`${this.backend_url}/brand/save`, brand, { headers: { 'Authorization': `Bearer ${access_token}` } }).catch(function (error) {
      if (error) {
        console.log("ERROR HERE")
        console.log(error)
          console.log(error.response);
          alert("An Unexpected Error Occured. Response Status: " + error.response.status)
          check = true;
      }
    })
                if (res) {
                   alert("Successfully Add brand.")
                   console.log(res.data)
                  this.$store.dispatch('fetchAllBrands')
                } 
                this.duplicatedbrandname = check
   },
   async editBrand(brandId) {
      let brand = { bid:brandId, name:this.editbrand, deleted:0 }
      let check = false;
       let access_token = localStorage.getItem("access_token")
                const res = await axios.put(`${this.backend_url}/brand/edit`, brand, { headers: { 'Authorization': `Bearer ${access_token}` } }).catch(function (error) {
      if (error) {
        console.log("ERROR HERE")
        console.log(error)
          console.log(error.response);
          alert("An Unexpected Error Occured. Response Status: " + error.response.status)
          check = true;
      }
    })
                if (res) {
                   alert("Successfully Edit brand.")
                   console.log(res.data)
                   this.$store.dispatch('fetchAllBrands')
                   this.disableEditing()
                } 
                this.editDuplicatedBrandName = check
   },
   async deleteBrand(brandId) {
      let check = confirm("Do you want to delete this brand");
      if(!check){return}
       let access_token = localStorage.getItem("access_token")
                const res = await axios.delete(`${this.backend_url}/brand/delete/${brandId}`, { headers: { 'Authorization': `Bearer ${access_token}` } }).catch(function (error) {
      if (error) {
        console.log("ERROR HERE")
        console.log(error)
          console.log(error.response);
          alert("An Unexpected Error Occured. Response Status: " + error.response.status)
          check = true;
      }
    })
                if (res) {
                   alert("Successfully Delete brand.")
                   console.log(res.data)
                   this.$store.dispatch('fetchAllBrands')
                } 

   }
  },
    setup(){
    const store = useStore();
    store.dispatch('fetchAllBrands')
    return {
      brands: computed(() => store.state.brands),
      user: computed(() => store.state.user),
      role: computed(() => store.state.role)
    }
  },
}
</script>
<style scoped>
  .buttonAdd {
    margin-top: 22px
  }
</style>