import Vue from "vue";
import VueRouter from "vue-router";


const Login = () => import('../views/login')




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
