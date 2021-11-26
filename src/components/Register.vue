<template>
    <nav-bar></nav-bar>
    <div class="container max-w-full mx-auto md:py-24 px-6">
        <div class="max-w-sm mx-auto px-6">
            <div class="relative flex flex-wrap">
                <div class="w-full relative">
                    <div class="md:mt-6">
                        <!-- First Form -->
                        <div v-if="Form == 1" class="mx-auto max-w-lg">
                            <!-- Username -->
                            <div class="py-1">
                                <label class="px-1 text-sm text-gray-600">Username</label>
                                <input
                                    placeholder="Username"
                                    v-model="username"
                                    @input="checkCaseUsername"
                                    type="text"
                                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    required
                                />
                                <span class="block text-red-600" v-if="invalidUsername">Not null</span>
                                  <span class="block text-gray-700 text-sm" >-Use only A-Z a-z 0-9</span>
                                <span
                                    class="block text-gray-700 text-sm"
                                    v-if="!usernameLength"
                                >At least 8 characters</span>
                                <span class="block text-green-600" v-else>At least 8 characters ✔️</span>

                                <span
                                    class="block text-red-600"
                                    v-if="invalidDuplicateUsername"
                                >Next level play</span>
                            </div>

                            <!-- Password -->
                            <div class="py-1">
                                <label class="px-1 text-sm text-gray-600">Password</label>
                                <input
                                    placeholder="Password"
                                    @input="checkPassword"
                                    type="password"
                                    v-model="password"
                                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    required
                                />
                                <span class="block text-red-600" v-if="invalidPassword">Not null</span>
                                <span class="block text-red-600" v-if="minlength">atleast 8 chacters</span>

                                <span
                                    class="block text-gray-700 text-sm"
                                    v-if="!caseUpper"
                                >At least 1 upper</span>
                                <span class="block text-green-600" v-else>Upper case ✔️</span>

                                <span
                                    class="block text-gray-700 text-sm"
                                    v-if="!caseLower"
                                >At least 1 lower</span>
                                <span class="block text-green-600" v-else>Lower case ✔️</span>
                            </div>

                            <!-- Password Confirm -->
                            <div class="py-1">
                                <label class="px-1 text-sm text-gray-600">Password Confirm</label>
                                <input
                                    placeholder="Password Confirm"
                                    type="password"
                                    v-model="confirmPassword"
                                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    required
                                />

                                <span
                                    class="text-red-600"
                                    v-if="samePassword"
                                >Password does not match</span>
                            </div>
                            <small class="form-text text-muted">Password should contain 8 chacters</small>
                        </div>

                        <!-- Second Form -->
                        <div v-if="Form == 2" class="mx-auto max-w-lg">
                            <div class="py-1">
                                <label class="px-1 text-sm text-gray-600">First Name</label>
                                <input
                                    placeholder="First name"
                                    type="text"
                                    v-model="fname"
                                    required
                                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                                <span class="text-red-600" v-if="invalidFname">Not null</span>
                            </div>

                            <div class="py-1">
                                <label class="px-1 text-sm text-gray-600">Last Name</label>
                                <input
                                    placeholder="Last name"
                                    type="text"
                                    v-model="lname"
                                    required
                                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                                <span class="text-red-600" v-if="invalidLname">Not null</span>
                            </div>

                            <!-- Email -->
                            <div class="py-1">
                                <label class="px-1 text-sm text-gray-600">Email</label>
                                <input
                                    placeholder="Email"
                                    type="email"
                                    required
                                    v-model="email"
                                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                                <span class="text-red-600" v-if="invalidEmail">Not null</span>
                            </div>

                            <div class="py-1">
                                <label class="px-1 text-sm text-gray-600">Date of Birth</label>
                                <input
                                    placeholder="Date of Birth"
                                    required
                                    type="Date"
                                    v-model="dob"
                                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                                <span class="text-red-600" v-if="invalidDob">Not null</span>
                            </div>

                            <div class="py-1">
                                <label class="px-1 text-sm text-gray-600">Address</label>
                                <textarea
                                    rows="4"
                                    maxlength="210"
                                    x-model="maximum"
                                    x-ref="maximum"
                                    class="block w-full mt-1 py-2 px-3 rounded-md shadow-sm focus:outline-none"
                                    v-model="address"
                                    placeholder="Address"
                                ></textarea>
                                <span class="text-red-600" v-if="invalidDob">Not null</span>
                            </div>

                            <div class="py-1">
                                <label class="px-1 text-sm text-gray-600">Telephone NO.</label>
                                <input
                                    placeholder="Telephone Number"
                                    type="tel"
                                    required
                                    v-model="tel"
                                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                                <span class="text-red-600" v-if="invalidTel">Not null</span>
                            </div>
                        </div>

                        <!-- button -->
                        <div>
                            <button v-if="this.Form == 1" @click="ValidateForm1">test1 :</button>
                            <button v-if="this.Form == 2" @click="ValidateForm2">test2 :</button>
                            <button @click="backForm">Back :</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer-com></footer-com>
