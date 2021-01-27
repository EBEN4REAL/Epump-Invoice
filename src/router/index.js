import Vue from "vue";
import VueRouter from "vue-router";


const Login = () => import('../views/login')
const Ml = () => import('../views/MasterLayout.vue')
const Products = () => import('../views/Products/products.vue')
const AddProduct = () => import('../views/Products/addProducts.vue')
const Invoice = () => import('../views/Invoice/index.vue')
const Invoices = () => import('../views/Invoice/invoices.vue')


Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/invoices",
    name: "invoices",
    component: Invoices,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/invoice",
    name: "invoice",
    component: Invoice,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/add-product",
    name: "add_product",
    component: AddProduct,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((rec) => rec.meta.authorize)) {
    // Authorized Pages will he handled here
    if (localStorage.getItem("epumpInvoiceManager") === null) {
      // There is no logged in user, go back to Login (and redirect to intended page after successfull login)
      next({ name: "login", params: { nextUrl: to.fullPath } });
    } else {
      let user = JSON.parse(localStorage.getItem("epumpInvoiceManager"));

      // Company Admin
      if (to.matched.some((rec) => rec.meta.authRoles.includes("Admin"))) {
        if (
          user.roles.includes("Super Admin") ||
          user.roles.includes("Admin")
        ) {
          next();
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((rec) => rec.meta.guest)) {
    //Guest Pages are Handled here e.g. Login
    if (localStorage.getItem("epumpInvoiceManager") === null) {
      next();
    } else {
      let user = JSON.parse(localStorage.getItem("epumpInvoiceManager"));
      if (user.roles.includes("Super Admin") || user.roles.includes("Admin")) {
        next({ name: "invoices" });
      }
    }
  } else {
    // Free pages are handled here
    next();
  }
});

export default router;
