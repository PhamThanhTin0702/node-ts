"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Room {
    constructor(objRoom) {
        this.doc = new RoomModel(objRoom);
    }
}
exports.default = Room;
const RoomSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Message",
    }
});
const RoomModel = mongoose_1.model("Room", RoomSchema);
//# sourceMappingURL=room.js.map