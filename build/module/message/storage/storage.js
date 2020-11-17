"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class MessageStorage {
    constructor(db) {
        this.db = db;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.collection("messages").insertOne(data);
            if (result) {
                return true;
            }
            return false;
        });
    }
    GetMessageByRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.collection("messages").find({ "roomId": mongoose_1.Types.ObjectId(id) }).toArray();
            if (result) {
                return result;
            }
            return null;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.collection("messages").find().toArray();
            if (result.length > 0) {
                return { err: false, data: result };
            }
            return { err: true, data: [] };
        });
    }
}
exports.default = MessageStorage;
//# sourceMappingURL=storage.js.map