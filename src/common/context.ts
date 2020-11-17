class Service {
    public prefix: string
    public serviceObj : any

    constructor(prefix: string, serviceObj: any) {
        this.prefix = prefix
        this.serviceObj = serviceObj
    }
}


class Context {
    public services : Service[]

    constructor() {
        this.services = []
    }

    public initService (prefix: string, service: any) {
        const svc = new Service(prefix, service);
        this.services.push(svc)
    }

    public getService(prefix: string) : any {
        return new Promise((resolve, reject) => {
            this.services.forEach(svc => {
                if (svc.prefix === prefix) {
                    resolve(svc.serviceObj);
                }
                resolve({});
            });
        })

    }
}

export default Context