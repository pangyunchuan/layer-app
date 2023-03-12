export default class CancelMan {
    private readonly k: string

    constructor(k: string = 'default') {
        this.k = k
    }

    private static map: Record<string, AbortController | undefined> = {}

    get signal() {
        let r = CancelMan.map[this.k];
        if (!r) {
            CancelMan.map[this.k] = r = new AbortController();
        }
        return r.signal
    }

    cancel(k: string = 'default') {
        if (k in CancelMan.map) {
            CancelMan.map[k]?.abort();
            delete CancelMan.map[k]
        }
    }
}