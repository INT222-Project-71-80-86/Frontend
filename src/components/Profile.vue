<template>
    <nav-bar />
<div v-if="!edit" class="page-content page-container" id="page-content">
    <div class="padding xl:ml-36">
        <div class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img :src="getImage(this.userimg)" class="rounded-full" alt="Members picture"> </div>
                                <h6 class="font-bold">{{user.fname}} {{user.lname}}</h6>
                                <p v-if="user.role">{{user.role.substr(5)}}</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                <button @click="editProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="hover:text-blue-700 duration-300 bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button>
                            </div>
                        </div>
                        <div class="col-sm-8 mt-5">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default font-bold"><span class="text-xl uppercase tracking-widest">Profile Information</span></h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">Email</p>
                                        <h6 class="text-muted font-light">{{user.email}}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">Phone</p>
                                        <h6 class="text-muted font-light">{{user.tel}}</h6>
                                    </div>
                                </div>
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default font-bold"></h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">Date of Birth</p>
                                        <h6 class="text-muted font-light">{{user.dob}}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">Address</p>
                                        <h6 class="text-muted font-light">{{user.address}}</h6>
                                    </div>
                                </div>
                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div v-if="edit" class="page-content page-container" id="page-content">
    <div class="padding xl:ml-36">
        <div class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img :src="getImage(this.userimg)" class="rounded-full" alt="Members picture"> </div>
                                <h6 class="font-bold">{{user.fname}} {{user.lname}}</h6>
                                <p v-if="user.role">{{user.role.substr(5)}}</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                <button @click="disableEdit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
