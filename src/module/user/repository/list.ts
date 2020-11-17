import UserModel from "../model/user";

interface UserStorage {
    list(): Promise<{err: boolean, data: UserModel[]}>
}

class ListRepository {

    public store: UserStorage

    constructor(store: UserStorage) {
        this.store = store;
    }
    public async list() : Promise<{err: boolean, data: UserModel[]}> {
        const {err, data} = await this.store.list();
        if (err) {
            return {err: true, data: []}
        }
        return {err: false, data: data}
    }
}

export default ListRepository