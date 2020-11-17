import App from './service/express/express';
import http from 'http';
import CreateUserHandler from './module/user/handler/create';
import GetUserHandler from './module/user/handler/get';
import ListUserHandler from './module/user/handler/list';
import CreateRoomHandler from './module/room/handler/create';
import ListRoomHandler from './module/room/handler/list';
import GetRoomHandler from './module/room/handler/get';
import GetMessageHandler from './module/message/handler/get';
import bodyParser from 'body-parser';
import { Router } from 'express';
import Context from './common/context';
import MongoDb from './service/mongodb/mongodb';
import morgan from 'morgan';
import Socket from "./service/socket/sck"
(async function () {
  const app = new App().create();
  const mongodb = new MongoDb('mongodb://localhost:5001', 'test');
  const context = new Context();


  const db = await mongodb.connect();
  let server = http.createServer(app)

  //Init Service to context
  context.initService('MongoDB', db);

  //SocketIO
  const sck = new Socket(server, context,"/sck");
  server = sck.init();

  app.use(function(req, res, next) {
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

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  app.use(bodyParser.json());
  app.use(
    '/api/v1',
    Router().use(
      '/users',
      Router().get('/:id/rooms', (req, res, next) => {
        ListRoomHandler(req, res, next, context);
      }),
      Router().get('/:id', (req, res, next) => {
        GetUserHandler(req, res, next, context);
      }),
      Router().get('', (req, res, next) => {
        ListUserHandler(req, res, next, context);
      }),
      Router().post('', (req, res, next) => {
        CreateUserHandler(req, res, next, context);
      }),
    ),
    Router().use(
      '/rooms',
      Router().post('', (req, res, next) => {
        CreateRoomHandler(req, res, next, context);
      }),
      Router().get('/users/:userone/:usertwo', (req, res, next) => {
        GetRoomHandler(req, res, next, context);
      }),
      Router().get('/:id/messages', (req, res, next) => {
        GetMessageHandler(req, res, next, context);
      }),
    ),
  );

  //Express Server HTTP
  server.listen(4009, () => {
    console.log('Server is started on Port 4001');
  });


})();
