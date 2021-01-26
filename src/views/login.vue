<template>      
    <div>
         <div class="form-wrapper login">
            <div class="text-center py-5">
                <img src="@/assets/img/epump-logo.png"  />
            </div>
            <h3 class="text-center primary-color">Welcome Back,</h3>
            <p class="sub-header text-center">Sign in to manage invoices</p>
            <form class="mt-3">
                <div class="mt-3">
                    <label>Email</label>
                    <div class="form_input">
                        <input type="email"  class="form-control"  v-model="email"/>
                    </div>
                </div>
                <div class="mt-3">
                    <label>Password</label>
                    <div class="form_input">
                        <input type="password"  class="form-control"  v-model="password" />
                    </div>
                </div>
                <button class=" rem-btn w-100 main mobile-btn-height gold_color mt-5" 
                    @click="signIn($event)"
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
            email: null,
            password: null,
            isButtonDisabled: false
        }
    },
    methods: {
        validateEmail(email) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return true;
            }
            return false;
        },
        signIn($event) {
            $event.preventDefault();
            if(!this.email) {
                 this.$toast("Email Required", {
                    type: "error",
                    timeout: 3000
                });
                return;
            }else {
                if(!this.validateEmail(this.email)) {
                    this.$toast("Invalid Email Format", {
                        type: "error",
                        timeout: 3000
                    });
                    return
                }
            }
             if(!this.password) {
                this.$toast("Password Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            const data = {
                userName: this.email,
                password: this.password
            }
            this.isButtonDisabled = true;
            $(".loader").show();
            this.axios
                .post(
                `${configObject.apiBaseUrl}/Account/login`, data)
                    .then(res => {
                        $('.loader').hide();
                        this.isButtonDisabled = false;
                        const roles = res.data.role.split(",");
                        res.data.roles = roles
                        
                        localStorage.setItem("epumpInvoiceManager", JSON.stringify(res.data));

                        const decoded = jwt_decode(res.data.token);
                        const exp = decoded.exp * 1000;
                        localStorage.setItem('jwtExpiry', exp)

                        this.$router.push({ name: "invoices" });

                        this.$toast("Login Successful", {
                            type: "success",
                            timeout: 3000
                        });
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
    }
}
</script>