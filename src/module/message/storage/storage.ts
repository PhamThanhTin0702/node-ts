import mongodb from "mongodb";
import {Document, Types} from "mongoose"

class MessageStorage {
    public db : mongodb.Db

    constructor(db :mongodb.Db) {
        this.db = db
    }

    public async create(data: Document) : Promise<boolean> {
        const result = await this.db.collection("messages").insertOne(data)
        if (result) {
            return true
        }
        return false
    }

    public async GetMessageByRoom(id : string) : Promise<any> {
        const result = await this.db.collection("messages").find({"roomId": Types.ObjectId(id)}).toArray()
        if (result) {
            return result
        }
        return null
    }

    public async list() : Promise<{err: boolean, data: Document[]}> {
        const result = await this.db.collection("messages").find().toArray()
        if (result.length > 0) {
            return {err: false, data: result}
        }
        return {err: true, data: []}
    }
}

export default MessageStorage