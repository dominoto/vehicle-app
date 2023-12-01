import { makeObservable } from 'mobx';

class BaseStore {
    constructor() {
        makeObservable(this, {});
    }
}

export default BaseStore;
