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
class RoomStorage {
    constructor(db) {
        this.db = db;
    }
    Create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { result, ops } = yield this.db.collection("rooms").insertOne(data);
            if (result.ok === 1) {
                return ops[0];
            }
            return null;
        });
    }
    List(cond) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db.collection("rooms").aggregate([
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
            ]).toArray();
            console.log(data);
            return data;
        });
    }
    Get(userone, usertwo) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db.collection("rooms").aggregate([
                {
                    $match: {
                        "users.id": { $in: [userone, usertwo] }
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
            ]).toArray();
            return data[0];
        });
    }
    Update(cond, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.collection("rooms").updateOne(cond, { $set: data });
            return result;
        });
    }
}
exports.default = RoomStorage;
//# sourceMappingURL=room.js.map