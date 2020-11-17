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
const get_1 = __importDefault(require("../repository/get"));
function GetHandler(req, res, next, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, message: "Can not get params" });
            next();
        }
        const db = yield context.getService("MongoDB");
        const store = new storage_1.default(db);
        const repo = new get_1.default(store);
        const data = yield repo.get(id);
        if (data) {
            res.status(200).json({ success: true, message: "Oke", data: data });
        }
        else {
            res.status(400).json({ success: false, message: "Bad Request" });
        }
    });
}
exports.default = GetHandler;
//# sourceMappingURL=get.js.map