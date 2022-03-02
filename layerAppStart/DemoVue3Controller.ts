import {Controller, Vue3Controller} from "layer-app";
import DemoModel from "./DemoModel";
import {ComponentOptions} from "@vue/runtime-core";
// Controller  当重置controller(如vue的 beforeRouteUpdate) 时，需要手动处理响应式问题
// Vue3Controller 会返回一个 基于 vue3 ref 的响应式 实例，不用手动处理响应式
// 控制器 使用 静态方法 use 获取实例，不要 使用 new


//vue3 setup 中
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
// const refControllerTest = DemoVue3Controller.use('test');

//此时属性变更时响应式的
refController.value.testField = 2


//应当只在页面跟组件调用。 在页面销毁时,解除静态控制器对 模型实例的引用，减少内存，且从新获取时会新建控制器实例
refController.value.destroyOnBeforeUnmount()
//vue3 中可使用 ref 语法糖,去掉value
// let c = $(refController)
// c.destroyOnBeforeUnmount()

// 重置实例,会将value 替换为新的  controller 实例
refController.value.reset()


// vue2/3 选项式 , 其他如 react 请参考 设置
class DemoController extends Controller {
    testField = 1

    list: Awaited<ReturnType<typeof DemoModel['getList']>> = []

    getList() {
        DemoModel.getList().then(r => {
            this.list = r

            // r[0].demoField
        })
    }
}

const controllerMan = DemoController.use();


let vueOptions: ComponentOptions = {
    data() {
        return {
            //这样使用需要 controllerMan.value
            controllerMan: DemoController.use()
        }
    },
    computed: {
        controller(): DemoController {
            // 这样可以消除 .value
            return this.controllerMan.value;
        }
    },
    created() {
        //此时会响应式变更
        this.controller.testField = 2;

        //需要手动设置 重置时的响应式
        this.controller.setResetCall(() => {
            this.controllerMan = {...this.controllerMan}
            this.controllerMan = {...controllerMan}
            //使用这种需要注意 use 标记
            this.controllerMan = {...DemoController.use()}

        })
    },
    //伪代码,示例展示 路由更新
    beforeRouteUpdate(to: any, from: any, next: any) {
        this.controller.reset()
        next();
    },
    beforeUnmount() {
        //应当只在一个组件设置销毁,否则会造成  reset 无效
        this.controller.destroy();
    }
}
