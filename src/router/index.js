import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductosView from "../views/ProductosView.vue";
import ContactoView from "../views/ContactoView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/productos",
      name: "productos",
      component: ProductosView,
    },
    {
      path: "/productos/:id",
      name: "producto-detalle",
      component: ProductDetailView,
    },
    {
      path: "/contacto",
      name: "contacto",
      component: ContactoView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
