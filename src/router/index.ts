import { createRouter, createWebHistory } from "vue-router";
import TheGame from "@/pages/TheGame.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "game",
      component: TheGame
    }
  ]
});

export default router;