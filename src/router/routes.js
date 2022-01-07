const routes = [
    {
        path: "/",
        name: "/",
        meta: {
            redirectToIndex: true, //是否需要跳转到首页
            whiteList: true //是否白名单（不用鉴权）
        },
        component: () => import("@/demo/views/demo.vue"),
        children: []
    }
];

export default routes;
