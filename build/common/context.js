"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(prefix, serviceObj) {
        this.prefix = prefix;
        this.serviceObj = serviceObj;
    }
}
class Context {
    constructor() {
        this.services = [];
    }
    initService(prefix, service) {
        const svc = new Service(prefix, service);
        this.services.push(svc);
    }
    getService(prefix) {
        return new Promise((resolve, reject) => {
            this.services.forEach(svc => {
                if (svc.prefix === prefix) {
                    resolve(svc.serviceObj);
                }
                resolve({});
            });
        });
    }
}
exports.default = Context;
//# sourceMappingURL=context.js.map