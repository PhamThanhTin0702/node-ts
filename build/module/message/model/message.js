"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Message {
    constructor(objMessage) {
        this.doc = new MessageModel(objMessage);
    }
}
exports.default = Message;
const MessageSchema = new mongoose_1.Schema({
    roomId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
});
const MessageModel = mongoose_1.model("Message", MessageSchema);
//# sourceMappingURL=message.js.map