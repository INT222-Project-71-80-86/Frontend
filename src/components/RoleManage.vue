<template>
    <div id="roleManage" class="mx-auto w-4/6 mt-5 pt-5">
        <div id="roleManageHeader" class="my-2">
        </div>
        <div id="roleManageUserList" class="mx-auto w-5/6" v-if="users">
            <div id="roleManagerListHeader" class="row bg-gray-600 py-2 text-white rounded-t-lg">
                <div class="col-3">Username</div>
                <div class="col-4">Name</div>
                <div class="col">Role</div>
                <div class="col">Actions</div>
            </div>
            <div class="row py-2" v-for="(u,index) in users" :key="u.uid"  :class="{'bg-gray-200': index%2 == 0}">
                <div class="col-3">{{ u.username }}</div>
                <div class="col-4">{{ u.fname }} {{ u.lname }}</div>
                <div v-if="isEdit!=u.uid" class="col">{{ u.role.substr(5) }}</div>
                <div class="col" v-else>
                    <select v-model="editedRole">
                        <option value="ROLE_ADMIN" :disabled="u.role == 'ROLE_ADMIN'" :class="{'bg-gray-300': u.role == 'ROLE_ADMIN'}">ADMIN</option>
                        <option value="ROLE_STAFF" :disabled="u.role == 'ROLE_STAFF'" :class="{'bg-gray-300': u.role == 'ROLE_STAFF'}" >STAFF</option>
                        <option value="ROLE_CUSTOMER" :disabled="u.role == 'ROLE_CUSTOMER'"  :class="{'bg-gray-300': u.role == 'ROLE_CUSTOMER'}">CUSTOMER</option>
                    </select>
                </div>
                <div class="col">    
                    <button @click="toggleRoleEdit(u)" v-if="isEdit != u.uid && u.uid != user.uid">
                        <span class="material-icons transition duration-200 text-green-400 hover:text-green-500">edit</span>
                    </button>
                    <button @click="saveRoleEdit(u)" v-if="isEdit == u.uid">
                        <span class="material-icons transition duration-200 text-blue-500 hover:text-blue-700">save</span>
                    </button>
                    <button @click="cancelRoleEdit" v-if="isEdit == u.uid">
                        <span class="material-icons transition duration-200 text-red-400 hover:text-red-500">cancel</span>
                    </button>
                </div>
            </div>
        </div>
        <div id="roleManagePaging" class="mt-8 pb-4">
            <div class="flex space-x-5 justify-center">
            <button
                @click="fetchUsers(i)"
                v-for="i in pageTotal"
                :key="i"
                class="w-10 h-8 align-middle text-black border"
                :class="{ 'bg-green-400': checkCurrentPage(i) }"
            >{{ i }}</button>
            </div>
        </div>
    </div>
    
</template>
<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
    name: 'RoleManage',

    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
            isEdit: -1,
            editedRole: null,
        }
    },
    methods: {
        checkCurrentPage(i){
            return this.pageInfo.pageNumber+1 == i 
        },
        fetchUsers(pageNo = 1) {
            this.$store.dispatch('fetchAllUsers', pageNo)
            return {
                users: computed(() => this.$store.state.pagingItems.content)
            }
        },
        toggleRoleEdit(user){
            this.isEdit = user.uid
            this.editedRole = user.role
        },
        cancelRoleEdit(){
            this.isEdit = -1 
            this.editedRole = null
        },
        saveRoleEdit(user){
            if(this.editedRole == null || this.editedRole == user.role){
                return
            }
            let editedUser = Object.assign({}, user)
            editedUser.role = this.editedRole
            if(confirm(`Do you want to change role of user "${user.username}"\nfrom ${user.role.substr(5)} to ${this.editedRole.substr(5)}?`)){
                this.saveRoleUser(editedUser)
            }
            this.cancelRoleEdit()
        },
        async saveRoleUser(user){
            const access_token = localStorage.getItem("access_token")
            const response = await axios.put(`${this.backend_url}/user/roleedit`, user, {headers: {"Authorization": `Bearer ${access_token}`}}).catch(function (error) {
                if(error){
                    alert(error.response.data.message)
                }
            })

            if(response != undefined && response.status == 200){
                alert("Successfully changed role")
                this.$store.dispatch("fetchAllUsers", this.currentPage)
            }
        }
    },
    setup() {
        const store = useStore();
        store.dispatch("fetchAllUsers", 1);
        return {
            users: computed(() => store.state.pagingItems.content),
            pageInfo: computed(() => store.state.pagingItems.pageable),
            pageTotal: computed(() => store.state.pagingItems.totalPages),
            currentPage: computed(() => store.state.currentPage),
            pageSize: computed(() => store.state.pagingItems.numberOfElements),
            allSize: computed(() => store.state.pagingItems.totalElements),
            user: computed(() => store.state.user),
        }
    },
}

</script>