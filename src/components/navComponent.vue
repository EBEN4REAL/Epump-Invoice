<template>
    <div>
        <div>
            <div class="nav_remis_logo" :class="[loggedIn ? 'logged_nav' : '']">
                <b-navbar-brand>
                    <router-link :to="{ name: 'home' }"> 
                        <img class="navbar-logo" v-if="!loggedIn" src="@/assets/img/Remis.svg" alt="Remis-logo" width="50px">
                        <img class="navbar-logo" v-if="loggedIn" src="@/assets/img/Remis white.svg" alt="Remis-logo" width="30px">
                    </router-link>
                </b-navbar-brand>
                <div v-if="!loggedIn" >
                    <router-link :to="{ name: 'login' }" class="secondary-btn disabled-color border-0 primary-color font-weight-bolder mobile-view px-4 py-2 text-font text-decoration-none login_button">
                        Login
                    </router-link>
                    <router-link :to="{ name: 'signup' }" class="secondary-btn text-decoration-none signup-btn border-0 primary-color mobile-view font-weight-bolder px-4 py-2 text-font">
                        Sign Up
                    </router-link>
                    <router-link :to="{ name: 'account' }" class="secondary-btn disabled-color border-0 primary-color font-weight-bolder mobile-view px-4 py-2 text-font text-decoration-none desktop-view">
                        My Account
                    </router-link>
                </div>
                <div v-if="loggedIn" class="position-relative jutify_even">
                    <router-link :to="{ name: 'activate_card' }" class="cursor_hover logged_nav_texts nav_text_marg text-decoration-none">Dashboard</router-link>
                    <router-link :to="{ name: 'fundCard' }" class="cursor_hover logged_nav_texts nav_text_marg text-decoration-none">Fund Your Card</router-link>
                    <p class="cursor_hover logged_nav_texts nav_text_marg" @click="popOutEditProfile">Edit Profile</p>
                    <p class="cursor_hover logged_nav_texts nav_text_marg" @click="popOutChangePassword">Change Password</p>
                    <p class="cursor_hover logged_nav_texts" @click="logout">Logout</p>
                    <div class="skewed-div" v-if="isEditProfile" ref="editProfModArrow"></div>
                    <div class="desk-edit-profile" v-if="isEditProfile" ref="editProfMod">
                        <div class="pop-up-form-wrapper mt-4">
                            <form class="">
                                <div class="mt-3">
                                    <label>First  Name</label>
                                    <div class="form_input">
                                        <input type="text"  class="form-control" v-model="firstName"  />
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <label>Last Name</label>
                                    <div class="form_input">
                                        <input type="text"  class="form-control" v-model="lastName"  />
                                    </div>
                                </div>
                                <button class="mt-4 rem-btn w-100 main mobile-btn-height gold_color" 
                                    @click="editProfile"
                                    :disabled="isButtonDisabled ? true : null"
                                    :style="[
                                        isButtonDisabled
                                        ? { cursor: 'not-allowed' }
                                        : { cursor: 'pointer' }
                                    ]">Edit Profile
                                    <img
                                        src="@/assets/img/git_loader.gif"
                                        style="display:none"
                                        width="22px"
                                        class="ml-3 loader"
                                    />
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="skewed-div skewed-div-pass" v-if="ischangePassword" ref="changePassModArrow"></div>
                    <div class="desk-edit-profile desk-change-pass" v-if="ischangePassword" ref="changePassMod">
                        <div class="pop-up-form-wrapper mt-4">
                            <form class="">
                                <div class="mt-3">
                                    <label>Old Password</label>
                                    <div class="form_input">
                                        <input type="password"  class="form-control" v-model="oldPassword"  />
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <label>New Password</label>
                                    <div class="form_input">
                                        <input type="password"  class="form-control" v-model="newPassword"  />
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <label>Confirm Password</label>
                                    <div class="form_input">
                                        <input type="password"  class="form-control" v-model="confirmPassword"  />
                                    </div>
                                </div>
                                <button class="mt-4 rem-btn w-100 main mobile-btn-height gold_color" 
                                    @click="changePassword"
                                    :disabled="isButtonDisabled ? true : null"
                                    :style="[
                                        isButtonDisabled
                                        ? { cursor: 'not-allowed' }
                                        : { cursor: 'pointer' }
                                    ]">Change Password
                                    <img
                                        src="@/assets/img/git_loader.gif"
                                        style="display:none"
                                        width="22px"
                                        class="ml-3 loader"
                                    />
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="remove_desktop_nav">
                        <b-dropdown id="dropdown-1" class="m-md-2">
                            <b-dropdown-item>
                                <router-link :to="{name: 'fundCard'}" class="text-decoration-none text-dark" v-show="userDetails">
                                        Fund Card
                                </router-link>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <router-link :to="{name: 'edit_profile'}" class="text-decoration-none text-dark" v-show="userDetails">
                                        Edit Profile
                                </router-link>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <router-link :to="{name: 'change_password'}" class="text-decoration-none text-dark" v-show="userDetails">
                                        Change Password
                                </router-link>
                            </b-dropdown-item>
                            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    props: ['loggedIn'],
    data() {
        return {
            isButtonDisabled: false,
            isEditProfile: false,
            ischangePassword: false,
            firstName: null,
            lastName: null,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            userDetails: localStorage.getItem("remisCardUserDetails") ? JSON.parse(localStorage.getItem("remisCardUserDetails")) : null
        }
    },
    mounted() {
        document.addEventListener("mousedown", this.handleClick);
        if (this.loggedIn) {
            const userDetails =  JSON.parse(localStorage.getItem('remisCardUserDetails'))
            if (userDetails) {
                this.firstName = userDetails.firstName
                this.lastName = userDetails.lastName
                this.phoneNumber = userDetails.phone
            }
        }
    },
    methods: {
        beforeDestroy() {
            document.removeEventListener("mousedown", this.handleClick);	        
        },
        handleClick(e) {
            if (this.$refs.editProfMod && this.$refs.editProfModArrow) {
                if (this.$refs.editProfMod.contains(e.target) || this.$refs.editProfModArrow.contains(e.target)) {	
                    return;	
                }	
                this.isEditProfile = false
            }

            if (this.$refs.changePassMod && this.$refs.changePassModArrow) {
                if (this.$refs.changePassMod.contains(e.target) || this.$refs.changePassModArrow.contains(e.target)) {	
                    return;	
                }	
                this.ischangePassword = false
            }
        },
        editProfile(e) {
            e.preventDefault()
            if(!this.firstName) {
                this.$toast("Please input a first name", {
                    type: "error",
                    timeout: 3000
                });
                return
            }
            if(!this.lastName) {
                this.$toast("Please input a last name", {
                    type: "error",
                    timeout: 3000
                });
                return
            }

            let data = {
                firstName: this.firstName,
                lastName: this.lastName,
                phoneNumber: this.phoneNumber
            }

            this.isButtonDisabled = true;
            $('.loader').show();

            let userDetails = JSON.parse(localStorage.getItem('remisCardUserDetails'))
            const newDetails = { ...userDetails, firstName: this.firstName, lastName: this.lastName }
            
            this.axios.post(`${configObject.apiBaseUrl}/Account/Update`, data, configObject.authConfig())
                .then(res => {
                    localStorage.setItem('remisCardUserDetails', JSON.stringify(newDetails))
                    this.userDetails = newDetails
                    this.$store.commit("setUserName", this.firstName)
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast('Successfully edited profile', {
                        type: "success",
                        timeout: 3000
                    });
                    this.isEditProfile = !this.isEditProfile
                })
                .catch(error => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000
                    });
                });
        },
        changePassword(e) {
            e.preventDefault()
            if(!this.oldPassword) {
                this.$toast("Please input your current password", {
                    type: "error",
                    timeout: 3000
                });
                return
            }
            if(!this.newPassword) {
                this.$toast("Please input a new password", {
                    type: "error",
                    timeout: 3000
                });
                return
            }

            if(this.newPassword.length < 6) {
                this.$toast("Please input a password with more than 5 characters", {
                    type: "error",
                    timeout: 3000,
                });
                return
            }

            if(!this.confirmPassword) {
                this.$toast("Please confirm your password", {
                    type: "error",
                    timeout: 3000
                });
                return
            }

            if(this.newPassword !== this.confirmPassword) {
                this.$toast("Passwords don't match", {
                    type: "error",
                    timeout: 3000
                });
                return
            }

            let data = {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword
            }

            this.isButtonDisabled = true;
            $('.loader').show();
            
            this.axios.post(`${configObject.apiBaseUrl}/Account/ChangePassword`, data, configObject.authConfig())
                .then(res => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast('Successfully changed password', {
                        type: "success",
                        timeout: 3000
                    });
                    this.ischangePassword = !this.ischangePassword
                    this.oldPassword = ''
                    this.newPassword = ''
                    this.confirmPassword = ''
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.response)
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000
                    });
                });
        },
        logout() {
            localStorage.clear();
            this.$router.push({name: 'login'});
        },
        popOutEditProfile(e) {
            e.preventDefault();
            this.isEditProfile = !this.isEditProfile
            this.firstName = this.userDetails.firstName
            this.lastName = this.userDetails.lastName
        },
        popOutChangePassword(e) {
            e.preventDefault();
            this.ischangePassword = !this.ischangePassword
            this.oldPassword = ''
            this.newPassword = ''
            this.confirmPassword = ''
        }
    }
}
</script>

<style>

</style>