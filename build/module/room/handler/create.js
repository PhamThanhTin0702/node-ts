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
const room_1 = __importDefault(require("../model/room"));
const room_2 = __importDefault(require("../storage/room"));
const create_1 = __importDefault(require("../repository/create"));
function default_1(req, res, next, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = new room_1.default(req.body).doc;
        const db = yield context.getService("MongoDB");
        const store = new room_2.default(db);
        const repo = new create_1.default(store);
        const data = yield repo.Create(room);
        if (data) {
            res.status(200).json({ status_code: 200, data: room });
        }
        else {
            res.status(400).json({ status_code: 400 });
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=create.js.map