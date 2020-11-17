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
class GetRepository {
    constructor(store) {
        this.store = store;
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.store.get(id);
            if (data) {
                return data;
            }
            return null;
        });
    }
}
exports.default = GetRepository;
//# sourceMappingURL=get.js.map