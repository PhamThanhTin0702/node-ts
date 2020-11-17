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
const amqplib_1 = __importDefault(require("amqplib"));
class Pubsub {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = "joco";
            const open = amqplib_1.default.connect("amqp://user:bitnami@localhost:5672");
            open.then(conn => {
                return conn.createChannel();
            }).then(ch => {
                return ch.assertQueue(q).then(ok => {
                    return ch.sendToQueue(q, Buffer.from('welllllll'));
                });
            });
            open.then(function (conn) {
                return conn.createChannel();
            }).then(function (ch) {
                return ch.assertQueue(q).then(function (ok) {
                    return ch.consume(q, function (msg) {
                        if (msg !== null) {
                            console.log("aaaaaa", msg.content.toString());
                            ch.ack(msg);
                        }
                    });
                });
            });
        });
    }
}
//# sourceMappingURL=pubsub.js.map