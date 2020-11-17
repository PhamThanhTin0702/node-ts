import { model, Schema, Document } from "mongoose";

export default class Room {
  public doc : any

  constructor(objRoom : any) {
    this.doc = new RoomModel(objRoom)
  }
}

const RoomSchema = new Schema({
  displayName: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  users: [{
    _id: false,
    id: {
      type: String,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      default: ""
    }
  }],
  createdBy: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: new Date()
  },
  updatedDate: {
    type: Date,
    default: new Date()
  },
  lastedMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  }
})

const RoomModel = model("Room", RoomSchema);