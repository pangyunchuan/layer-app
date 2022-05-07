export default class Page {
    reset() {
        const newThis = new (<any>this.constructor)()
        for (const newThisKey in newThis) {
            (<any>this)[newThisKey] = (<any>newThis)[newThisKey]
        }
        Object.assign(this, newThis)
    }
}
