import mongodb from "mongodb";
import UserModel from "../model/user";
import {Document} from "mongoose"


class UserStorage {
    public db : mongodb.Db

    constructor(db :mongodb.Db) {
        this.db = db
    }

    public async create(data: Document) : Promise<boolean> {
        const result = await this.db.collection("users").insertOne(data)
        if (result) {
            return true
        }
        return false
    }

    public async get(id : string) : Promise<any> {
        const result = await this.db.collection("users").findOne({"userCode": id})
        if (result) {
            return result
        }
        return null
    }

    public async list() : Promise<{err: boolean, data: UserModel[]}> {
        const result = await this.db.collection("users").find().toArray()
        if (result.length > 0) {
            return {err: false, data: result}
        }
        return {err: true, data: []}
    }
}

export default UserStorage