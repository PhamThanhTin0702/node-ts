import { model, Schema, Document } from "mongoose";

export default class User {

    doc : Document

    constructor(objUser: any) {
        this.doc = new UserModel(objUser)
    }
}


const UserSchema = new Schema({
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    chatRooms: [
        {
            type: Schema.Types.ObjectId,
            ref: "Room"
        }
    ],
    userCode: {
        type: String
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    updatedDate: {
        type: Date,
        default: new Date()
    }
})
const UserModel = model("User", UserSchema);
