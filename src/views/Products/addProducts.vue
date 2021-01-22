<template>
    <MasterLayout>
        <div class="py-4">
            <h5 class="primary-color text-center">Add a product or service</h5>
            <div class="login_wrapper">
                <form class="mt-5">
                    <div class="mt-3">
                        <label>Email</label>
                        <div class="form_input">
                            <input type="email"  class="form-control"  />
                        </div>
                    </div>
                    <div class="mt-3">
                        <label>Password</label>
                        <div class="form_input">
                            <textarea rows="4"  class="form-control"   ></textarea>
                        </div>
                    </div>
                    <div class="mt-3">
                        <label>Price</label>
                        <div class="form_input">
                            <input type="number"  class="form-control"  />
                        </div>
                    </div>
                    <div class="mt-3">
                        <label>Sales Tax</label>
                        <div class="form_input">
                            <input type="text"  class="form-control"  />
                        </div>
                    </div>
                    <button class="rem-btn w-100 main mobile-btn-height gold_color mt-5" 
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
    </MasterLayout>
</template>
<script>
import MasterLayout from '../MasterLayout'
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        MasterLayout
    },
    data() {
        return {
            isButtonDisabled: false,
        }
    },
    methods: {

    },
}
</script>