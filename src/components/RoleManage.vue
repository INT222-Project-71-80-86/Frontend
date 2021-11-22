<template>
    <div v-if="users">
    <div
        class="border-2 border-blue-200 lg:w-4/5 mx-auto flex flex-wrap border-b-2 mt-5"
        v-for="user in users.content"
        :key="user.uid"
    >
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 class="text-black text-3xl font-medium mb-1 -ml-1">{{ user.username }}</h1>
            <div class="flex space-x-2">
                <h2
                    class="text-sm text-black tracking-widest uppercase font-extrabold"
                >{{ user.fname }} {{ user.lname }}</h2>

                <!-- set new role for user -->
                <input
                    v-if="editID == user.uid"
                    v-model="newRole"
                    require
                    type="text"
                    class="py-1 px-1 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent duration-200"
                />

                <h2
                    v-if="editID != user.uid"
                    class="text-sm text-black tracking-widest uppercase font-light"
                >— {{ user.role }}</h2>
            </div>

            <!-- edit -->
            <button
                v-if="!edit"
                class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-500 flex float-right"
                @click="editing(user.uid, user.role)"
            >Edit</button>

            <!-- action when editing -->
            <div v-if="editID == user.uid">
                <button
                    class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-500 flex float-right"
                    @click="makeEditForm(user)"
                >Save</button>
                <button
                    class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-500 flex float-right"
                    @click="cancel"
                >Cancel</button>
            </div>
        </div>
    </div>
    </div>
</template>
<script>import axios from "axios"

export default {
    name: 'RoleManage',

    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
            edit: false,
            newRole: '',
            editID: 0,
            users: null
        }
    },
    methods: {
        async getallusers() {
            let temp = localStorage.getItem('access_token')
            const res = await axios.get(`${this.backend_url}/user/allusers`, { headers: { 'Authorization': `Bearer ${temp}` } })
            this.users = res.data
        },
        editing(editID, role) {
            this.edit = true
            this.editID = editID
            this.newRole = role
        },
        cancel() {
            this.edit = false
            this.editID = 0
        },
        async makeEditForm(user) {
            let newuser = {
                uid: user.uid,
                username: user.username,
                fname: user.fname,
                lname: user.lname,
                dob: user.dob,
                address: user.address,
                email: user.email,
                tel: user.tel,
                role: this.newRole,
                deleted: user.deleted
            };

            await this.saveEditRole(newuser)

            this.edit = false,
            this.newRole = '',
            this.editID = 0

        },

        async saveEditRole(newuser) {
            let temp = localStorage.getItem("access_token")
            const res = axios.put(`${this.backend_url}/user/roleedit`, newuser, { headers: { 'Authorization': `Bearer ${temp}` } }).then(() => {
                alert("Edit Role Successfully")
              
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    alert(error.response.data.message)
                    console.log(error.response.status);
                    console.log(error.response.headers);

                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            console.log(res)  
        },
    },
    async created() {
        await this.getallusers();
    },
}

</script>