</template>
<script>
import axios from "axios";
import jwt_decode from 'jwt-decode'

export default {
    name: "Register",
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
            username: '',
            password: '',
            confirmPassword: '',
            fname: '',
            lname: '',
            email: '',
            tel: null,
            dob: '',
            address: '',

            Form: 1,

            // username condition
            usernameLength: false,
            caseNumber: false,
            caseUpper: false,
            caseLower: false,

            // password condition
            passwordLength: 0,
            minlength: false,
            invalidUsername: false,
            invalidDuplicateUsername: false,
            invalidPassword: false,
            samePassword: false,


            invalidFname: false,
            invalidLname: false,
            invalidEmail: false,
            invalidTel: false,
            invalidDob: false,
            invalidAddress: false
        };
    },
    methods: {
        async ValidateForm1() {
            this.invalidUsername = this.username == null || this.username.trim() === '' ? true : false
            this.invalidPassword = this.password == null || this.password.trim() === '' ? true : false
            this.samePassword = this.password.trim() === this.confirmPassword.trim() ? false : true


            await this.checkUsername(this.username);


            if (!this.invalidUsername && !this.invalidDuplicateUsername && !this.invalidPassword && !this.samePassword) {
                this.nextForm()
            }
        },
        ValidateForm2() {
            this.invalidFname = this.fname == null || this.fname.trim() === '' ? true : false
            this.invalidLname = this.lname == null || this.lname.trim() === '' ? true : false
            this.invalidEmail = this.email == null || this.email.trim() === '' ? true : false
            this.invalidtel = this.tel.length > 9 || this.tel == null ? true : false
            this.invalidDob = this.dob == null || this.email === '' ? true : false
            this.invalidAddress = this.address == null || this.address.trim() === '' ? true : false

            if (!this.invalidFname && !this.invalidLname && !this.invalidEmail && !this.invalidDob && !this.invalidTel && !this.invalidAddress) {
                this.makeForm()
            }

        },
        async makeForm() {
            let user = {
                uid: 0,
                username: this.username,
                password: this.password,
                fname: this.fname,
                lname: this.lname,
                dob: this.dob,
                address: this.address,
                email: this.email,
                tel: this.tel,
                role: 'ROLE_CUSTOMER',
                deleted: 0
            }

            const res = await axios.post(`${this.backend_url}/user/save`, user).catch(function (error) {
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
            if (res != undefined) {
                this.login()
            }
            console.log(res)
        },
        checkPassword() {
            let char=''
            this.caseLower = false
            this.caseUpper = false
            this.caseNumber = false
            this.minlength = false
            this.passwordLength = this.password.length

            if (this.passwordLength > 7) {
                this.minlength = false;
            } else {
                this.minlength = true;
            }

            for (let i = 0; i <= this.passwordLength; i++) {
                char = this.password.charAt(i)
                if (isNaN(char)) {
                    if (char == char.toUpperCase()) {
                        this.caseUpper = true
                        console.log('up case :' + this.caseUpper);
                    } else if (char == char.toLowerCase()) {
                        this.caseLower = true
                        console.log('low case :' + this.caseLower);
                    }
                }
            }
        },
        checkCaseUsername() {
            let pattern = /^[0-9a-zA-Z_.-]+$/
            this.caseLower = false
            this.caseUpper = false
            this.caseNumber = false
            this.usernameLength = false
            this.invalidUsername = false
            if (this.username) {
                if (this.username.length > 7) {
                    this.usernameLength = true
                    console.log(this.usernameLength)
                } else {
                    this.usernamelength = false
                }
            }
            if (!pattern.test(this.username)) {
                this.invalidUsername = true
            }

        }



    },
    async login() {
        const formData = this.makeLoginForm()
        console.log(formData);
        const res = await axios.post(`${this.backend_url}/login`, formData).catch(function (error) {
            if (error.response) {
                console.log(error)
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
        console.log(res);
        const data = await res.data
        const access_token = data.access_token
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", data.refresh_token)
        const user = jwt_decode(data.access_token)
        this.$store.dispatch('fetchUser', { user, access_token })


        this.$router.push({ path: "/" })
    },
    makeLoginForm() {
        let formData = new FormData()
        formData.append("username", this.username)
        formData.append("password", this.password)
        console.log(this.username);
        return formData
    },

    nextForm() {
        console.log(this.Form)
        if (this.Form > 1) {
            alert('Do not have page')
        } else {
            this.Form = this.Form + 1
        }
        console.log(this.Form)

    },

    backForm() {
        console.log(this.Form)
        if (this.Form == 1) {
            alert('Do not have page')
        } else
            this.Form = this.Form - 1
    },

    async checkUsername(username) {
        const res = await axios.get(`${this.backend_url}/user/check/${username}`).catch(function (error) {
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
        this.invalidDuplicateUsername = res.data
        console.log(res)
    }

}


</script>
