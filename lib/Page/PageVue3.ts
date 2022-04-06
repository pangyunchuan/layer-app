import Page from "root/lib/Page/Page";
import {onBeforeUnmount} from "vue";

export default class PageVue3 extends Page {
    resetWhenUnmount() {
        onBeforeUnmount(() => {
            this.reset();
        });
    }
}
