<template>      
    <div>
         <div class="login_wrapper">
            <div class="text-center py-5">
                <img src="@/assets/img/epump-logo.png"  />
            </div>
            <h3 class="text-center primary-color">Welcome Back,</h3>
            <p class="sub-header text-center">Sign in to manage invoices</p>
            <form class="mt-3">
                <div class="mt-3">
                    <label>Email</label>
                    <div class="form_input">
                        <input type="email"  class="form-control"  v-model="userName"/>
                    </div>
                </div>
                <div class="mt-3">
                    <label>Password</label>
                    <div class="form_input">
                        <input type="password"  class="form-control"  v-model="password" />
                    </div>
                </div>
                <button class=" rem-btn w-100 main mobile-btn-height gold_color mt-5" 
                    @click="login($event, 'verifyEmail')"
                    :disabled="isButtonDisabled ? true : null"
                    :style="[
                        isButtonDisabled
                        ? { cursor: 'not-allowed' }
                        : { cursor: 'pointer' }
                    ]">Login
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
</template>

<script>
import configObject from "@/config";
import jwt_decode from "jwt-decode";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
    },
    data() {
        return {
            userName: null,
            password: null,
            isButtonDisabled: false,
            otp: null,
            view: '',
            transaction_reference: '',
            mode: ''
        }
    },
    methods: {
        handleClick() {
            this.view = ''
        },
        changeView($event, view) {
            $event.preventDefault()
            this.view = view
        },
        validateEmail(email) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return true;
            }
            return false;
        },
        getOTP(e) {
            e.preventDefault()
            if(!this.otp) {
                this.$toast("OTP is required", {
                    type: "error",
                    timeout: 3000,
                });
                return
            }
            this.isButtonDisabled = true;
            $('.actLoader').show();
            let data  =  {
                "otp": this.otp,
                "mode": this.mode,
                "reference": this.transaction_reference
            }
            this.axios.post(`${configObject.apiBaseUrl}/Account/VerifyAccount`, data)
            .then(res => {
                this.isButtonDisabled = false;
                $('.actLoader').hide();
                let message = this.mode == 'email' ? 'Email verified' : 'Phone verified'
                this.$toast(message, {
                    type: "success",
                    timeout: 3000,
                });
                let loginDetails = {
                    userName: this.userName,
                    password: this.password
                }
                localStorage.setItem('remisLoginDetails', JSON.stringify(loginDetails))
                this.view = ''
            })
            .catch(error => {
                this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 5000
                });
                $('.actLoader').hide();
                this.isButtonDisabled = false;
            });
        },
        login($event) {
            $event.preventDefault();
            if(!this.userName) {
                this.$toast("Email is required", {
                    type: "error",
                    timeout: 3000,
                });
                return
            }else {
                if(!this.validateEmail(this.userName)) {
                    this.$toast("Invalid Email Format", {
                        type: "error",
                        timeout: 3000,
                    });
                    return
                }
            }
            if(!this.password) {
                this.$toast("Password is required", {
                    type: "error",
                    timeout: 3000
                });
                return
            }
            this.isButtonDisabled = true;
            $('.loader').show();
            let data = {
                userName: this.userName,
                password: this.password,
                deviceId: ''
            }
            this.axios
                .post(
                `${configObject.apiBaseUrl}/Account/login`, data)
                    .then(res => {
                        this.isButtonDisabled = false;
                        $('.loader').hide();
                        localStorage.setItem("remisCardUserDetails", JSON.stringify(res.data));
                        const decoded = jwt_decode(res.data.token);
                        const exp = decoded.exp * 1000;
                        localStorage.setItem('jwtExpiry', exp)

                        this.$router.push({ name: "activate_card" });
                        this.$toast("Login Successful", {
                            type: "success",
                            timeout: 3000
                        });
                })
                .catch(error => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    try {
                        const res = JSON.parse(error.response.data.message)
                        const message = res.responseMessage == 'Confirm Email' ? 'An OTP has been sent to your email, please input OTP below to confirm email' : res.responseMessage == 'Confirm Phone' ? 'An OTP has been sent to your phone, please input OTP below to confirm phone number'  :  res.responseMessage
                        this.$toast(message, {
                            type: "success",
                            timeout: 5000
                        });
                        let medium
                        if(res.responseMessage == 'Confirm Phone') {
                            medium = 'phone'
                        }else {
                            medium = res.medium
                        }
                        this.mode = medium
                        this.transaction_reference = res.transaction_reference
                        this.view = 'otp'
                        
                    } catch(e) {
                        this.$toast(error.response.data.message, {
                            type: "error",
                            timeout: 3000
                        });
                    }
                });
        },
    }
}
</script>