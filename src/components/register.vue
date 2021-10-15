<template>
    <!-- component -->
    <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div
            class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
        >
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <form class="form-group">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>

                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="firstname"
                        v-model="user.firstName"
                    />
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="lastname"
                        v-model="user.lastName"
                    />

                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        v-model="user.email"
                    />

                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        v-model="user.password"
                    />
                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="repeat_password"
                        placeholder="Repeat Password"
                        v-model="user.password_repeat"
                    />
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Telephone"
                        v-model="user.tel"
                    />
                    <input
                        type="date"
                        name="date"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        placeholder="Date of Birth"
                        v-model="user.dob"
                    />

                    <button
                        type="submit"
                        v-on:click="register"
                        class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
                    >Create Account</button>
                </form>
            </div>

            <div class="text-grey-dark mt-6">
                Already have an account?
                <a
                    class="no-underline border-b border-blue text-blue"
                    href="../login/"
                >Log in</a>.
            </div>
        </div>
    </div>
</template>
<script>

import AuthenService from '../services/AuthenService.js';


export default {
    name: "register",
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                password_repeat: '',
                email: '',
                tel: '',
                dob: null
            },

        }
    },
    methods: {
        async register() {
            try {
                const Form = {
                    username: this.username,
                    password: this.password
                };
                const response = await AuthenService.register(Form);
                this.msg = response.msg;
                this.$router.push('/');
            } catch (error) {
                this.msg = error.response.data.msg;
            }

        }
    }
}
</script>
