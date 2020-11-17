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
const create_1 = __importDefault(require("../repository/create"));
const user_1 = __importDefault(require("../model/user"));
function CreateHandler(req, res, next, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield context.getService("MongoDB");
        const store = new storage_1.default(db);
        const repo = new create_1.default(store);
        const user = new user_1.default(req.body).doc;
        const result = yield repo.create(user);
        if (result) {
            res.status(200).json({ success: true, message: "Oke" });
        }
        else {
            res.status(400).json({ success: false, message: "Bad Request" });
        }
    });
}
exports.default = CreateHandler;
//# sourceMappingURL=create.js.map