import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/Home.vue";

const routes = [
  {
    path: "/",
    component: HomeComponent,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
