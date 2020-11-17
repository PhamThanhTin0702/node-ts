"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class User {
    constructor(objUser) {
        this.doc = new UserModel(objUser);
    }
}
exports.default = User;
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    chatRooms: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
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
});
const UserModel = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user.js.map