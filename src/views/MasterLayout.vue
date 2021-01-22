<template>
   <div>
        <div class="s-layout__sidebar">
            <!-- <a class="s-sidebar__trigger" href="#0">
                <i class="fa fa-bars"></i>
            </a> -->
            <nav class="s-sidebar__nav">
                <div class="text-center py-3">
                    <img src="@/assets/img/epump-logo.png"  width="60"/>
                </div>
                <ul class="">
                    <li>
                        <router-link :to="{name:'invoice'}" class="s-sidebar__nav-link" >
                            Invoice
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'products'}" class="s-sidebar__nav-link" :class="[route === 'products' || 'add_product' ? 'active' : null]">
                            Products & Services
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'tax'}" class="s-sidebar__nav-link">
                            Tax
                        </router-link>
                    </li>
                </ul>
            </nav>
            </div>

            <main class="s-layout__content">
                <slot></slot>
            </main>
        </div>
   </div>
</template>
<script>
export default {
     data() {
        return {
            route: this.$route.name
        }
    }
}
</script>