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
class ListRoomRepo {
    constructor(store) {
        this.store = store;
    }
    List(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cond = {
                "users.id": { $eq: id }
            };
            const data = yield this.store.List(cond);
            return data;
        });
    }
}
exports.default = ListRoomRepo;
//# sourceMappingURL=list.js.map