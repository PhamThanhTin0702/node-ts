import { Document, model, Schema } from 'mongoose';

export default class Message {
  public doc : any

  constructor(objMessage : any) {
    this.doc = new MessageModel(objMessage)
  }
}
const MessageSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    require: true
  },
  message: {
    createdBy: {
      type: String,
      ref: "User",
    },
    type: {
      type: String,
      required: true
    },
    messageData: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      default: ""
    }
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
const MessageModel = model("Message", MessageSchema);
