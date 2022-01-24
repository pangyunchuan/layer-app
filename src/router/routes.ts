import {RouteRecordRaw} from "vue-router";

const routes:RouteRecordRaw[] = [
    {
        path: "/",
        name: "/",
        component: () => import("@/demo/views/demo.vue"),
        children: []
    }
];

export default routes;
