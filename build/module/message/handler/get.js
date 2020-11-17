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
const error_1 = __importDefault(require("../../../common/error"));
function GetMessageHandler(req, res, next, context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield context.getService("MongoDB");
            const store = new storage_1.default(db);
            const repo = new list_1.default(store);
            const { id } = req.params;
            if (id) {
                const data = yield repo.GetMessageByRoom(id);
                if (data) {
                    res.status(200).json({ status_code: 200, data: data });
                }
                else {
                    res.status(400).json({ status_code: 400, error: error_1.default.CannotGet });
                }
            }
        }
        catch (err) {
            res.status(400).json({ status_code: 400, error: error_1.default.ParamIsInvalid });
        }
    });
}
exports.default = GetMessageHandler;
//# sourceMappingURL=get.js.map