</svg></button>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default font-bold"><span class="text-xl uppercase tracking-widest">Edit Profile Information</span></h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">First Name</p>
                                        <input
                            class="appearance-none block w-full border rounded pl-2 focus:ring-1 focus:ring-blue-800"
                            type="text"
                            v-model="this.profile.fname"
                            required
                            placeholder="Firstname"
                        />
                        <span v-if="invalidFname" class="text-red-600 text-sm">Please, fill your firstname</span>
                                        <h6 class="text-muted font-light"></h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">Last Name</p>
                                        <input
                            class="appearance-none block w-full border rounded pl-2 focus:ring-1 focus:ring-blue-800"
                            type="text"
                            v-model="this.profile.lname"
                            required
                            placeholder="Lastname"
                        />
                        <span v-if="invalidLname" class="text-red-600 text-sm">Please, fill your lastname</span>
                                    </div>
                                </div>
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default font-bold"></h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">Email</p>
                                        <input
                            class="appearance-none block w-full border rounded pl-2 focus:ring-1 focus:ring-blue-800"
                            type="text"
                            v-model="this.profile.email"
                            required
                            placeholder="Email"
                        />
                        <span v-if="invalidEmail" class="text-red-600 text-sm">Please, Enter Valid Email Address ex.Jonathan@gmail.com</span>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">Telephone Number</p>
                                        <input
                            class="appearance-none block border rounded pl-2 pr-1 focus:ring-1 focus:ring-blue-800 w-28"
                            type="text"
                            v-model="this.profile.tel"
                            required
                            placeholder="Tel Number"
                        />
                        <span v-if="invalidTel" class="text-red-600 text-sm">Please, Enter Valid Telephone Number ex.08xxxxxxxx</span>
                                    </div>
                                </div>
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default font-bold"></h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">Address</p>
                                        <input
                            class="appearance-none block border rounded pl-2 focus:ring-1 focus:ring-blue-800 w-full"
                            type="text"
                            v-model="this.profile.address"
                            required
                            placeholder="Address"
                        />
                        <span v-if="invalidAddress" class="text-red-600 text-sm">Please, fill your Address</span>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 font-bold">Date of Birth</p>
                                        <span class="text-muted cursor-not-allowed"> {{user.dob}} </span>
                                    </div>
                                </div>
                                <button @click="validateInput" class="duration-300 float-right mr-1 mt-3 border-2 border-blue-500 hover:border-green-500 hover:bg-gray-100 pl-1 pr-1 font-semibold">save</button>
                            </div>
                        </div>
                    </div>
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
import jwt_decode from 'jwt-decode'

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
                deleted: '',
                    },
            backend_url: process.env.VUE_APP_BACKEND_URL,
            userimg: 'user.png',
            invalidFname: false,
            invalidLname: false,
            invalidAddress: false,
            invalidEmail: false,
            invalidTel: false,
            invalidDob: false,
        };
    },
    methods: {
        editProfile() {
            this.edit = true
            let user = Object.assign({},this.user)
            this.profile = user
            // this.makeDataForm();
        },
        disableEdit(){
            this.edit = false
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

        this.saveEditProfile(profile)
        },
        async saveEditProfile(formData) {
            const access_token = localStorage.getItem("access_token")
            const res = await axios.put(`${this.backend_url}/user/edit`, formData,{headers:{'Authorization': `Bearer ${access_token}`}}).catch(function (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            if(res != undefined && res.status == 200){
                alert("Edit Successfully")
                const user = jwt_decode(access_token)
                this.$store.dispatch('fetchUser', {user, access_token})
                this.disableEdit()
            }
        },
        EmailPattern(){
            let pattern = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/
            if(!pattern.test(this.profile.email)){
                return true
            } return false
        },
        TelPattern(){
            let pattern = /^(?=.{9,10}$)([0-9]+)+$/
            if(!pattern.test(this.profile.tel)) {
                return true
            } return false
        },
        validateInput(){
            this.invalidFname = this.profile.fname == null || this.profile.fname.trim() === '' ? true : false
            this.invalidLname = this.profile.lname == null || this.profile.lname.trim() === '' ? true : false
            this.invalidEmail = this.profile.email == null || this.EmailPattern() ? true : false
            this.invalidTel = this.profile.tel == null || this.TelPattern() ? true : false
            this.invalidDob = this.profile.dob == null || this.profile.email === '' ? true : false
            this.invalidAddress = this.profile.address == null || this.profile.address.trim() === '' ? true : false
            if(!this.invalidFname && !this.invalidLname && !this.invalidAddress && !this.invalidEmail && !this.invalidTel && !this.invalidDob){
                this.makeDataForm()
            }
        },
        getImage(name){
			return require(`@/assets/profile-user/${name}`)
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
<style scoped>

.padding {
    padding: 3rem !important
}

.user-card-full {
    overflow: hidden
}

.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
    box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
    border: none;
    margin-bottom: 30px
}

.m-r-0 {
    margin-right: 0px
}

.m-l-0 {
    margin-left: 0px
}

.user-card-full .user-profile {
    border-radius: 5px 0 0 5px
}

.bg-c-lite-green {
    background: -webkit-gradient(linear, left top, right top, from(#f29263), to(#ee5a6f));
    background: linear-gradient(to right, #ee5a6f, #f29263)
}

.user-profile {
    padding: 20px 0
}

.card-block {
    padding: 1.25rem
}

.m-b-25 {
    margin-bottom: 25px
}

.img-radius {
    border-radius: 5px
}

h6 {
    font-size: 14px
}

.card .card-block p {
    line-height: 25px
}

@media only screen and (min-width: 1400px) {
    p {
        font-size: 14px
    }
}

.card-block {
    padding: 1.25rem
}

.b-b-default {
    border-bottom: 1px solid #e0e0e0
}

.m-b-20 {
    margin-bottom: 20px
}

.p-b-5 {
    padding-bottom: 5px !important
}

.card .card-block p {
    line-height: 25px
}

.m-b-10 {
    margin-bottom: 10px
}

.text-muted {
    color: #919aa3 !important
}

.b-b-default {
    border-bottom: 1px solid #e0e0e0
}

.f-w-600 {
    font-weight: 600
}

.m-b-20 {
    margin-bottom: 20px
}

.m-t-40 {
    margin-top: 20px
}

.p-b-5 {
    padding-bottom: 5px !important
}

.m-b-10 {
    margin-bottom: 10px
}

.m-t-40 {
    margin-top: 20px
}

.user-card-full .social-link li {
    display: inline-block
}

.user-card-full .social-link li a {
    font-size: 20px;
    margin: 0 10px 0 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out
}
</style>

