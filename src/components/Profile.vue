<template>
    <nav-bar />
    <div
        class="min-h-screen flex flex-col max-w-2xl mx-auto bg-gray-200 opacity-100 font-poppins px-4 bg-no-repeat bg-cover bg-center"
    >
        <div class="flex justify-between px-1 pt-4 items-center">
            <div>
                <p class="font-semibold">My Profile</p>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    />
                </svg>
            </div>
        </div>
        <!-- User image -->
        <div class="flex items-center px-4 pt-12 justify-between">
            <div class="w-24 h-24 bg-blue-600 flex items-center rounded-full">
                <img
                    class="h-20 w-20 mx-auto"
                    src="https://lnmlpexiwaspywjbwwvd.supabase.in/storage/v1/object/sign/assets/boy.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvYm95LnBuZyIsImlhdCI6MTYzMzUzMzk2NywiZXhwIjoxOTQ4ODkzOTY3fQ.HL6DqbdJMCZI6dqEN-ZQAu5EwtblW7r8YNuud4_kHV8"
                />
            </div>
            <!-- User details -->
            <div class="w-9/12 flex items-center">
                <div class="w-10/12 flex flex-col leading-none pl-4">
                    <div v-if="!edit">
                        <p class="text-2xl font-bold">{{ user.fname }} {{ user.lname }}</p>
                        <p class="text-sm pt-1 font-light text-gray-700">{{ user.role }}</p>
                        <p class="text-xl">Date of birth : {{ user.dob }}</p>
                        <p class="text-xl">Adress : {{ user.address }}</p>
                        <p class="text-xl">Email : {{ user.email }}</p>
                        <p class="text-xl">Tel : {{ user.tel }}</p>
                    </div>
                    <div v-else>
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                        >First Name</label>
                        <input
                            class="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            v-model="this.profile.fname"
                            required
                            placeholder="Firstname"
                        />
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                        >Last Name</label>
                        <input
                            class="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            v-model="this.profile.lname"
                            required
                            placeholder="Lastname"
                        />
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                        >Address</label>
                        <input
                            class="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            v-model="this.profile.address"
                            required
                            placeholder="Address"
                        />
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                        >Email</label>
                        <input
                            class="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            v-model="this.profile.email"
                            required
                            placeholder="Email"
                        />
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                        >Telephone Number</label>
                        <input
                            class="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            v-model="this.profile.tel"
                            required
                            placeholder="Telephone Number"
                        />
                        <button 
                        class="bg-blue-800 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                        @click="makeDataForm"
                        >Button</button>
                    </div>
                </div>
                <!-- Edit details -->
                <div class="w-2/12">
                    <div>
                        <button @click="editProfile">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="text-gray-700"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/reactivity'
import axios from 'axios';
import { useStore } from 'vuex'

export default {
    name: "Addbrand",
    data() {
        return {
            edit: false,
            profile: {
                uid: '',
                username: '',
                fname: '',
                lname: '',
                dob: '',
                address: '',
                email: '',
                tel: '',
                role: '',
                deleted: ''
            },
            backend_url: process.env.VUE_APP_BACKEND_URL,
        };
    },
    methods: {
        editProfile() {
            this.edit = true
            this.profile = this.user
            // this.makeDataForm();
        },
        async makeDataForm() {
            // Make profile object to send to backend
            let profile = {
                uid: this.profile.uid,
                username: this.profile.username,
                fname: this.profile.fname,
                lname: this.profile.lname,
                dob: this.profile.dob,
                address: this.profile.address,
                email: this.profile.email,
                tel: this.profile.tel,
                role: this.profile.role,
                deleted: this.profile.deleted
            };

            const jsonProfile = JSON.stringify(profile);
            const blob = new Blob([jsonProfile], {
                type: "application/json",
            });

            let formData = new FormData();
            formData.append("profile", blob);
            formData.append("username", this.profile.username)
            // await this.saveEditProfile(formData);
            await this.saveEditProfile(profile);

        },
        async saveEditProfile(formData) {
            const res = axios.put(`${this.backend_url}/user/edit`, formData).then(() => {
                alert("Edit Profile Successfully")
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            console.log(res)
        }
    },
    setup() {
        const store = useStore();

        return {
            user: computed(() => store.state.user),
            role: computed(() => store.state.role)
        }
    },

}
</script>


