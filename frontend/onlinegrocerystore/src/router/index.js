import { createWebHistory, createRouter } from "vue-router";
import Pages from "../components/Pages.vue";
import Productlist from "../components/ProductList.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import Checkout from "../components/Checkout.vue";
import Thanks from "../components/Thanks.vue";

import Admin from "../components/admin/Admin.vue";
import AdminPages from "../components/admin/Pages.vue";
import PageEditor from "../components/admin/PageEditor.vue";
import AdminProducts from "../components/admin/Products.vue";
import ProductEditor from "../components/admin/ProductEditor.vue";

import Orders from "../components/Orders.vue";
import SignUp from "../components/SignUp.vue";
import Login from "../components/SignIn.vue";
const routes = [
  { path: "/cart", component: ShoppingCart },
  { path: "/thanks", component: Thanks },
  { path: "/checkout", component: Checkout },
  {
    path: "/admin",
    component: Admin,
    children: [
      { path: "pages", component: AdminPages },
      //used to add optional param in routes ?
      { path: "pages/:op(edit|add)/:id?", component: PageEditor },
      { path: "products", component: AdminProducts },
      { path: "/:catchAll(.*)", redirect: "/admin/products" },
      { path: "products/:op(edit|add)/:id?", component: ProductEditor },
    ],
  },
  { path: "/categories/:category", component: Productlist },
  { path: "/:slug?", component: Pages },
  { path: "/:catchAll(.*)", redirect: "/" },
  { path: "/", redirect: "/home" },
  { path: "/home", redirect: "/categories/all" },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
  { path: "/orders", component: Orders },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
