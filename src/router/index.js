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
      guest: true,
    },
  },
  {
    path: "/invoice",
    name: "invoice",
    component: Invoice,
    meta: {
      guest: true,
    },
  },
  {
    path: "/add-product",
    name: "add_product",
    component: AddProduct,
    meta: {
      guest: true,
    },
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    meta: {
      guest: true,
    },
  },
  {
    path: "/ml",
    name: "ml",
    component: Ml,
    meta: {
      guest: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((rec) => rec.meta.authorize)) {
//     if (localStorage.getItem("remisCardUserDetails") === null) {
//       next({ name: "login", params: { nextUrl: to.fullPath } });
//     } else {
//       let user = JSON.parse(localStorage.getItem("remisCardUserDetails"));

//       if (to.matched.some((rec) => rec.meta.authRoles.includes("Remis"))) {
//         if (user.role.includes("Remis")) {
//           next();
//         }
//       } else {
//         next();
//       }
//     }
//   } else if (to.matched.some((rec) => rec.meta.guest)) {
//     if (localStorage.getItem("remisCardUserDetails") === null) {
//       next();
//     } else {
//       let user = JSON.parse(localStorage.getItem("remisCardUserDetails"));
//       if (user.role.includes("Remis")) {
//         next({ name: "activate_card" });
//       }
//     }
//   } else {
//     next();
//   }
// });

export default router;
