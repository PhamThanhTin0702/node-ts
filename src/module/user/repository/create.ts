import UserModel from "../model/user";
import {Document} from "mongoose"

interface UserStorage {
    create(data: Document): Promise<boolean>
}

class CreateUserRepository {
    public store: UserStorage

    constructor(store: UserStorage) {
        this.store = store;
    }

    public async create(data : Document) : Promise<boolean> {
        const result = await this.store.create(data)
        if (result) {
            return true
        }
        return false
    }
}

export default CreateUserRepository