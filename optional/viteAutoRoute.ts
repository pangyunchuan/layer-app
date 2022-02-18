/**
 * 使用 vite 引入所有的路由 给定的 路由文件
 */
export default function (routeName: string = "route.ts") {
    const autoRouteFileMap = (<any>import.meta).globEager(`/**/${routeName}`)
    const autoRoutes: any[] = []
    for (const index in autoRouteFileMap) {
        autoRoutes.push(...autoRouteFileMap[index].default)
    }
    return autoRoutes
}
