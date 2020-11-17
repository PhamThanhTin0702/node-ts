import mongo from 'mongodb';
import { Document } from "mongoose";

class RoomStorage {
  public db: mongo.Db

  constructor(db: mongo.Db) {
    this.db = db
  }

  async Create(data: Document) : Promise<any> {
    const {result, ops} = await this.db.collection("rooms").insertOne(data)
    if (result.ok === 1) {
      return ops[0]
    }
    return null
  }

  async List(cond: any) : Promise<Document[]> {
    const data = await this.db.collection("rooms").aggregate([
      {
        $match: cond
      },
      {
        $lookup: {
          from: "messages",
          localField: "lastedMessage",
          foreignField: "_id",
          as: "lastedMessage"
        }
      }
    ]).toArray()
    console.log(data)
    return data
  }

  async Get(userone: string, usertwo: string) : Promise<any> {
    const data = await this.db.collection("rooms").aggregate([
      {
        $match: {
          "users.id" : {$in: [userone, usertwo]}
        }
        },
      {
        $lookup: {
          from: "messages",
          localField: "lastedMessage",
          foreignField: "_id",
          as: "lastedMessage"
        }
      }
    ]).toArray()
    return data[0]
  }

  async Update(cond: any, data: any) : Promise<any> {
    const result = await this.db.collection("rooms").updateOne(cond, {$set: data})
    return result
  }
}

export default RoomStorage