import {createRouter, createWebHistory} from "vue-router";
import routes from "@/router/routes";

let router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router

