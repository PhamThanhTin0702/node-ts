"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = __importDefault(require("../storage/storage"));
const list_1 = __importDefault(require("../repository/list"));
function CreateHandler(req, res, next, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield context.getService("MongoDB");
        const store = new storage_1.default(db);
        const repo = new list_1.default(store);
        const { err, data } = yield repo.list();
        if (err) {
            res.status(400).json({ success: false, message: "Bad Request" });
        }
        else {
            res.status(200).json({ success: true, message: "Oke", data: data });
        }
    });
}
exports.default = CreateHandler;
//# sourceMappingURL=list.js.map