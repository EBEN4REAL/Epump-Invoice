<template>
   <div>
        <div class="s-layout__sidebar ">
            <!-- <a class="s-sidebar__trigger" href="#0">
                <i class="fa fa-bars"></i>
            </a> -->
            <nav class="s-sidebar__nav">
                <div class="text-center py-3">
                    <img src="@/assets/img/epump-logo.png"  width="60"/>
                </div>
                <ul class="">
                    <li>
                        <router-link :to="{path:'/invoice'}" class="s-sidebar__nav-link" :class="[route === 'invoice' ? 'active' : null]">
                            Invoice
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'products'}" class="s-sidebar__nav-link" :class="[route === 'products' || route === 'add_product' ? 'active' : null]">
                            Products & Services
                        </router-link>
                    </li>
                </ul>
            </nav>
            <span class="logout_container bold-span cursor-pointer" @click="logout"><img src="@/assets/img/logout.png" width="20" class="mr-3"  /> Logout </span>
        </div>

        <main class="s-layout__content">
            <slot></slot>
        </main>
    </div>
</template>
<script>
export default {
     data() {
        return {
            route: this.$route.name
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push({name: 'login'})
        }
    },
}
</script>