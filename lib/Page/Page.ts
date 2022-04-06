import {merge} from "lodash-es";

export default class Page {
    reset() {
        merge(this, new (<any>this.constructor)());
    }
}
