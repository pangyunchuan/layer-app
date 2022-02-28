import {Vue3Controller} from "layer-app";
import DemoModel from "./DemoModel";
// BaseController 未完成
// import {BaseController} from "layer-app";

//未完成
class DemoVue3Controller extends Vue3Controller {
    testField = 1

    list: Awaited<ReturnType<typeof DemoModel['getList']>> = []

    getList() {
        DemoModel.getList().then(r => {
            this.list = r

            // r[0].demoField
        })
    }
}


// 使用 use 获取 控制器实例,可传入标记,获取不同实例,相同标记会返回同一个实例,,
const refController = DemoVue3Controller.use();
const refControllerTest = DemoVue3Controller.use('test');


//在页面销毁时,解除静态控制器对 模型实例的引用，减少内存，且从新获取时会新建控制器实例
refController.value.destroyOnBeforeUnmount()
//vue3 中可使用 ref 语法糖,去掉value
// let c = $(refController)
// c.destroyOnBeforeUnmount()

// 重置实例,会将value 替换为新的  controller 实例
refController.value.reset()



// class DemoBaseController extends BaseController {
//     testField = 1
//
//     list: Awaited<ReturnType<typeof DemoModel['getList']>> = []
//
//     getList() {
//         DemoModel.getList().then(r => {
//             this.list = r
//
//             // r[0].demoField
//         })
//     }
// }
//
// /**
//  * 在 vue2 或其他代码中,需要手动重置响应式,vue3中,使用
//  *
//  *
//  */
