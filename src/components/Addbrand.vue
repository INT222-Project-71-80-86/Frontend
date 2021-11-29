<template>
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
          v-model="brandname"
          require
          type="text"
          placeholder="Brand — Name"
          class="py-1 px-1 border-2 mt-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <br />
        <span
          v-if="invalidbrandname"
          class="text-red-500 text-sm font-semibold uppercase"
        >— Require Brand Name —</span>
        <br />
        <span
          v-if="duplicatedbrandname"
          class="text-red-500 text-sm font-semibold uppercase"
        >— Duplicate Brand Name —</span>
      </p>
      <div>
        <button
          class="text-white font-bold px-2 rounded bg-blue-500 hover:bg-blue-600 duration-300 buttonAdd py-2"
          @click="FilteraddBrand"
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
    <div class="bg-white shadow-md rounded my-6">
      <table class="text-left w-full border-collapse" v-if="brands">
        <thead>
          <tr>
            <th
              class="py-4 px-6 bg-grey-lightest font-bold uppercase text-3xl text-grey-dark border-b border-grey-light"
            >Brand</th>
            <th
              class="py-4 px-6 bg-grey-lightest font-bold uppercase text-3xl text-grey-dark border-b border-grey-light"
            >Actions</th>
          </tr>
        </thead>
        <tr class="hover:bg-grey-lighter"></tr>
          <tbody v-for="item in brands" :key="item.bid">
            <tr v-if="editing != item.bid" class="hover:bg-grey-lighter">
              <td class="py-4 px-6 border-b border-grey-light font-bold">{{ item.name }}</td>
              <td class="py-4 px-6 border-b border-grey-light space-x-2 text-white">
                <button
                  class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-500 hover:bg-blue-600 duration-300"
                  @click="enableEditing(item.bid, item.name)"
                >Edit</button>
                <button
                  href="#"
                  class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-600 duration-300"
                  @click="deleteBrand(item.bid)"
                >Delete</button>
              </td>
            </tr>
            <tr v-if="editing == item.bid" class="hover:bg-grey-lighter">
              <td class="py-4 px-6 border-b border-grey-light font-bold">
                <input
                  v-model="editbrand"
                  require
                  type="text"
                  class="py-1 px-1 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent duration-200"
                />
              </td>
              <td class="py-4 px-6 border-b border-grey-light space-x-2 text-white">
                <button
                  class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-500 hover:bg-blue-600 duration-300"
                  @click="editBrand(item.bid)"
                >Save</button>
                <button
                  href="#"
                  class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-600 duration-300"
                  @click="disableEditing"
                >Cancel</button>
              </td>
            </tr>
            <p
              v-if="editing == item.bid && editDuplicatedBrandName"
              class="text-red-600"
            >Duplicate Brand name</p>
            <p
              v-if="editing == item.bid && invalidEditBrandName"
              class="text-red-600"
            >Invalid Brand name</p>
          </tbody>
      </table>

      <div id="paging" class="mt-8 pb-3">
        <div class="flex space-x-5 justify-center">
          <button
            @click="fetchBrand(i)"
            v-for="i in pageTotal"
            :key="i"
            class="w-10 h-8 align-middle text-black border"
            :class="{ 'bg-green-400': checkCurrentPage(i) }"
          >{{ i }}</button>
        </div>
      </div>  

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
      invalidEditBrandName: false,
      backend_url: process.env.VUE_APP_BACKEND_URL,
      editing: -1,
      editbrand: '',
      viewADD: false,
    };
  },
  methods: {
    FilteraddBrand() {
      this.invalidbrandname = (this.brandname === null || this.brandname.trim() === '') ? true : false;
      if (!this.invalidbrandname) {
        this.addBrand()
      }
    },
    resetdata() {
      this.invalidbrandname = false
      this.brandname = ''
    },
    resetInvalidEdit(){
      this.invalidEditBrandName = false
      this.editDuplicatedBrandName = false
    },
    enableEditing(pid, name) {
      this.resetInvalidEdit()
      this.editing = pid
      this.editbrand = name
    },
    disableEditing() {
      this.editbrand = '';
      this.editing = -1;
      this.resetInvalidEdit()
    },
    enableviewADD() {
      this.viewADD = true
    },
    disableviewADD() {
      this.viewADD = false
    },
    checkCurrentPage(i){
      return this.pageInfo.pageNumber+1 == i 
    },
    fetchBrand(pageNo = 1) {
        this.$store.dispatch('fetchAllBrandsPaging', pageNo)
      return {
        brands: computed(() => this.$store.state.pagingItems.content)
      }
    },
    async addBrand() {
      let brand = { bid: 0, name: this.brandname, deleted: 0 }
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
      if (res != undefined && res.status == 200) {
        alert("Successfully Add brand.")
        let page = this.allSize%5 == 0 ? this.pageTotal + 1 : this.pageTotal
        this.$store.dispatch('fetchAllBrandsPaging', page)
        this.$store.dispatch('fetchAllBrands')
      }
      this.duplicatedbrandname = check
    },
    async editBrand(brandId) {
      this.resetInvalidEdit()
      this.invalidEditBrandName = (this.editbrand === '' || this.editbrand.trim() === '') ? true : false;
      if(this.invalidEditBrandName){
        return
      }
      let brand = { bid: brandId, name: this.editbrand, deleted: 0 }
      let check = false;
      let access_token = localStorage.getItem("access_token")
      const res = await axios.put(`${this.backend_url}/brand/edit`, brand, { headers: { 'Authorization': `Bearer ${access_token}` } }).catch(function (error) {
        if (error) {
          alert("An Unexpected Error Occured. " + error.response.data.message)
          check = true;
        }
      })
      if (res != undefined && res.status == 200) {
        alert("Successfully Edit brand.")
        this.$store.dispatch('fetchAllBrandsPaging', this.currentPage)
        this.$store.dispatch('fetchAllBrands')
        this.disableEditing()
      }
      this.editDuplicatedBrandName = check
    },
    async deleteBrand(brandId) {
      let check = confirm("Do you want to delete this brand");
      if (!check) { return }
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
      if (res != undefined && res.status == 200) {
        alert("Successfully Delete brand.")
        let page = this.pageSize <= 1 ? this.currentPage-1 : this.currentPage
        this.$store.dispatch('fetchAllBrandsPaging', page)
        this.$store.dispatch('fetchAllBrands')
      }
    }
  },
  setup() {
    const store = useStore();
    store.dispatch('fetchAllBrandsPaging', 1)
    return {
      brands: computed(() => store.state.pagingItems.content),
      pageInfo: computed(() => store.state.pagingItems.pageable),
      pageTotal: computed(() => store.state.pagingItems.totalPages),
      currentPage: computed(() => store.state.currentPage),
      pageSize: computed(() => store.state.pagingItems.numberOfElements),
      allSize: computed(() => store.state.pagingItems.totalElements),
      user: computed(() => store.state.user),
      role: computed(() => store.state.role),
    }
  },
}
</script>
<style scoped>
.buttonAdd {
  margin-top: 22px;
}
</style>