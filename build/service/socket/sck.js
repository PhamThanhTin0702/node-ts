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
const socket_io_1 = __importDefault(require("socket.io"));
const storage_1 = __importDefault(require("../../module/user/storage/storage"));
const storage_2 = __importDefault(require("../../module/message/storage/storage"));
const room_1 = __importDefault(require("../../module/room/storage/room"));
const user_1 = __importDefault(require("../../module/user/model/user"));
const room_2 = __importDefault(require("../../module/room/model/room"));
const message_1 = __importDefault(require("../../module/message/model/message"));
const mongoose_1 = require("mongoose");
class SocketIO {
    constructor(server, context, path) {
        this.server = server;
        this.path = path;
        this.context = context;
        this.install();
    }
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.context.getService("MongoDB");
            this.userStorage = new storage_1.default(db);
            this.messageStorage = new storage_2.default(db);
            this.roomStorage = new room_1.default(db);
        });
    }
    init() {
        const sck = socket_io_1.default(this.server, { path: this.path });
        sck.on("connection", ((socket) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = socket.handshake.query;
            this.onConnect(userId);
            yield this.checkUser(userId);
            socket.join(userId);
            socket.on("send-message-on-room", (message) => __awaiter(this, void 0, void 0, function* () {
                const result = yield this.createMessage(message);
                if (result) {
                    socket.to(message.userTo).emit("new-message", message);
                    socket.to(message.message.createdBy).emit("mine-message", message);
                }
            }));
            socket.on("join-room", (users) => __awaiter(this, void 0, void 0, function* () {
                console.log(users);
                if (users) {
                    const room = yield this.roomStorage.Get(users[0], users[1]);
                    if (room) {
                        const messages = yield this.messageStorage.GetMessageByRoom(room._id);
                        room.messages = messages;
                        console.log(room);
                        socket.emit("room-of-user", room);
                    }
                    else {
                        socket.emit("room-of-user", { messages: [] });
                    }
                }
            }));
            socket.on("get-message-of-room", (roomId) => {
                this.messageStorage.GetMessageByRoom(roomId).then((data) => {
                    socket.emit("list-message", data);
                });
            });
            socket.on("create-room", (data) => __awaiter(this, void 0, void 0, function* () {
                const room = new room_2.default(data.room).doc;
                console.log(room);
                const roomCre = yield this.roomStorage.Create(room);
                if (roomCre) {
                    data.message.roomId = roomCre._id;
                    const messCre = yield this.createMessage(data.message);
                    if (messCre) {
                        data.messages = [data.message];
                        socket.to(data.room.users[1].id).emit("have-new-room", data);
                        socket.emit("success-create-room", {
                            _id: roomCre._id,
                            userTo: data.room.users[1],
                        });
                    }
                }
            }));
        })));
        return this.server;
    }
    onConnect(sckId) {
        console.log("Have connection", sckId);
    }
    checkUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.userStorage.get(userId);
            if (userExist) {
                return userExist;
            }
            else {
                const user = new user_1.default({ userCode: userId }).doc;
                const result = yield this.userStorage.create(user);
                return result;
            }
            return null;
        });
    }
    createMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageDoc = new message_1.default(message).doc;
            const result = yield this.messageStorage.create(messageDoc);
            const update = yield this.roomStorage.Update({ _id: mongoose_1.Types.ObjectId(messageDoc.roomId) }, { "lastedMessage": mongoose_1.Types.ObjectId(messageDoc._id) });
            return result;
        });
    }
}
exports.default = SocketIO;
//# sourceMappingURL=sck.js.map