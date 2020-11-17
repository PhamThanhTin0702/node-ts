"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class UserStorage {
    constructor(db) {
        this.db = db;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            var result = yield this.db.collection("users").insertOne(data);
            if (result) {
                return true;
            }
            return false;
        });
    }
}
exports.default = UserStorage;
//# sourceMappingURL=user-storage.js.map