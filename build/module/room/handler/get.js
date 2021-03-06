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
const room_1 = __importDefault(require("../storage/room"));
const get_1 = __importDefault(require("../repository/get"));
function GetRoomHandler(req, res, next, context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield context.getService("MongoDB");
            const store = new room_1.default(db);
            const repo = new get_1.default(store);
            const { userone, usertwo } = req.params;
            const data = yield repo.GetRoomExist(userone, usertwo);
            if (data) {
                res.status(200).json({ status_code: 200, data: data });
            }
            else {
                res.status(400).json({ status_code: 400 });
            }
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ status_code: 400 });
        }
    });
}
exports.default = GetRoomHandler;
//# sourceMappingURL=get.js.map