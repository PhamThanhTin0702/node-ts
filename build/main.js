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
const express_1 = __importDefault(require("./service/express/express"));
const http_1 = __importDefault(require("http"));
const create_1 = __importDefault(require("./module/user/handler/create"));
const get_1 = __importDefault(require("./module/user/handler/get"));
const list_1 = __importDefault(require("./module/user/handler/list"));
const create_2 = __importDefault(require("./module/room/handler/create"));
const list_2 = __importDefault(require("./module/room/handler/list"));
const get_2 = __importDefault(require("./module/room/handler/get"));
const get_3 = __importDefault(require("./module/message/handler/get"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_2 = require("express");
const context_1 = __importDefault(require("./common/context"));
const mongodb_1 = __importDefault(require("./service/mongodb/mongodb"));
const morgan_1 = __importDefault(require("morgan"));
const sck_1 = __importDefault(require("./service/socket/sck"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new express_1.default().create();
        const mongodb = new mongodb_1.default('mongodb://localhost:5001', 'test');
        const context = new context_1.default();
        const db = yield mongodb.connect();
        let server = http_1.default.createServer(app);
        //Init Service to context
        context.initService('MongoDB', db);
        //SocketIO
        const sck = new sck_1.default(server, context, "/sck");
        server = sck.init();
        app.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json; charset=UTF-8');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-csrf-token");
            // Pass to next layer of middleware
            next();
        });
        app.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms'));
        app.use(body_parser_1.default.json());
        app.use('/api/v1', express_2.Router().use('/users', express_2.Router().get('/:id/rooms', (req, res, next) => {
            list_2.default(req, res, next, context);
        }), express_2.Router().get('/:id', (req, res, next) => {
            get_1.default(req, res, next, context);
        }), express_2.Router().get('', (req, res, next) => {
            list_1.default(req, res, next, context);
        }), express_2.Router().post('', (req, res, next) => {
            create_1.default(req, res, next, context);
        })), express_2.Router().use('/rooms', express_2.Router().post('', (req, res, next) => {
            create_2.default(req, res, next, context);
        }), express_2.Router().get('/users/:userone/:usertwo', (req, res, next) => {
            get_2.default(req, res, next, context);
        }), express_2.Router().get('/:id/messages', (req, res, next) => {
            get_3.default(req, res, next, context);
        })));
        //Express Server HTTP
        server.listen(4009, () => {
            console.log('Server is started on Port 4001');
        });
    });
})();
//# sourceMappingURL=main.js.map